Template.addTopogram.events( {
    'submit form': function( event ) {
        event.preventDefault();
        var topogramName = $( '[name=topogramName]' ).val();
        if ( topogramName != '' ) {
            Meteor.call( 'createTopogram', Meteor.userId(), topogramName );
            $( '[name=topogramName]' ).val( '' );
        } else {
            FlashMessages.sendError( 'TopogramName should not be empty' );
        }
    }
} );
