Template.networkTools.onCreated(function() {
    this.changeLayout = new ReactiveVar();

    // inherit change layout function from parent topogram view
    this.changeLayout.set(this.view.parentView._templateInstance.changeLayout.get())
});



Template.networkTools.rendered = function() {

    //for searching easily
    var nodes = Nodes.find().fetch(),
        edges = Edges.find().fetch();
    var self = this;
    nodeEditMode = false;
    edgeEditMode = false;
    scaleForParams = [];

}

Template.networkTools.helpers({

    layouts: function() {
      var layouts =  [
          'springy', 'random', 'grid', 'circle', 'breadthfirst', 'concentric'
      ];

      // if a node has lat/lng, then addmap layout
      var node = Nodes.findOne({}, {
          fields: {
              'data.data': 1
          }
      });
      if (node.data.data.lat) layouts.push("map");

      return layouts.map(function(d) {
            return {
                'slug': d,
                'name': d.charAt(0).toUpperCase() + d.slice(1)
            };
        });
    },

    nodeCategories: function() {
        var node = Nodes.findOne({}, {
            fields: {
                'data.data': 1
            }
        });
        return Object.keys(node.data.data);
    },

    nodeTypes: function() {
        var nodes = Nodes.find({}, {
            fields: {
                'data.data': 1
            }
        }).fetch();

        var types = [''];
        nodes.forEach(function(node) {
            if (types.indexOf(node.data.data.type) < 0) types.push(node.data.data.type);
        });
        return types;
    },

    hasGeo: function() {
        var nodes = Nodes.find().fetch();
        return nodes[ 0 ].data.data.lat ? true : false;
    },

    nodeColorMethod: function() {
        return nodeColorMethod = ["fix", "setInFile", "group", "alphabet", "count", "compNodEdg", "sigma", "sigmaDegree"]
    },
    edgeColorMethod: function() {
        return edgeColorMethod = ["fix", "file", "nodesMeanGroup","nodesMeanColor", "nodesDash", "group", "count", "compNodEdg", "sigma"]
    },
    edgeWidthMethod: function() {
        return edgeWidthMethod = ["simple", "width"]
    },
    // nodeTextMethod: function() {
    //     return edgeWidthMethod = ["true", "false"]
    // },
    // edgeTextMethod: function() {
    //     return edgeWidthMethod = ["true", "false"]
    // },
    nodeWidthMethod: function() {
        return edgeWidthMethod = ["simple", "width", "edge"]
    },
    textLocationMethod: function() {
        return textLocationMethod = ["above", "below", "alternate"]
    },
    edgeEndMethod: function() {
        return edgeEndMethod = ["simple", "arrow", "arrows"]
    },
    // textSizeParam : function() { return Session.get('textSizeParam'); },
});

