import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import React from 'react';
import {mount} from 'react-mounter';

import mainLayout from '../../../ui/layouts/mainLayout.jsx'
import { Welcome} from '../../../ui/pages/home.jsx';

import '../../../ui/pages/404.html'

//Render homepage with React
FlowRouter.route("/", {
  action() {
    mount(mainLayout, {
        content: (<Welcome name="Welcome to Topogram"/>)
    });
  }
});


//404
FlowRouter.notFound = {
   action: function() {
     BlazeLayout.render("mainLayout", { main: "404" });
   }
}
