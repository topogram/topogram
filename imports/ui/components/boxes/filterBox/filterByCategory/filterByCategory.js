import './filterByCategory.html'
import { Template } from 'meteor/templating'

import { Session } from 'meteor/session'
import { Edges, Nodes } from  '../../../../../api/collections.js'
import { colors } from '../../../../../ui/helpers/colors.js'
import { $ } from 'meteor/jquery'


Template.filterByCategory.onRendered( function() {
  self = this;

  Session.set("selectedCategories", null)

  self.autorun(function(auto) {
    if(self.data.network.get()) {
      // TODO : remove ugly fix for materialize (hoping for React / Material-UI to come soon)
      self.$('select').material_select()
      $('select.filterByCategorynodes').material_select()
      $('select.filterByCategoryedges').material_select()
      auto.stop()
    }
  });
})

Template.filterByCategory.helpers({
    categories: function() {
      var coll = (this.type=="nodes") ? Nodes : Edges
      var els = coll.find({}, {
            fields: {
                'data': 1
            }
        }).fetch()

    var types = []
    els.forEach(function(el) {
        if (types.map(function(d){return d.name}).indexOf(el.data.group) < 0) types.push({
          "name" : el.data.group,
          "color" : colors(el.data.group)
        })
    })

    return types
}

})

Template.filterByCategory.events = {
  // filter
  'change select': function(event, instance) {

      var net = instance.data.network.get()

      var selectedCategories = $(event.target).find("option:selected").map(function(i, el){
        return $(el).val()
      }).toArray()

      Session.set("selectedCategories", selectedCategories)
      net.filterElements()
  }
}
