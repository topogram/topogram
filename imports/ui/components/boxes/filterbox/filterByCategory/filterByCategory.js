import './filterByCategory.html'
import { Template } from 'meteor/templating'

import { Edges, Nodes } from  '../../../../../api/collections.js'
import { colors } from '../../../../../ui/helpers/colors.js'


Template.filterByCategory.rendered = function() {
  this.$("select").material_select()
}

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
  'change select': function(e, template) {

      var selectedCategories = $(e.target).find("option:selected").map(function(i, el){ return $(el).val() }).toArray()

      var net = template.view.parentView.parentView.parentView.parentView._templateInstance.network.get()

      var els = (template.data.type=="nodes") ? net.nodes() : net.edges()
      // var els = net.elements()

      if (!selectedCategories.length) {
          els.show()  // show everything
      } else {
          var selectedEls = els.filterFn(function(ele) {
              return  selectedCategories.indexOf(ele.data("group")) > -1
          })

          net.selectElements(selectedEls)
      }
  }
}
