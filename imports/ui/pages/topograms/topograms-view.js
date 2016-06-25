import './topograms-view.html'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.topogramView.created = function() {

  // reactive var to share across templates
  this.network = new ReactiveVar()
  this.changeLayout = new ReactiveVar()
  this.graphState = new ReactiveVar()  // init graph state (TODO : should be reactiveDict or loaded from somewhere)

  var graphState = { // should be loaded from db
      showNodesLabels : 1,
      showEdgesLabels : 0,
      layout : "circle"
    }
  Template.instance().graphState.set(graphState)
}

Template.topogramView.helpers({
  networkInstance : function(){
    return Template.instance().network
  },
  topogramId : function(){
    return FlowRouter.getParam('topogramId')
  }
})
