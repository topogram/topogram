import './editMode.html'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import { setEdgeHandles } from '../../network/networkMethods.js'

Template.advancedEditMode.rendered = function() {
  Session.set( 'advancedEditMode', false )
}

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
