Template.infobox.rendered = function() {
  $("#infoBox").css('visibility', 'hidden');
};

Template.infobox.helpers( {
    comments: function() {
        var type = Session.get( 'currentType' ) || 'node',
            id = Session.get( 'currentId' ) || 'node-000';
        var comments = Comments.find( {
            'id': id,
            'type': type
        } ).fetch();
        return comments
    },

    currentSelection: function() {
        var id = Session.get( 'currentId' ),
            type = Session.get( 'currentType' ),
            item = {};

        if ( type == 'node' ) {
            item = Nodes.findOne( {
                'data.id': id
            } );
        } else if ( type == 'edge' ) {
            item = Edges.findOne( {
                'data.id': id
            } );
        }
        return item.data;
    }
} )

Template.infobox.events = {
    'click #closeInfoBox': function( event, template ) {
        var network = template.view.parentView._templateInstance.network.get()
        network.unFocus();
        $( "#infoBox" ).css( 'visibility', 'hidden' );
    }
};
