import './filterbox.html'
import { Template } from 'meteor/templating'

import './filterByCategory/filterByCategory.js'
import './filterByDegree/filterByDegree.js'

import $ from 'meteor/jquery'

Template.filterbox.events({
  'click .clear-filters' : function(event, instance) {
    var net = instance.view.parentView.parentView._templateInstance.network.get()
    console.log(net)
    net.resetFilters()
  },
  "click .close-filters" : function() {
    console.log("close")
    $("#filterbox").hide()
  }
})
