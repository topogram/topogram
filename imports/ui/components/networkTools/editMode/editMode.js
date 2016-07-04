import './editMode.html'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import { setEdgeHandles } from '../../network/networkMethods.js'

Template.advancedEditMode.onRendered( function() {
  Session.set( 'advancedEditMode', false )
  var self = this
  self.autorun(function(auto) {
    if(self.data.network.get()) {
      var graph = self.data.network.get()
      setEdgeHandles(graph, false)
      auto.stop()
    }
  });
})

Template.advancedEditMode.helpers = {
  editModeOnOff : function() {
    return Session.get('advancedEditMode')
  }
}

Template.advancedEditMode.events = {

  'change #toggle-advanced-edit-mode': function(event, instance) {
      var advancedEditMode = event.target.checked

      var graph = instance.data.network.get()
      setEdgeHandles(graph, advancedEditMode)

      Session.set('advancedEditMode', advancedEditMode)
  }
}

Template.advancedEditMode.destroyed = function(){
  console.log("Session.set('advancedEditMode', advancedEditMode)");
  Session.set('advancedEditMode', false)
}
