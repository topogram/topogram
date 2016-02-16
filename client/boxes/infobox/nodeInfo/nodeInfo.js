Template.nodeInfo.rendered= function(){
  $(".collapsible").collapsible();
}

Template.nodeInfo.helpers({
  neighborhood: function() {
    var node = Template.instance().data.node;
    var network = Template.instance().data.network
    if(node) {
      var neighborhood = network.nodes().filter("[id='"+node.id+"']").neighborhood();
      return neighborhood.nodes().map(function(d){ return d.data()});
    }
  }
})
