import './topograms-add.html'

Template.addTopogram.events( {
    'submit form': function( event ) {
        event.preventDefault() 
        var topogramName = $( 'input[name="topogramName"]' ).val() 
        console.log(topogramName) 
        if ( topogramName != '' ) {
            Meteor.call( 'createTopogram', Meteor.userId(), topogramName, function(err, topogram){
              Router.go( '/topograms/' + topogram + '/import' ) 
            }) 

            $( '[name=topogramName]' ).val( '' ) 
        } else {
            FlashMessages.sendError( 'TopogramName should not be empty' ) 
        }
    }
} ) 
