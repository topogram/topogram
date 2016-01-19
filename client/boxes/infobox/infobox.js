Template.infobox.rendered = function() {
  $("#infoBox").hide()
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

        // append
        if ( item.data ) {
            if ( item.data ) delete( item.data.url )
            item.info = item.data;
        };

        return item;
    }
} )

Template.infobox.events = {
    'click #closeInfoBox': function( event, template ) {
        var network = template.view.parentView._templateInstance.network.get()
        network.nodes().style({ "opacity": '1' });
        network.edges().style({ "opacity": '1' });
        network.nodes().selectify();
        network.edges().selectify();
        $( "#infoBox" ).css( 'visibility', 'hidden' );
    }
};
