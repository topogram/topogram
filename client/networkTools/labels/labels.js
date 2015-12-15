Template.labels.events = {

  'click .toggle-node-labels': function(e, template) {
    var net = template.view.parentView.parentView._templateInstance.network.get().net;

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
