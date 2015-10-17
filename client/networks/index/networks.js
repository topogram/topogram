Template.addNetwork.events( {
    'submit form': function( event ) {
        event.preventDefault();
        var networkName = $( '[name=networkName]' ).val();
        if( networkName != '' ){
            Meteor.call( 'createNetwork', networkName );
            $( '[name=networkName]' ).val( '' );
        }
        else {
            FlashMessages.sendError( 'NetworkName should not be empty' );
        }
    }
} );

Template.networks.events( {
    'click .delete': function( e ) {
        e.preventDefault();
        // console.log( this );
        // var instance = UI.renderWithData(Template.content, {networkId: data});
        var id = Session.get( 'toDelete' );
        // console.log( id );
        Meteor.call( 'deleteNetwork', id );
        var id = Session.set( 'toDelete', '' );
    },
    'click .modal-delete-open': function( e ) {
        $( '#modal-delete' ).openModal();
        var id = $( e.target ).data( 'modal-template' );
        // console.log( id );
        Session.set( 'toDelete', id );
    },
    'click .modal-delete-close': function( e ) {
        $( '#modal-delete' ).closeModal();
    }
} );

Template.networks.helpers( {
    networks: function( e ) {
        return Networks.find().fetch().map( function( d, i ) {
            d.index = i + 1;
            d.privacy = d.sharedPublic ? 'Public' : 'Private';
            d.date = moment( d.createdAr ).format( 'MMMM Do YYYY, h:mm:ss a' );
            return d;
        } );
    }
} );
