import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import React from 'react';
import {mount} from 'react-mounter';
import {Layout, Welcome} from '../../../ui/pages/test.jsx';

import '../../../ui/layouts/mainLayout.js'
import '../../../ui/pages/home.js'

FlowRouter.route( '/', {
    name: 'homePage',
    action () {
      BlazeLayout.render("mainLayout", { main: "home" });
      // console.log(this)
      // if ( !this.ready() ) this.render( 'loading' )
      // else this.render( 'home' )
    }
} )

import './topograms.jsx'


// Test to render some React
// FlowRouter.route("/test", {
//   action() {
//     mount(Layout, {
//         content: (<Welcome name="arunoda"/>)
//     });
//   }
// });
