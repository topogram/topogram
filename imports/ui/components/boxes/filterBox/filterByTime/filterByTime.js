import './filterByTime.html'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session';

import { $ } from 'meteor/jquery'
import * as noUiSlider from "materialize-css/extras/noUiSlider/nouislider"
import "materialize-css/extras/noUiSlider/nouislider.css"

import { Nodes } from '../../../../../api/collections.js'

Template.filterByTime.helpers({
    hasTime: function() {
      var node = Nodes.findOne()
        if (!node) return false
        else return (node.data.start && node.data.end) ? true : false
    },
    minMaxTime: function() {
      console.log(Session.get("minMaxTime"));
      return Session.get("minMaxTime")
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
    Session.set("minMaxTime", val)
    net.filterElements()
  })
}

Template.filterByTime.onRendered(function() {

  var self = this
  var net = self.data.network.get()

  // recalculate scale
  self.autorun(function() {
    if(self.data.network.get()) {

      var startEndRange = []
      self.data.network.get().nodes().forEach( function (d){
        if(d.data().start) startEndRange.push(d.data().start);
        if(d.data().end) startEndRange.push(d.data().end);
      } )

      // console.log(startEndRange)
      var min = (startEndRange.length) ? Math.min.apply(Math, startEndRange) : 0
      var max = (startEndRange.length) ? Math.max.apply(Math, startEndRange) : 100
      Session.set("minMaxTime", [min, max])

      // update slider
      $("#filterByTime")[0].noUiSlider.destroy()
      createSlider( $("#filterByTime")[0] , self.data.network.get(), min, max)
      // auto.stop()
    }
  });

  // init slider
  createSlider( $("#filterByTime")[0] , net)

})