Template.networkTools.events = {



        'change #textSizeParam': function(e, template) {

            var net = template.view.parentView._templateInstance.network.get().net;
            //var val = $(e.currentTarget).find('value').val();
            var val = textSizeParam.value;
            console.log("val", val);

            net.nodes().css({
                'font-size': val
            })
            console.log(net.nodes().style("font-size"));

            // net.nodes().forEach(function(ele) {
            //     ele.css({ 'font-size': val })
            // })

        },
        'change #countEdgeViewParam1': function(e, template) {

            var net = template.view.parentView._templateInstance.network.get().net;
            //var val = $(e.currentTarget).find('value').val();
            var val = parseInt(countEdgeViewParam1.value);
            var val2 = parseInt(countEdgeViewParam2.value);
            var val3 = parseInt(countEdgeViewParam3.value);

            console.log("values", val, val2, val3);

            net.edges().forEach(function(ele) {
                //FIXME:
                ele.data().count = ele.data().width
                var width = parseInt(ele.data().count);
                //TODO: D3 SCALE
                // console.log("widthedge", width)
                if (width <= val) {
                    color = '#EEEEEE'
                } else if (width > val && width <= val2) {
                    color = '#2BBBAD'
                } else if (width > val2 && width <= val3) {
                    color = '#42A5F5'
                } else if (width > val3) {
                    color = '#EF5350'
                } else {
                    color = '#000000'
                }
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : color
                })
            })


        },
        'change #countEdgeViewParam2': function(e, template) {

            var net = template.view.parentView._templateInstance.network.get().net;
            //var val = $(e.currentTarget).find('value').val();
            var val = parseInt(countEdgeViewParam1.value);
            var val2 = parseInt(countEdgeViewParam2.value);
            var val3 = parseInt(countEdgeViewParam3.value);

            console.log("values", val, val2, val3);

            net.edges().forEach(function(ele) {
                //FIXME:
                ele.data().count = ele.data().width
                var width = parseInt(ele.data().count);
                //TODO: D3 SCALE
                // console.log("widthedge", width)
                if (width <= val) {
                    color = '#EEEEEE'
                } else if (width > val && width <= val2) {
                    color = '#2BBBAD'
                } else if (width > val2 && width <= val3) {
                    color = '#42A5F5'
                } else if (width > val3) {
                    color = '#EF5350'
                } else {
                    color = '#000000'
                }
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : color
                })
            })


        },
        'change #countEdgeViewParam3': function(e, template) {

            var net = template.view.parentView._templateInstance.network.get().net;
            //var val = $(e.currentTarget).find('value').val();
            var val = parseInt(countEdgeViewParam1.value);
            var val2 = parseInt(countEdgeViewParam2.value);
            var val3 = parseInt(countEdgeViewParam3.value);

            console.log("values", val, val2, val3);

            net.edges().forEach(function(ele) {
                //FIXME:
                ele.data().count = ele.data().width
                var width = parseInt(ele.data().count);
                //TODO: D3 SCALE
                // console.log("widthedge", width)
                if (width <= val) {
                    color = '#EEEEEE'
                } else if (width > val && width <= val2) {
                    color = '#2BBBAD'
                } else if (width > val2 && width <= val3) {
                    color = '#42A5F5'
                } else if (width > val3) {
                    color = '#EF5350'
                } else {
                    color = '#000000'
                }
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : color
                })
            })


        },
        'change #sigmaViewParam': function(e, template) {

            var net = template.view.parentView._templateInstance.network.get().net;
            //var val = $(e.currentTarget).find('value').val();
            var val = parseFloat(sigmaViewParam.value);


            console.log("values", val);
            var data1 = [];
            console.log("data1", data1);

            net.edges().forEach(function(ele) {
                    //FIXME

                    ele.data().count = ele.data().width;
                    console.log("ele.data().count = ele.data().width", ele.data().count, ele.data().width);
                    data1.push(parseFloat(ele.data().count));
                })
                //console.log("I'm in sigma")
            console.log(data1);
            var average1 = average(data1);
            var standardDeviation1 = standardDeviation(data1);
            //console.log("average1",average1);
            //console.log("standardDeviation1",standardDeviation1);

            // NOT SURE IT IS NEEDED
            if (val > 6) {
                val = 1;
                console.log("sigma value set too high, so taking 1 instead")
            }
            net.edges().forEach(function(ele) {
                //FIXME:
                ele.data().count = ele.data().width
                var width = ele.data().count;
                //TODO: D3 SCALE

                if (width <= (average1 - ((val + 4) * standardDeviation1)) || width >= (average1 + ((val + 4) * standardDeviation1))) {
                    color = '#FF1010'
                    zIndex = 10
                } else if (width <= (average1 - ((val + 3) * standardDeviation1)) || width >= (average1 + ((val + 3) * standardDeviation1))) {
                    color = '#EC5350'
                    zIndex = 9
                } else if (width <= (average1 - ((val + 2) * standardDeviation1)) || width >= (average1 + (val + 2) * standardDeviation1)) {
                    color = '#42A5F5'
                    zIndex = 8
                } else if (width <= (average1 - ((val + 1) * standardDeviation1)) || width >= (average1 + (val + 1) * standardDeviation1)) {
                    color = '#2BBBAD'
                    zIndex = 7
                } else if (width <= (average1 - ((val) * standardDeviation1)) || width >= (average1 + (val) * standardDeviation1)) {
                    color = '#20B0A0'
                    zIndex = 5
                } else if (width <= (average1 + (val * standardDeviation1)) && width >= (average1 - (val * standardDeviation1))) {
                    color = '#EEEEEE'
                    zIndex = 4
                } else {
                    console.log("FOR UNCLASSIFIEDS")
                    console.log(width);
                    console.log("average1", average1);
                    console.log("standardDeviation1", standardDeviation1);
                    color = '#000000'
                }
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : color,
                    'z-index': ele.data('starred') ? 10 : zIndex
                })
            })

        },
        'change #sigmaNodeDegreeViewParam': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            var data2 = []
            console.log("data2", data2);

            net.nodes().forEach(function(ele) {
                //FIXME
                //ele.data().count = ele.data().width
                data2.push(parseFloat(ele.degree()));
                console.log("ele.degree()", ele.degree());
            })

            console.log("I'm in sigma Degree Nodes");
            console.log("data2", data2);
            var average2 = average(data2);
            var standardDeviation2 = standardDeviation(data2);
            console.log("average2", average2);
            console.log("standardDeviation2", standardDeviation2);
            var val = parseInt(sigmaNodeDegreeViewParam.value);
            // TOBEFIXED:need another use of ranges
            if (val > 6) {
                val = 1;
                console.log("sigma value set to fix, so taking 1 instead, need rewrite")
            }
            console.log("val", val);
            net.nodes().forEach(function(ele) {

                //ele.data().count = ele.data().width
                var width = ele.degree();
                //TODO: D3 SCALE

                if (width <= (average2 - ((val + 4) * standardDeviation2)) || width >= (average2 + ((val + 4) * standardDeviation2))) {
                    color = '#FF1010'
                    zIndex = 10
                } else if (width <= (average2 - ((val + 3) * standardDeviation2)) || width >= (average2 + ((val + 3) * standardDeviation2))) {
                    color = '#EC5350'
                    zIndex = 9
                } else if (width <= (average2 - ((val + 2) * standardDeviation2)) || width >= (average2 + (val + 2) * standardDeviation2)) {
                    color = '#42A5F5'
                    zIndex = 8
                } else if (width <= (average2 - ((val + 1) * standardDeviation2)) || width >= (average2 + (val + 1) * standardDeviation2)) {
                    color = '#2BBBAD'
                    zIndex = 7
                } else if (width <= (average2 - ((val) * standardDeviation2)) || width >= (average2 + (val) * standardDeviation2)) {
                    color = '#20B0A0'
                    zIndex = 5
                } else if (width <= (average2 + (val * standardDeviation2)) && width >= (average2 - (val * standardDeviation2))) {
                    color = '#EEEEEE'
                    zIndex = 4
                } else {
                    console.log("FOR UNCLASSIFIEDS")
                    console.log(width);
                    console.log("average2", average2);
                    console.log("standardDeviation2", standardDeviation2);
                    color = '#000000'
                }
                ele.style({
                    'background-color': ele.data('starred') ? 'yellow' : color,
                    'z-index': ele.data('starred') ? 10 : zIndex
                })
            })
        },



        // add/remove nodes
        'click #add-node': function() {
            var nodeId = 'node' + Math.round(Math.random() * 1000000);
            var node = makeNode(nodeId);
            Meteor.call('addNode', node);
        },

        // add random nodes
        'click #init-data': function() {
            Meteor.call('resetTopogramData', this.topogramId);
        },

        // apply layout
        'click .layout': function(e, template) {
            template.view.parentView._templateInstance.changeLayout.get()($(e.target).data().layoutName);
        },

        // color
        //     'change #nodeCatColor': function( e, template ) {
        //         var val = $( e.currentTarget ).find( 'option:selected' ).val();
        //         var net = template.view.parentView._templateInstance.network.get().net;

        //         console.log( val );

        //         var colors = d3.scale.category20b();
        //         net.nodes().forEach( function( ele ) {
        //             // console.log(val);
        //             ele.style( {
        // //                'background-color': ele.data( 'starred' ) ? 'yellow' : colors( ele.data().data[ val ] )
        //                 'background-color': ele.data( 'starred' ) ? 'yellow' : colors( ele.data().data.color )
        //             } );
        //         } );
        //     },

        // filter
        'change #nodeFilterType': function(e, template) {
            var val = $(e.currentTarget).find('option:selected').val();
            var net = template.view.parentView._templateInstance.network.get().net;

            if (val == '' || !val) {
                net.nodes().style({
                    'visibility': 'visible'
                })
            } else {
                var visible = net.nodes().forEach(function(ele) {
                    if (ele.data().data.type == val) ele.style({
                        'visibility': 'visible'
                    })
                    else ele.style({
                        'visibility': 'hidden'
                    })
                })
            }
        },

        'click .toggle-node-labels': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;

            if (net.nodes()[0].css('content') == '') {
                net.nodes().css({
                    'content': function(e) {
                        // console.log(e.data().data.name);
                        return e.data().data.name;
                    }
                });
            } else {
                net.nodes().css({
                    'content': ''
                });
            }
        },
        'click .toggle-node-edit-mode': function() {

            nodeEditMode = !nodeEditMode
            console.log("nodeEditMode", nodeEditMode)
            return;

        },
        'click .toggle-edge-edit-mode': function(e,template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            edgeEditMode = !edgeEditMode
            console.log("edgeEditMode", edgeEditMode)
            if (!edgeEditMode){
                net.edgehandles("disable");
                $(e.target).text("edge edit mode off").toggleClass("btn-flat")
            }
            else {
                net.edgehandles("enable")
                $(e.target).text("edge edit mode on").toggleClass("btn-flat")
            }
            return;


        },

        'click .toggle-edge-labels': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;

            if (net.edges()[0].css('content') == '') {
                net.edges().css({
                    'content': function(e) {
                        if (e.data().data) return e.data().data.name;
                        else return '';
                    }
                });
            } else {
                net.edges().css({
                    'content': ''
                });
            }
        },

        // toggle add/remove edges feature
        'click #draw-edgehandles': function() {
            // var edgeHandlesOn = Session.get('edgeHandlesOn') == 'drawoff' ? 'drawon' : 'drawoff';
            // var edgeHandlesOn = Session.get('edgeHandlesOn') == 'disable' ? 'enable' : 'disable';

            var edgeHandlesOn = Session.get('edgeHandlesOn') ? false : true;
            Session.set('edgeHandlesOn', edgeHandlesOn);
            console.log(edgeHandlesOn);
            if (edgeHandlesOn) net.edgehandles.start();
        },

        // degree
        'click #remove-isolated-nodes': function() {
            // var topogram = Template.instance().network.get().net;
            var isolated = topogram.elements('node[[degree = 0]]');
            topogram.remove(isolated);
        },
        'change #nodeColorMethod': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            var val = $(e.currentTarget).find('option:selected').val();
            var nodes = Nodes.find().fetch(),
                edges = Edges.find().fetch();
            var self = this;

            if (val == 'setInFile') {
                // console.log("I'm in nodefile")
                net.nodes().forEach(function(ele) {
                    if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) == '#') {
                        ele.style({
                            'background-color': ele.data('starred') ? 'yellow' : ele.data().color
                        })
                    } else if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) != '#') {
                        ele.style({
                            'background-color': ele.data('starred') ? 'yellow' : "#" + ele.data().color
                        })
                    }
                })
            } else if (val == 'alphabet') {
                // console.log("I'm in! nodealpha")
                warning = []
                net.nodes().forEach(function(ele) {
                        // console.log("ele.data().name", ele.data().name)
                        if (ele.data().name == "" || 0) {
                            warning.push(ele.data().id);
                            var eleColor = colorsNode(ele.data().id.slice(0, 1))
                        } else {
                            var eleColor = colorsNode(ele.data().name.slice(0, 1));
                        }
                        ele.style({
                            'background-color': ele.data('starred') ? 'yellow' : eleColor
                        })
                    })
                    // console.log("warning.length", warning.length)

                if (warning.length > 0) {
                    text = "elements with ids "
                    for (index = 0; index < warning.length; index++) {
                        text += warning[index] + " ";
                    }
                    text += "used id instead of name field"
                    FlashMessages.sendError(text)
                }
            } else if (val == 'group') {
                net.nodes().forEach(function(ele) {
                    if (ele.data().group == 0 || "") {
                        FlashMessages.sendError("no data available, creating");
                        //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                        var tmpcol = colorsNode(ele.data().id);
                        // console.log(tmpcol)
                        ele.data({
                            'group': tmpcol
                        });
                        // console.log("ele.data().group", ele.data().group);
                    }

                    if (ele.data().color == 0 || "") {
                        //FlashMessages.sendError("no color available, creating");
                        //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                        var tmpcol = colorsNode(ele.data().group)
                            // console.log(tmpcol)
                        ele.data({
                            'color': tmpcol
                        });
                        // console.log("ele.data().color", ele.data().color);
                        if (ele.data().id == 'BEAL') {
                            // console.log('BEAL', ele.data().color)
                        }
                    }
                    // console.log(ele.data().color)
                    var eleColor = (ele.data().group == 0) ? "#CCCCCC" : colorsNode(ele.data().group);
                    // console.log(eleColor)
                    ele.style({
                        'background-color': ele.data('starred') ? 'yellow' : eleColor
                    })
                })
            } else if (val == 'sigma') {
                var data2 = []
                console.log("data2", data2);

                net.nodes().forEach(function(ele) {
                    //FIXME
                    ele.data().count = ele.data().width
                    data2.push(parseFloat(ele.data().count));
                    console.log("ele.data().width, ele.data().count", ele.data().width, ele.data().count);
                })

                console.log("I'm in sigma nodeS");
                console.log("data2", data2);
                var average2 = average(data2);
                var standardDeviation2 = standardDeviation(data2);
                console.log("average2", average2);
                console.log("standardDeviation2", standardDeviation2);
                var val = parseInt(countEdgeViewParam1.value);
                // NOT SURE IT IS NEEDED
                if (val > 6) {
                    val = 1;
                    console.log("sigma value set too high, so taking 1 instead")
                }
                console.log("val", val);
                net.nodes().forEach(function(ele) {
                    //FIXME:
                    ele.data().count = ele.data().width
                    var width = ele.data().count;
                    //TODO: D3 SCALE

                    if (width <= (average2 - ((val + 4) * standardDeviation2)) || width >= (average2 + ((val + 4) * standardDeviation2))) {
                        color = '#FF1010'
                        zIndex = 10
                    } else if (width <= (average2 - ((val + 3) * standardDeviation2)) || width >= (average2 + ((val + 3) * standardDeviation2))) {
                        color = '#EC5350'
                        zIndex = 9
                    } else if (width <= (average2 - ((val + 2) * standardDeviation2)) || width >= (average2 + (val + 2) * standardDeviation2)) {
                        color = '#42A5F5'
                        zIndex = 8
                    } else if (width <= (average2 - ((val + 1) * standardDeviation2)) || width >= (average2 + (val + 1) * standardDeviation2)) {
                        color = '#2BBBAD'
                        zIndex = 7
                    } else if (width <= (average2 - ((val) * standardDeviation2)) || width >= (average2 + (val) * standardDeviation2)) {
                        color = '#20B0A0'
                        zIndex = 5
                    } else if (width <= (average2 + (val * standardDeviation2)) && width >= (average2 - (val * standardDeviation2))) {
                        color = '#EEEEEE'
                        zIndex = 4
                    } else {
                        console.log("FOR UNCLASSIFIEDS")
                        console.log(width);
                        console.log("average2", average2);
                        console.log("standardDeviation2", standardDeviation2);
                        color = '#000000'
                    }
                    ele.style({
                        'background-color': ele.data('starred') ? 'yellow' : color,
                        'z-index': ele.data('starred') ? 10 : zIndex
                    })
                })
            } else if (val == 'sigmaDegree') {
                var data2 = []
                console.log("data2", data2);

                net.nodes().forEach(function(ele) {
                    //FIXME
                    //ele.data().count = ele.data().width
                    data2.push(parseFloat(ele.degree()));
                    console.log("ele.degree()", ele.degree());
                })

                console.log("I'm in sigma Degree Nodes");
                console.log("data2", data2);
                var average2 = average(data2);
                var standardDeviation2 = standardDeviation(data2);
                console.log("average2", average2);
                console.log("standardDeviation2", standardDeviation2);
                var val = parseInt(countEdgeViewParam1.value);
                // TOBEFIXED:need another use of ranges
                //if (val > 6 ) {
                val = 1;
                console.log("sigma value set to fix, so taking 1 instead, need rewrite")
                    //}
                console.log("val", val);
                net.nodes().forEach(function(ele) {

                    //ele.data().count = ele.data().width
                    var width = ele.degree();
                    //TODO: D3 SCALE

                    if (width <= (average2 - ((val + 4) * standardDeviation2)) || width >= (average2 + ((val + 4) * standardDeviation2))) {
                        color = '#FF1010'
                        zIndex = 10
                    } else if (width <= (average2 - ((val + 3) * standardDeviation2)) || width >= (average2 + ((val + 3) * standardDeviation2))) {
                        color = '#EC5350'
                        zIndex = 9
                    } else if (width <= (average2 - ((val + 2) * standardDeviation2)) || width >= (average2 + (val + 2) * standardDeviation2)) {
                        color = '#42A5F5'
                        zIndex = 8
                    } else if (width <= (average2 - ((val + 1) * standardDeviation2)) || width >= (average2 + (val + 1) * standardDeviation2)) {
                        color = '#2BBBAD'
                        zIndex = 7
                    } else if (width <= (average2 - ((val) * standardDeviation2)) || width >= (average2 + (val) * standardDeviation2)) {
                        color = '#20B0A0'
                        zIndex = 5
                    } else if (width <= (average2 + (val * standardDeviation2)) && width >= (average2 - (val * standardDeviation2))) {
                        color = '#EEEEEE'
                        zIndex = 4
                    } else {
                        console.log("FOR UNCLASSIFIEDS")
                        console.log(width);
                        console.log("average2", average2);
                        console.log("standardDeviation2", standardDeviation2);
                        color = '#000000'
                    }
                    ele.style({
                        'background-color': ele.data('starred') ? 'yellow' : color,
                        'z-index': ele.data('starred') ? 10 : zIndex
                    })
                })
            }

        },
        'change #nodeWidthMethod': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            var val = $(e.currentTarget).find('option:selected').val();
            var nodes = Nodes.find().fetch(),
                edges = Edges.find().fetch();
            var self = this;

            if (val == 'edge') {
                net.nodes().forEach(function(ele) {
                    ele.style({
                        'width': ele.degree(),
                        'height': ele.degree()
                    })
                })
            } else if (val == 'witdth') {
                net.nodes().forEach(function(ele) {
                    ele.style({
                        'width': ele.data().count,
                        'height': ele.data().count
                    })
                })
            } else if (val == 'simple') {
                net.nodes().forEach(function(ele) {
                    ele.style({
                        'width': 5,
                        'height': 5
                    })
                })
            }
        },
        'change #edgeWidthMethod': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            var val = $(e.currentTarget).find('option:selected').val();
            var nodes = Nodes.find().fetch(),
                edges = Edges.find().fetch();
            var self = this;

            if (val == 'simple') {
                net.edges().forEach(function(ele) {
                    ele.style({
                        'width': 5
                    })
                })
            } else if (val == 'width') {
                net.edges().forEach(function(ele) {
                    ele.style({
                        'width': ele.data().width
                    })
                })
            }
        },
        'change #edgeEndMethod': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            var val = $(e.currentTarget).find('option:selected').val();
            var nodes = Nodes.find().fetch(),
                edges = Edges.find().fetch();
            var self = this;

            if (val == 'simple') {
                net.edges().forEach(function(ele) {
                    ele.style({
                        'target-arrow-shape': 'none',
                        'source-arrow-shape': 'none'
                    })
                })
            } else if (val == 'arrow') {
                net.edges().forEach(function(ele) {
                    ele.style({
                        'target-arrow-shape': 'triangle',
                        'source-arrow-shape': 'none'
                    })
                })
            } else if (val == 'arrows') {
                net.edges().forEach(function(ele) {
                    ele.style({
                        'target-arrow-shape': 'triangle',
                        'source-arrow-shape': 'triangle'
                    })
                })
            }
        },
        'change #textLocationMethod': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            var val = $(e.currentTarget).find('option:selected').val();
            var nodes = Nodes.find().fetch(),
                edges = Edges.find().fetch();
            var self = this;

            if (val == 'above') {
                net.nodes().forEach(function(ele) {
                    ele.style({
                        'text-valign': 'top'

                    })
                })
            } else if (val == 'below') {
                net.nodes().forEach(function(ele) {
                    ele.style({
                        'text-valign': 'bottom'

                    })
                })
            } else if (val == 'alternate') {
                var alternate = 1;
                net.nodes().forEach(function(ele) {
                    erro = alternate % 2
                        // console.log("alternate % 2", erro)
                    if ((alternate % 2) == 0) {
                        // console.log("here")
                        ele.style({
                            'text-valign': 'top'

                        })
                    } else {
                        // console.log("there");
                        ele.style({
                            'text-valign': 'bottom'

                        })
                    }
                    alternate = alternate + 1;
                    // console.log("alternate", alternate);
                })
            }
        },
        'change #edgeColorMethod': function(e, template) {
            var net = template.view.parentView._templateInstance.network.get().net;
            var val = $(e.currentTarget).find('option:selected').val();
            var nodes = Nodes.find().fetch(),
                edges = Edges.find().fetch();
            var self = this;
            if (val == 'file') {
                // console.log("I'm in edgefile")
                net.edges().forEach(function(ele) {
                    if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) == '#') {
                        ele.style({
                            'line-color': ele.data('starred') ? 'yellow' : ele.data().color
                        })
                    } else if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) != '#') {
                        ele.style({
                            'line-color': ele.data('starred') ? 'yellow' : "#" + ele.data().color
                        })
                    }
                })
            } else if (val == 'alphabet') {
                // console.log("I'm in edge alphabet")
                net.edges().forEach(function(ele) {
                    ele.style({

                        'line-color': ele.data('starred') ? 'yellow' : colorsNode(ele.data().name.slice(0, 1))
                    })
                })
            } else if (val == 'group') {
               console.log("I'm in!3")
                net.edges().forEach(function(ele) {
                    if (ele.data().group == 0) {
                        FlashMessages.sendError("no data available, creating");
                        //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                        ele.data("group", colorsEdge(ele.data().id))
                    }

                    if (ele.data().color == 0) {
                        FlashMessages.sendError("no color available, creating");
                        //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                        ele.data("color", colorsEdge(ele.data().group))
                    }
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : colorsEdge(ele.data().group)
                    })
                })
            } else if (val == 'nodesMeanGroup') {
                net.edges().forEach(function(ele) {
                    var sourceNode = "";
                    var targetNode = "";
                    srcFound = false;
                    tarFound = false;
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        if (!srcFound && nodes[i].data.id == ele.data().source) {
                            sourceNode = nodes[i];
                            srcFound = true;
                        } else if (!tarFound && nodes[i].data.id == ele.data().target) {
                            targetNode = nodes[i];
                            tarFound = true;
                        } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
                    }
                    console.log("sourceNode", sourceNode.data.id);
                    console.log("targetNode", targetNode.data.id);
                    console.log("sourceNode color", sourceNode.data.color);
                    console.log("sourceNode group", sourceNode.data.group);
                    console.log("targetNode color", targetNode.data.color);
                    console.log("targetNode group", targetNode.data.color);
                    var color = colorMean(colorsNode(sourceNode.data.group), colorsNode(targetNode.data.group));
                    console.log("color",color);
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : color,
                        'line-style': "solid"
                    })
                })
            } else if (val == 'nodesMeanColor') {
                net.edges().forEach(function(ele) {
                    var sourceNode = "";
                    var targetNode = "";
                    srcFound = false;
                    tarFound = false;
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        if (!srcFound && nodes[i].data.id == ele.data().source) {
                            sourceNode = nodes[i];
                            srcFound = true;
                        } else if (!tarFound && nodes[i].data.id == ele.data().target) {
                            targetNode = nodes[i];
                            tarFound = true;
                        } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
                    }
                    console.log("sourceNode", sourceNode.data.id);
                    console.log("targetNode", targetNode.data.id);
                    console.log("sourceNode color", sourceNode.data.color);
                    console.log("sourceNode group", sourceNode.data.group);
                    console.log("targetNode color", targetNode.data.color);
                    console.log("targetNode group", targetNode.data.color);
                    var color = colorMean(sourceNode.data.color, targetNode.data.color);
                    console.log("color",color);
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : color,
                        'line-style': "solid"
                    })
                })
            } else if (val == 'nodesDash') {
                net.edges().forEach(function(ele) {
                    var sourceNode, targetNode,
                        srcFound = false,
                        tarFound = false;
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        if (!srcFound && nodes[i].data.id == ele.data().source) {
                            sourceNode = nodes[i];
                            srcFound = true;
                        } else if (!tarFound && nodes[i].data.id == ele.data().target) {
                            targetNode = nodes[i];
                            tarFound = true;
                        } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
                    }
                    // console.log("sourceNode", sourceNode);
                    // console.log("targetNode", targetNode);
                    // console.log("sourceNode color", sourceNode.data.color);
                    // console.log("targetNode color", targetNode.data.color);

                    if (sourceNode.data.group != targetNode.data.group) {
                        ele.style({
                            'line-color': ele.data('starred') ? 'yellow' : '#ff0000',
                            'line-style': "dashed"
                        })
                    } else {
                        ele.style({
                            'line-color': ele.data('starred') ? 'yellow' : colorsNode(sourceNode.data.group),
                            'line-style': "solid"
                        })
                    }
                    //MESSAGE///TAUX ETC
                })
            } else if (val == 'fix') {
                net.edges().forEach(function(ele) {
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : '#000000'
                    })
                })
            } else if (val == 'count') {
                net.edges().forEach(function(ele) {
                    //FIXME:
                    ele.data().count = ele.data().width
                    var width = ele.data().count;
                    var val = parseInt(countEdgeViewParam1.value);
                    var val2 = parseInt(countEdgeViewParam2.value);
                    var val3 = parseInt(countEdgeViewParam3.value);
                    //TODO: D3 SCALE
                    // console.log("widthedge", width)
                    if (width <= val) {
                        color = '#EEEEEE'
                    } else if (width > val && width <= val2) {
                        color = '#2BBBAD'
                    } else if (width > val2 && width <= val3) {
                        color = '#42A5F5'
                    } else if (width > val3) {
                        color = '#EF5350'
                    } else {
                        color = '#000000'
                    }
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : color
                    })
                })
            } else if (val == 'compNodEdg') {
                var data1 = []
                net.nodes().forEach(function(ele) {

                    data1.push(ele.degree())
                })

                var nodesMeanDeg = average(data1)

                net.edges().forEach(function(ele) {
                    //FIXME:
                    ele.data().count = ele.data().width
                    var width = ele.data().count;
                    var val = parseInt(countEdgeViewParam1.value);
                    var val2 = parseInt(countEdgeViewParam2.value);
                    var val3 = parseInt(countEdgeViewParam3.value);
                    var nodesMeanDeg = 0;
                    var nodesMeanDegtmp = 0;
                    var sourceNode, targetNode,
                        srcFound = false,
                        tarFound = false;

                    for (var i = 0, l = nodes.length; i < l; i++) {
                        if (!srcFound && nodes[i].data.id == ele.data().source) {
                            sourceNode = nodes[i];
                            srcFound = true;
                        } else if (!tarFound && nodes[i].data.id == ele.data().target) {
                            targetNode = nodes[i];
                            tarFound = true;
                        } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
                    }
                    var sourceDeg = sourceNode.degree();
                    var targetDeg = targetNode.degree();

                    //TODO: D3 SCALE
                    // console.log("widthedge", width)
                    if (width <= val && (sourceDeg < nodesMeanDeg || targetDeg < nodesMeanDeg)) {
                        color = '#BCBCBC'
                    } else if (width > val && width <= val3 && (sourceDeg < nodesMeanDeg || targetDeg < nodesMeanDeg)) {
                        color = '#2BBBAD'
                    } else if (width < val2 && (sourceDeg > nodesMeanDeg || targetDeg > nodesMeanDeg)) {
                        color = '#42A5F5'
                    } else if (width > val3 && (sourceDeg < nodesMeanDeg || targetDeg < nodesMeanDeg)) {
                        color = '#EF5350'
                    } else {
                        console.log(souc)
                        color = '#EEEEEE'
                    }
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : color
                    })
                })
            } else if (val == 'sigma') {
                var data1 = []
                console.log("data1", data1);

                net.edges().forEach(function(ele) {
                    //FIXME
                    ele.data().count = ele.data().width
                    data1.push(parseFloat(ele.data().count));
                    console.log("ele.data().width, ele.data().count", ele.data().width, ele.data().count);
                })

                console.log("I'm in sigma");
                console.log("data1", data1);
                var average1 = average(data1);
                var standardDeviation1 = standardDeviation(data1);
                console.log("average1", average1);
                console.log("standardDeviation1", standardDeviation1);
                var val = parseInt(countEdgeViewParam1.value);
                // NOT SURE IT IS NEEDED
                if (val > 6) {
                    val = 1;
                    console.log("sigma value set too high, so taking 1 instead")
                }
                console.log("val", val);
                net.edges().forEach(function(ele) {
                    //FIXME:
                    ele.data().count = ele.data().width
                    var width = ele.data().count;
                    //TODO: D3 SCALE

                    if (width <= (average1 - ((val + 4) * standardDeviation1)) || width >= (average1 + ((val + 4) * standardDeviation1))) {
                        color = '#FF1010'
                        zIndex = 10
                    } else if (width <= (average1 - ((val + 3) * standardDeviation1)) || width >= (average1 + ((val + 3) * standardDeviation1))) {
                        color = '#EC5350'
                        zIndex = 9
                    } else if (width <= (average1 - ((val + 2) * standardDeviation1)) || width >= (average1 + (val + 2) * standardDeviation1)) {
                        color = '#42A5F5'
                        zIndex = 8
                    } else if (width <= (average1 - ((val + 1) * standardDeviation1)) || width >= (average1 + (val + 1) * standardDeviation1)) {
                        color = '#2BBBAD'
                        zIndex = 7
                    } else if (width <= (average1 - ((val) * standardDeviation1)) || width >= (average1 + (val) * standardDeviation1)) {
                        color = '#20B0A0'
                        zIndex = 5
                    } else if (width <= (average1 + (val * standardDeviation1)) && width >= (average1 - (val * standardDeviation1))) {
                        color = '#EEEEEE'
                        zIndex = 4
                    } else {
                        console.log("FOR UNCLASSIFIEDS")
                        console.log(width);
                        console.log("average1", average1);
                        console.log("standardDeviation1", standardDeviation1);
                        color = '#000000'
                    }
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : color,
                        'z-index': ele.data('starred') ? 10 : zIndex
                    })
                })
            }
        }

    }
    //THEY ARE HERE BECAUSE THEY ARE ACCESSED FROM OUTSIDE: D3 PARAMETERS
