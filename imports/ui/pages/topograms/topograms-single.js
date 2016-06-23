import './topograms-single.html'
import { Template } from 'meteor/templating'
import { Topograms } from '../../../api/collections.js'
import { ReactiveVar } from 'meteor/reactive-var'
import { $ } from "meteor/jquery"

import '../../components/network/network.js'
import '../../components/boxes/titlebox/titlebox.js'
import '../../components/boxes/searchbox/searchbox.js'
import '../../components/boxes/sharebox/sharebox.js'
import '../../components/boxes/filterbox/filterbox.js'
import '../../components/boxes/infobox/infobox.js'

import '../../components/networkTools/selectLayout/selectLayout.js'
import '../../components/networkTools/editMode/editMode.js'

// import '../../components/boxes/algobox/algobox.js'
// import '../../components/boxes/toolbox/toolbox.js'

Template.single.helpers({
  networkInstance : function(){
    // console.log("ha", Template.instance().network)
    return Template.instance().network
  },
  topogramId : function(){
    var t = Topograms.findOne()
    return t._id
  }
})

Template.single.created = function() {

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

Template.single.rendered = function() {

  $("#filterbox").hide()
  $("#sharebox").hide()

}
