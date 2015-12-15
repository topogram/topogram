

Template.filterByWeight.rendered = function() {

  // TODO calculate
  var min = 0;
  var max = 256;

  // create slider
  noUiSlider.create($("#filterEdgeByWeight")[0], {
    start: [20, 100],
    connect: true,
    range: {
      'min': min,
      'max': max
    },
   format: wNumb({
     decimals: 0
   })
 })

 var self = this;

 //events
 $("#filterEdgeByWeight")[0].noUiSlider
    .on('slide', function (val) {
      Session.set('filterEdgeByWeight', val);
    })
 $("#filterEdgeByWeight")[0].noUiSlider
    .on('change', function (val) {
      Session.set('filterEdgeByWeight', [Math.round(val[0]), Math.round(val[1])]);
      var net = self.view.parentView.parentView.parentView._templateInstance.network.get().net;
      var colorScale = d3.scale.category10().domain([min, val[0], val[1], max]);
      net.edges().css({
        "line-color" : function(e) { return colorScale(e.data().count) }
      });
    });
};
