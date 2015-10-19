Template.nodeMerge.onCreated = function() {
    Session.set("mergeSource", null );
    Session.set("mergeTargets", null);
}

Template.nodeMerge.events({
    'click .modal-merge-close': function( e ) {
        $( '#modal-merge' ).closeModal();
    },
    'click .select-merge-target' : function( e, template ) {
        var targetId = $( e.target ).data( 'merge-target-id' );
        var sourceId = $( e.target ).data( 'merge-source-id' );
        Meteor.call("mergeNodes", sourceId, targetId);
        $( '#modal-merge' ).closeModal();

        var targetNodeId = Nodes.findOne({_id : targetId} ).data.id;
        var net = template.view.parentView._templateInstance.network.get().net;

        // remove from graph
        var node = net.filter('node[id ="'+ targetNodeId + '"]')
        net.remove(node.neighborhood('edge'));
        net.remove(node);
    }
})

Template.nodeMerge.helpers({
    targets: function() {
        return Session.get("mergeTargets")
    },
    source : function() {
        return Session.get("mergeSource");
    }
})
