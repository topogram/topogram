Template.filterByDegree.helpers({
    hasEdgesWeight: function() {
        var edge = Edges.findOne();
        if (!edge) return false
        else return edge.data.count ? true : false;
    },
    maxMinSlider: function() {
      return Session.get("minMaxDegree")
    }
})

Template.filterByDegree.rendered = function() {

  var self = this;
  console.log(this);

  // TODO : get scale
  var min = 2;
  var max = 50;

  Session.set("minMaxDegree", [min, max])

  // create slider
  noUiSlider.create($("#filterByDegree")[0], {
      start: [min, max],
      connect: true,
      range: {
          'min': min,
          'max': max
      },
      format: wNumb({
          decimals: 0
      }),
      step: 1
  })

  $("#filterByDegree")[0].noUiSlider.on('change', function(val) {
    var net = self.view.parentView.parentView.parentView._templateInstance.network.get()

    // update slider min / max
    // var min = net.nodes().minDegree();
    // var max = net.nodes().maxDegree();
    //
    // $("#filterByDegree")[0].noUiSlider.updateOptions({
  	// 	range: {
  	// 		'min': min,
  	// 		'max': max
  	// 	}
  	// });

    Session.set("minMaxDegree", val)

    var filter = "node[[degree>="+val[0]+"]][[degree<="+val[1]+"]]";

    var selected = net.nodes().filter(filter);
    selected.show();
    net.nodes().difference(selected).hide();
  })

};