colorsNode = d3.scale.category20c();
colorsEdge = d3.scale.category20c();
//we NEED scales
function createLinearScale(domain, range) {

    //parse type  TODO if we want otherscaletypes
    //parse domain TODO ex: [100, 500]
    //parse range TODO ex: [10, 50]

    for (var i = 0; i < scaleForParams.length; i++) {
        if (!scaleForParams[i]) {
            scaleForParams[i] = d3.scaleForParams.linear()
                .domain(domain)
                .range(range);
            console.log("i", i);
            return i
        }
    };
}


// var scale = d3.scale.linear()
//                     .domain([100, 500])
//                     .range([10, 350]);

//color mean
function colorMean(color1, color2) {
    console.log(color1, color2);
    rgb = hexToRgb(color1)
    shc = hexToRgb(color2)
        console.log("rgb", rgb)
        console.log("shc", shc)
    var r = rgb[Object.keys(rgb)[0]];
    var g = rgb[Object.keys(rgb)[1]];
    var b = rgb[Object.keys(rgb)[2]];
    var s = shc[Object.keys(shc)[0]];
    var h = shc[Object.keys(shc)[1]];
    var c = shc[Object.keys(shc)[2]];

    t = Math.round((r + s) / 2)
    i = Math.round((g + h) / 2)
    d = Math.round((b + c) / 2)
        console.log("t", t, "i", i, "d", d)
        console.log("rgbToHex(t, i, d)", rgbToHex(t, i, d))
    return rgbToHex(t, i, d)
}


//PLAY WITH COLOR
//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    console.log("hex", hex)
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
//find whats relevant

//STAT FUNCTIONS



function standardDeviation(values) {
    var avg = average(values);

    var squareDiffs = values.map(function(value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data) {
    var sum = data.reduce(function(sum, value) {
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}
