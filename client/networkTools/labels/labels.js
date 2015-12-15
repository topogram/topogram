Template.labels.helpers({
  nodeLabelLocations: function() {
      return ["above", "below", "alternate"]
  }
})

Template.labels.events = {

  'change #nodeLabelLocation': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      var val = $(e.currentTarget).find('option:selected').val();
      var nodes = Nodes.find().fetch(),
          edges = Edges.find().fetch();
      var self = this;

      if (val == 'above') {
          net.nodes().forEach(function(ele) {
              ele.style({
                  'text-valign': 'top'

              })
          })
      } else if (val == 'below') {
          net.nodes().forEach(function(ele) {
              ele.style({
                  'text-valign': 'bottom'

              })
          })
      } else if (val == 'alternate') {
          var alternate = 1;
          net.nodes().forEach(function(ele) {
              erro = alternate % 2
                  // console.log("alternate % 2", erro)
              if ((alternate % 2) == 0) {
                  // console.log("here")
                  ele.style({
                      'text-valign': 'top'

                  })
              } else {
                  // console.log("there");
                  ele.style({
                      'text-valign': 'bottom'

                  })
              }
              alternate = alternate + 1;
              // console.log("alternate", alternate);
          })
      }
  },

  'change #textSizeParam': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      var val = textSizeParam.value;
      net.nodes().css({
          'font-size': val
      })
  },

  'click .toggle-node-labels': function(e, template) {
    var net = template.view.parentView.parentView.parentView._templateInstance.network.get().net;

    if (net.nodes()[0].css('content') == '') {
      net.nodes().css({
        'content': function(e) {
          if (e.data().data) return e.data().name;
          else return '';
        }
      });
    } else {
      net.nodes().css({
        'content': ''
      });
    }
  },

  'click .toggle-edge-labels': function(e, template) {
    var net = template.view.parentView.parentView._templateInstance.network.get().net;

    if (net.edges()[0].css('content') == '') {

      net.edges().css({
        'content': function(e) {
          if (e.data().data) return e.data().name;
          else return '';
        }
      });
    } else {
      net.edges().css({
        'content': ''
      });
    }
  }
}
