Template.infobox.rendered = function() {
  $("#infoBox").hide();
};

Template.infobox.helpers({
  network : function(){
    return Template.instance().view.parentView._templateInstance.network.get();
  },
  currentSelection: function() {
      var item = getCurrentSelection();
      return item.data;
  },
  target : function() {
    var network = Template.instance().view.parentView._templateInstance.network.get();
    if( Session.get( 'currentId' ) && Session.get( 'currentType' ) && Session.get('pathTargetNodeId') ){
      var targetNode = network.nodes().filter("[id='"+Session.get('pathTargetNodeId')+"']");
      return targetNode.data()
    }
  },
  pathToTarget: function() {
    var network = Template.instance().view.parentView._templateInstance.network.get();
    if( Session.get( 'currentId' ) && Session.get( 'currentType' ) && Session.get('pathTargetNodeId') ){
      var sourceNode = network.nodes().filter("[id='"+Session.get('currentId')+"']");
      var targetNode = network.nodes().filter("[id='"+Session.get('pathTargetNodeId')+"']");
      var path = network.elements().dijkstra(sourceNode).pathTo(targetNode);
      return path.nodes().map(function(d){ return d.data() });
    }
  }
})

Template.infobox.events = {
    'click #closeInfoBox': function( event, template ) {
        var network = template.view.parentView._templateInstance.network.get()
        network.deselectAll()
    }
};
