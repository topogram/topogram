import './filterByDegree.html'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session';

import { $ } from 'meteor/jquery'
// import * as noUiSlider from "nouislider"
import * as noUiSlider from "materialize-css/extras/noUiSlider/nouislider"
import "materialize-css/extras/noUiSlider/nouislider.css"

import { Edges } from '../../../../../api/collections.js'

Template.filterByDegree.helpers({
    hasEdgesWeight: function() {
        var edge = Edges.findOne()
        if (!edge) return false
        else return edge.data.count ? true : false
    },
    maxMinSlider: function() {
      return Session.get("minMaxDegree")
    }
})

var createSlider = function(dom, net, _min, _max) {
  var min = _min || 0,
      max = _max || 100

  noUiSlider.create(dom, {
      start: [min, max],
      connect: true,
      range: {
          'min': min,
          'max': max
      },
      format: {
          from: function(value) {
              return ~~value;
          },
          to: function(value) {
              return ~~value;
          }
      },
      step: 1
  })

  dom.noUiSlider.on('change', function(val) {
    Session.set("minMaxDegree", val)
    var filter = "node[[degree>="+val[0]+"]][[degree<="+val[1]+"]]"
    net.filterGraph(filter)
  })
}
Template.filterByDegree.onRendered(function() {

  var self = this
  var net = self.data.network.get()

  // recalculate scale
  self.autorun(function() {
    if(self.data.network.get()) {
      var deg = self.data.network.get().nodes().map( function (d){ return d.degree() } )
      console.log(deg);
      var min = (deg.length) ? Math.min.apply(Math, deg) : 0
      var max = (deg.length) ? Math.max.apply(Math, deg) : 100
      Session.set("minMaxDegree", [min, max])

      // update slider
      $("#filterByDegree")[0].noUiSlider.destroy()
      createSlider( $("#filterByDegree")[0] , self.data.network.get(), min, max)
      // auto.stop()
    }
  });

  // init slider
  createSlider( $("#filterByDegree")[0] , net)

})
