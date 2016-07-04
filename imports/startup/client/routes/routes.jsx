import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import React from 'react';
import {mount} from 'react-mounter';
import {Layout, Welcome} from '../../../ui/pages/test.jsx';

import '../../../ui/layouts/mainLayout.js'
import '../../../ui/pages/home.js'
import '../../../ui/pages/404.html'

FlowRouter.route( '/', {
    name: 'homePage',
    action () {
      BlazeLayout.render("mainLayout", { main: "home" });
    }
} )

//404

FlowRouter.notFound = {
   action: function() {
     BlazeLayout.render("mainLayout", { main: "404" });
   }
}

// Test to render some React
// FlowRouter.route("/test", {
//   action() {
//     mount(Layout, {
//         content: (<Welcome name="arunoda"/>)
//     });
//   }
// });
