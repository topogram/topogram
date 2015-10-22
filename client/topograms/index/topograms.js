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

Template.topograms.events( {
    'click .delete': function( e ) {
        e.preventDefault();
        // console.log( this );
        // var instance = UI.renderWithData(Template.content, {topogramId: data});
        var id = Session.get( 'toDelete' );
        // console.log( id );
        Meteor.call( 'deleteTopogram', id );
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

Template.topograms.helpers( {
    topograms: function( e ) {
        return Topograms.find().fetch().map( function( d, i ) {
            console.log(i);
            d.index = i + 1;
            d.privacy = d.sharedPublic ? 'Public' : 'Private';
            d.date = moment( d.createdAr ).format( 'MMMM Do YYYY, h:mm:ss a' );
            return d;
        } );
    }
} );
