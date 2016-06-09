import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

// Import to load these templates
import '../../../ui/layouts/mainLayout.js';
import '../../../ui/pages/404.html';
import '../../../ui/pages/loading.html';
import '../../../ui/pages/home.js';

// Default routing settings
Router.configure( {
    layoutTemplate: 'mainLayout',
    notFoundTemplate: '404'
});

Router.route( '/', {
    name: 'homePage',
    action: function() {
      if ( !this.ready() ) this.render( 'loading' );
      else this.render( 'home' );
    }
} );

Router.route( '/login', {
    name: 'login',
    action: function() {
        // this.render( 'login' );
        this.render( 'fullPageAtForm' );
    }
} );

// import aditionnal routes
import './topograms.js'
import './privacy.js'
