import './nodeMerge.html'
import { Template } from 'meteor/templating'

Template.nodeMerge.onCreated = function() {
    Session.set( "mergeSource", null );
    Session.set( "mergeTargets", null );
};

Template.nodeMerge.events( {
    'click .modal-merge-close': function( e ) {
        $( '#modal-merge' ).closeModal();
    },
    'click .select-merge-target': function( e, template ) {
        var targetId = $(e.target).data('merge-target-id');
        var sourceId = $(e.target).data('merge-source-id');
        var targetGraphId = $(e.target).data('node-to-remove');

        console.log(targetId, sourceId, targetGraphId);

        Meteor.call("mergeNodes", sourceId, targetId);

        $( '#modal-merge' ).closeModal();

        console.log(template);
        var net = template.view.parentView._templateInstance.network.get();
        console.log(net);
        // remove from graph
        var node = net.filter( 'node[id ="' + targetGraphId + '"]' )
        console.log(node);
        // node.neighborhood('edge').remove();
        net.remove(node); // BUG : throw Error
    }
} );

Template.nodeMerge.helpers( {
    targets: function() {
      var targetsId = Session.get( "mergeTargets" );
      console.log(targetsId);
      var nodes = [];
      if (targetsId) nodes = Nodes.find({"data.id" : { "$in" : targetsId }}).fetch();
      return nodes;
    },
    source: function() {
      var sourceId = Session.get( "mergeSource" );
      var node = null;
      if(sourceId) node = Nodes.findOne({"data.id" : sourceId });
      return node;
    }
} );
