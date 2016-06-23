import './filterbox.html'
import { Template } from 'meteor/templating'

import './filterByCategory/filterByCategory.js'
import './filterByDegree/filterByDegree.js'


Template.filterbox.events({
  'click .clear-filters' : function(event, instance) {
    console.log(template)
    var net = template.view.parentView.parentView._templateInstance.network.get()
    console.log(net)
    net.resetFilters()
  },
  "click .close-filters" : function(event) {
    console.log("close")
    $("#filterbox").hide()
  }
})
