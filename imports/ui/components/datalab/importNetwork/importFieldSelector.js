import "./importFieldSelector.html"

import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

Template.importSelectFieldOptional.created = function() {
 this.showSelectFields = new ReactiveVar(false)
}

Template.importSelectFieldOptional.helpers({
  'showSelectFields' : function() {
    return Template.instance().showSelectFields.get()
  }
})


Template.importSelectFieldOptional.events({
 'change input[type="checkbox"]' : function(event, instance) {
 instance.showSelectFields.set( event.currentTarget.checked)
 }
})
