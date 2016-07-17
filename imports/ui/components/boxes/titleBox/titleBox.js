import './titleBox.html'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { $ } from 'meteor/jquery'

import { editableText } from 'meteor/babrahams:editable-text'

Template.titleBox.created = function() {
    this.editMode = this.data.editMode
}

Template.titleBox.rendered = function() {
    $(".collapsible").collapsible()
}

Template.titleBox.helpers({
    isEditable : function() {
      return Template.instance().data.editMode
    },
    topogram: function() {
      return Template.instance().data.topogram
    },
    topogramName: function() {
      return Template.instance().data.topogramName
    },
    topogramId: function() {
      return FlowRouter.getParam('topogramId')
    },
    networkInstance : function(){
      return Template.instance().data.network
    }
})

Template.titleBox.events =  {
  'click #toggle-toolbox' : function() {
    $('#toolbox').toggle()
  },
  'click #share-icon' : function() {
    $('#shareBox').toggle()
  },
  'click #toggle-searchBox' : function() {
    $('#searchBox').toggle()
  },
  'click #toggle-algobox' : function() {
    $('#algobox').toggle()
  },
  'click #toggle-filterBox' : function() {
    $('#filterBox').toggle()
  },
  'click #toggle-commentbox' : function() {
    $('#commentBox').toggle()
  },
  'click #download-png' : function(event, template) {
    console.log(template)
    var network = template.data.network.get()
    var png =  network.png({
      // 'full' : true
    })
    var a = document.createElement("a")
    a.download = "network.png"
    a.href = png
    a.click()

  }
}
