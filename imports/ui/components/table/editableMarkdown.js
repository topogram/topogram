import './editableMarkdown.html'

import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'
import { Nodes } from '../../../api/collections.js'


Template.editableMarkdown.created = function() {
  let template = Template.instance();
  template.isEditing   = new ReactiveVar(false)

  template.node = Nodes.findOne({ _id : this.data.nodeId})

  let text = template.node.data.additionalInfo
  // console.log(text);
  template.text   = new ReactiveVar(text)

}

Template.editableMarkdown.events({
  'click .markdown-trigger' : function(event, instance) {
    instance.isEditing.set(true)
  },
  'keyup [name="markdown-input"], focusout [name="markdown-input"]' : function(event, instance) {
    event.preventDefault();
    let val = event.currentTarget.value

    if(event.type === "keyup" && event.which === 13 ||
             event.type === "focusout") {
      // set tex
      console.log("save", instance, val);

      // save data
      Meteor.call("updateNodeInfo", instance.node._id, val)
      instance.text.set(val)

      instance.isEditing.set(false)
    } else if (event.type === "keyup" && event.which === 27) {
      // esc to cancel
      instance.isEditing.set(false)
    }

  }
})

Template.editableMarkdown.helpers({
  'isEditing' : function() {
    return Template.instance().isEditing.get()
  },
  'text' : function() {
    return Template.instance().text.get()
  },
  'hasText' : function() {
    return Template.instance().text.get() || Template.instance().text.get() != "" ? true : false
  }
})
