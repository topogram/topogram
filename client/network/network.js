Template.network.created = function() {
  // console.log("init network");

  // get reactive graphState
  this.graphState = this.view.parentView.parentView._templateInstance.graphState.get()

  // constants
  this.editMode = this.data.editMode;

  // delete/add nodes
  this.advancedEditMode = Session.get('advancedEditMode');

  // init node/edge selector
  $('#infoBox').hide(); // hide infobox by default
  Session.set( 'currentId', null );
  Session.set( 'currentType', null );
  Session.set('pathTargetNodeId', null);

  // node merger
  Session.set("mergeSource", null)
  Session.set("mergeTargets", null)

};

Template.network.rendered = function() {
    var self = this;
    self.topogramId = self.data.topogramId;

    // fetch and parse data
    var edges = Edges.find().fetch().map(function(i){
      i.data._id = i._id; return i
    }),
    nodes = Nodes.find().fetch().map(function(i){
      i.data._id = i._id;
      i.parent = "nparent";
      i.data.parent = "nparent";
      return i
    });
    console.log("nodes", nodes.length)
    console.log("edges", edges.length)

    //make sure all nodes referenced in edges actually exists
    var nodeIds = nodes.map(function(n){return n.data.id});
    edges = edges.filter(function(e){
      return (nodeIds.indexOf(e.data.source) > -1   && nodeIds.indexOf(e.data.target) > -1);
    });
    console.log("connected edges", edges.length);

    // init graph
    this.graph = cytoscape({
        container: document.getElementById("network"),
        hideLabelsOnViewport: true,
        ready: function() {
          // console.log('topogram ready');
        },
        // load existing positions
        layout: {
            name: 'preset'
        },
        // style
        style: cytoscape.stylesheet()
            .selector('node')
              .style({
                'font-size': 6,//this.graphState.fontSize,
                'text-valign': 'center',
                'text-halign': 'right',
                'color': 'gray',
                'text-max-width': 60,
                'text-wrap': 'wrap',
                'min-zoomed-font-size': 0.4,
                'background-color' : function(e) {
                  var color = "#CCC"; // default
                  if (e.data("group")) color = colors(e.data("group"));
                  else if (e.data("color")) color = color;
                  return e.data('starred') ? 'yellow' : color;
                },
                // 'text-opacity' : 0, // hide label by default
                'label': function(e) {
                  return e.data("name") ? e.data("name").trunc(20) : "";
                }
              })
            // node with degree zero
            .selector('node[[degree = 0]]')
              .style({
                  'background-color': '#656565'
                  // 'display' :"none"
              })
            .selector('edge')
              .style({
                'background-color' : "#000",
                'target-arrow-shape': 'none', // default is undirected graph
                'width': function(e) {
                  return e.data("weight") ? e.data("weight") : .5;
                },
                'line-color' : '#656565',
                'line-opacity': .7,
                'font-size':8,
                'text-opacity' : 0, // hide label by default
                'label': function(e) {
                  return e.data("group") ? e.data("group") : "";
                }
              })
            .selector('.edgehandles-hover')
              .style({
                  'background-color': 'red'
              })
            .selector('.edgehandles-source')
            .selector('.edgehandles-target')
            .selector('.edgehandles-preview, .edgehandles-ghost-edge')
              .style({
                  'line-color': 'red',
                  'target-arrow-color': 'red',
                  'source-arrow-color': 'red'
              })
      });

    // clean eveything
    this.graph.elements().remove();

    // add data
    this.graph.add(nodes);
    this.graph.add(edges);
    var initData = true;

    // init display and watch changes
    this.autorun(function(){
      if(initData) {
        Nodes.find().observe({
          added: function( node ) {
            node.data._id = node._id; // make _id accessible in the el.data()
            var el = self.graph.filter('node[_id = "'+node._id+'"]')
            if(!el.length) self.graph.add(node);
          },
          removed: function( node ) {
            var el = self.graph.filter('node[_id = "'+node._id+'"]');
            self.graph.remove(el);
          }
        })

        // watch changes diff
        Nodes.find().observeChanges( {
          changed: function( _id, fields ) {
              var item = self.graph.nodes().filter( function( i, node ) {
                  return node.data("_id") == _id;
              });
              for ( var field in fields ) {
                if (field == "position") item.position(fields[field])
                // TODO : update all node properties
              }
          }
        })

        Edges.find().observe( {
            added: function( edge ) {
              edge.data._id = edge._id; // make _id accessible in the el.data()
              var el = self.graph.filter('edge[_id = "'+edge._id+'"]')
              if(nodeIds.indexOf(edge.data.source) > -1 && nodeIds.indexOf(edge.data.target) > -1 && !el.length) self.graph.add(edge);
            }
            // ,
            // removed: function() {
            //     // console.log( 'edge removed' );
            // }
        });
      }
    })


    console.log(this.graph);

    // remove singletons
    // this.graph.elements('node[[degree = 0]]').remove();

    // apply size
    var degreeDomain = d3.scale.linear().domain([this.graph.nodes().minDegree(),this.graph.nodes().maxDegree()]).range([6,40]);
    this.graph.style()
      .selector('node')
      .style({
        'width': function(e) {
          return degreeDomain(e.degree());
        },
        'height': function(e) {
          return degreeDomain(e.degree());
        }
      }).update()


    this.graph.reset(); // render layout

    // mouse select actions
    this.graph.on('tap', 'node', /*_.debounce(*/ function(e) {
        var node = e.cyTarget;
        self.graph.selectElement(e.cyTarget, "node");
    });

    // display edge info
    this.graph.on('tap', 'edge', /*_.debounce(*/ function(e) {
      e.cyTarget.css({
        'text-opacity' : function(d){
          return  op = (d.style('text-opacity') == "1") ? "0" : "1";
        },
        'line-color' : function(d) {
          return d.style('line-color') == "green" ? "#656565" : "green";
        }
      })
    });

    this.graph.createNode = function(id){
      // get x, y
      var x = $("#network").width()/2,
          y = $("#network").height()/2;

      var n = makeNode(self.topogramId, { x:x, y:y, name: id })
      console.log("new node",n);
      Meteor.call("addNode", n)
    }

    this.graph.selectElement = function(el, type){
      Session.set('currentType', type);
      Session.set('currentId', el.id());

      self.graph.focusOnNodes(el)
      $('#infoBox').show();

      var url = self.graph.getElementUrl(el, type);
      Router.go(url);
    }

    this.graph.deselectAll = function(){
      Session.set('currentType', null);
      Session.set('currentId', null);
      Session.set('pathTargetNodeId', null);

      self.graph.unFocus();
      $('#infoBox').hide();
      $('#commentBox').hide();
      Router.go(window.location.pathname);
    }

    this.graph.getElementUrl = function(el, type) {
      // get node/edge _id
      var element;
      if(type =="node") {
        element = Nodes.findOne({"data.id" : el.id()})
      } else if (type == "edge") {
        element = Edges.findOne({"data.id" : el.id()})
      }
      return window.location.pathname + "#"+type+"-"+element._id;
    }

    this.graph.getElementById = function(id, type){
      if(type == "node") {
        return self.graph.nodes().filter("[id='"+id+"']");
      } else if (type == "edge") {
        return self.graph.edges().filter("[id='"+id+"']");
      }
    }

    // mouse over
    this.graph.on('mouseover', 'node', /*_.debounce(*/ function(e) {
        e.cyTarget.style({
          'border-width': 2,
          'border-color': '#D84315',
          'font-size' : 8,
          'color' : 'black',
          'label': function(d) {
            return d.data("name") ? d.data("name") : "";
          }
        })
    });
    this.graph.on('mouseout', 'node', /*_.debounce(*/ function(e) {
        e.cyTarget.style({
          'border-width': 0,
          'font-size' : 6,
          'color' : 'gray',
          'label': function(d) {
            return d.data("name") ? d.data("name").trunc(20) : "";
          }
        })
    });

    this.graph.drawPath = function( sourceNode, targetNode ) {
      console.log(self.graph, sourceNode, targetNode);
      self.graph.unFocus();
      var path = self.graph.elements().dijkstra(sourceNode).pathTo(targetNode);

      // self.graph.focusOnNodes(path);
      self.graph.nodes().style({ 'opacity': '.1' });
      self.graph.edges().style({ 'opacity': '.1' });
      path.style({ 'opacity': '1' });

      // make only the focus selectable
      self.graph.nodes().unselectify();
      self.graph.edges().unselectify(false);
      path.selectify();
    }

    // select / unsleselct nodes
    this.graph.focusOnNodes = function(selectedNodes){

      // select
      var subGraph = selectedNodes.closedNeighborhood();

      // make only the focus selectable
      self.graph.nodes().hide();
      self.graph.edges().hide();
      subGraph.show();

      // store actual position
      subGraph.nodes().forEach(function(d){
        var prevPos = Object({"x":d.position().x, "y":d.position().y})
        d.data("prevPos", prevPos);
      })

      // apply focus layout
      subGraph.layout({"name":"concentric"})
    }

    this.graph.unFocus = function(){

      // remove layout focus and re-apply previous positions
      self.graph.nodes().forEach(function(d){
        if( d.data("prevPos") ) {
          d.position(d.data("prevPos"))
          delete d.removeData("prevPos")
        }
      })
      self.graph.layout({"name":"preset"})
      // shopw everything
      self.graph.nodes().show();
      self.graph.edges().show();
    }

    this.graph.resetFilters = function() {

      self.graph.deselectAll();

      $(".network-search input").val("");

      self.graph.elements().deselect();
      self.graph.elements().show();

      // reset selector
      $(".filterByCategory").find("option:selected").removeAttr("selected");
      $('.filterByCategory select').material_select('destroy');
      $('.filterByCategory select').material_select();

      // update slider min / max
      var min = self.graph.nodes().minDegree();
      var max = self.graph.nodes().maxDegree();

      $("#filterByDegree")[0].noUiSlider.set([min, max])

      // $("#filterByDegree")[0].noUiSlider.updateOptions({
    	// 	range: {
    	// 		'min': min,
    	// 		'max': max
    	// 	}
    	// });

    }

    // show / hide elements
    this.graph.selectElements = function(selectedEls) {

      self.graph.elements().hide();
      selectedEls.select();
      selectedEls.show();
      selectedEls.nodes().connectedEdges().show(); // show edge context
    }

    this.graph.filterGraph = function(filter){

      // init with all elements selected by default
      var alreadySelected = (self.graph.$(':selected').length) ? self.graph.$(':selected') : self.graph.elements();

      // console.log(alreadySelected.length);
      var newSelection = alreadySelected.filter(filter);
      // console.log(newSelection.nodes().length, newSelection.edges().length);

      self.graph.selectElements(newSelection);
    }

    // load node if hash
    if(window.location.hash) {
      var type = window.location.hash.split("-")[0].replace("#","");
      var elementId = window.location.hash.split("-")[1];
      var element;
      console.log(type, elementId);
      if(type =="node") {
        element = Nodes.findOne({"_id" : elementId})
      } else if (type == "edge") {
        element = Edges.findOne({"_id" : elementId})
      }
      console.log(element);
      var el = self.graph.getElementById(element.data.id, type);
      console.log(el);
      if(el) self.graph.selectElement(el, type)
    }

    // otions for interactive edge creation
    self.graph.edgehandles({
        complete: function(source, target, addedEntities) {
          console.log(source, target, addedEntities);
            Meteor.call('addEdgeFromIds', self.topogramId, source.data('id'), target.data('id'));
        }
    });

    this.graph.initActions = function() {

      var advancedEditMode = Session.get("advancedEditMode")
      console.log("init actions with advancedEditMode = "+ advancedEditMode);

      // drag node
      self.graph.off('free', 'node'); // reset
      self.graph.on('free', 'node', function(e) {
          var node = e.cyTarget;

          // update position
          Meteor.call('updateNodePosition', node.id(), node.position());

          // Node Merger
          if(advancedEditMode) {
              // check for node merger
              console.log("check for node merger")
              Session.set("mergeSource", null)
              Session.set("mergeTargets", null)

              // hit test
              var bb = node.boundingbox();
              var targets = self.graph.nodes().filterFn(function(d){
                  var isPos =
                    d.position().x > bb.x1
                    &&
                    d.position().x < bb.x2
                    &&
                    d.position().y > bb.y1
                    &&
                    d.position().y < bb.y2;
                  var isSame = (d.id() == node.id());
                  return isPos && !isSame;
              })

              // console.log(node, targets);
              if (targets.length) {
                  Session.set("mergeSource", node.id())
                  Session.set("mergeTargets", targets.map(function(d){return d.id()}))
                  $('#modal-merge').openModal();
              }
          };
      });

      // edge creation: disabled by default
      if (!advancedEditMode) self.graph.edgehandles("disable")
      else self.graph.edgehandles("enable");

      // context menu (right click)
      if(self.editMode) {
        var commands =  [{
            content: '<span><i class="small material-icons">star_rate</i></span>',
            select: function() {
              Meteor.call('starNode', this.id());
              var starred = (this.data("starred")) ? false : true;
              this.data("starred", starred)
            }
        // }, {
        //     content: '<span><i class="small material-icons">lock</i></span>',
        //     select: function() {
        //         // console.log( this.position() );
        //         Meteor.call('lockNode', this.id(), this.position());
        //     },
        },{
            content: '<span><i class="small material-icons">comment</i></span>',
            select: function() {
                self.graph.selectElement(this, "node")
                $("#commentBox").show()
            },

        },{
            content: '<span><i class="small material-icons">library_books</i></span>',
            select: function() {
              // TODO : share to social networks
              self.graph.selectElement(this, "node")
            },

        }]

        // add delete only on advanced mode
        if(advancedEditMode)
          commands.push({
            content: '<span><i class="small material-icons">delete</i></span>',
            select: function() {

                // remove the node plus all connected edges
                Meteor.call('deleteNodeAndConnectedEdges', this.id(), this.neighborhood('edge').map(function(d) {
                    return d.id()
                }));

                // remove from graph
                self.graph.remove(this.neighborhood('edge'));
                self.graph.remove(this);
            }
        })

        // update ctx menu
        if (self.graph.cxtMenuAPI) self.graph.cxtMenuAPI.destroy()
        self.graph.cxtMenuAPI = self.graph.cxtmenu({
          selector: 'node',
          commands: commands
        });
      }
    }

    // mode view-only
    if(!this.editMode) {
      self.graph.autolock(true); // prevent drag
      self.graph.edgehandles("disable");
    }

    // init actions based on existing rights
    this.graph.initActions(this.advancedEditMode);

    // set global var
    console.log(this);
    this.data.network.set(this.graph);

    // watch changes

    // console.log('network : ', topogramId, nodes .length, 'nodes', edges .length, 'edges' );
};


Template.network.destroyed = function() {
  console.log("hahah");
};
