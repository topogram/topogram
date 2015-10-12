Template.networkTools.onCreated(function() {
    this.changeLayout = new ReactiveVar();

    // inherit change layout function from parent network view
    this.changeLayout.set(this.view.parentView._templateInstance.changeLayout.get())
});

Template.networkTools.rendered = function() {}

Template.networkTools.helpers({

    layouts: function() {
        return [
            "springy", "random", "grid", "circle", "breadthfirst", "concentric"
        ].map(function(d) {
            return {
                "slug": d,
                "name": d.charAt(0).toUpperCase() + d.slice(1)
            };
        });
    },

    nodeCategories: function() {
        var node = Nodes.findOne({}, {
            fields: {
                "data.data": 1
            }
        });
        return Object.keys(node.data.data);
    },

    nodeTypes: function() {
        var nodes = Nodes.find({}, {
            fields: {
                "data.data": 1
            }
        }).fetch();

        var types = [];
        nodes.forEach(function (node) {
            if(types.indexOf(node.data.data.type)< 0) types.push(node.data.data.type)
        })
        return types
    }

})

Template.networkTools.events = {

    // add/remove nodes
    "click #add-node": function() {
        var nodeId = 'node' + Math.round(Math.random() * 1000000);
        var node = makeNode(nodeId);
        Meteor.call("addNode", node);
    },

    // add random nodes 
    "click #init-data": function() {
        Meteor.call("resetNetworkData", this.networkId);
    },

    // apply layout
    'click .layout': function(e, template) {
        template.view.parentView._templateInstance.changeLayout.get()($(e.target).data().layoutName);
    },

    // color
    'change #nodeCatColor': function(e, template) {
        var val = $(e.currentTarget).find('option:selected').val();
        var net = template.view.parentView._templateInstance.network.get().net;

        // console.log(val);
        updateNodesColorsByCat(net, val);

    },

    // filter
    'change #nodeFilterType': function(e, template) {
        var val = $(e.currentTarget).find('option:selected').val();
        var net = template.view.parentView._templateInstance.network.get().net;

        // console.log(val);
        net.nodes().filterFn(function( ele ){
          return ele.data('type') == val;
        });;

    },

    'click .toggle-node-labels': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;

        if (net.nodes()[0].css("content") == "") {
            net.nodes().css({
                'content': function(e) {
                    console.log(e.data().data.name);
                    return e.data().data.name;
                }
            });
        } else {
            net.nodes().css({
                "content": ""
            });
        }
    },

    'click .toggle-edge-labels': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;

        if (net.edges()[0].css("content") == "") {
            net.edges().css({
                'content': function(e) {
                    if (e.data().data) return e.data().data.name;
                    else return ""
                }
            });
        } else {
            net.edges().css({
                "content": ""
            });
        }

    },

    // toggle add/remove edges feature
    'click #draw-edgehandles': function() {

        // var edgeHandlesOn = Session.get('edgeHandlesOn') == "drawoff" ? "drawon" : "drawoff";
        // var edgeHandlesOn = Session.get('edgeHandlesOn') == 'disable' ? 'enable' : 'disable';

        var edgeHandlesOn = Session.get('edgeHandlesOn') ? false : true;
        Session.set('edgeHandlesOn', edgeHandlesOn);
        console.log(edgeHandlesOn);
        if (edgeHandlesOn) net.edgehandles.start();
    },

    // degree
    'click #remove-isolated-nodes': function() {
        // var network = Template.instance().network.get().net;
        var isolated = network.elements("node[[degree = 0]]")
        network.remove(isolated);
    }

}

// BUG : colors don't change
function updateNodesColorsByCat (net, val){
    var colors = d3.scale.category20b();

    net.nodes().css({
            'background-color': function(n) {
                return n.data("starred") ? "yellow" : colors( n.data().data[val] );
                }
            });


}
