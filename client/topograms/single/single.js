Template.single.helpers({
  networkInstance : function(){
    // console.log("ha", Template.instance().network);
    return Template.instance().network
  },
  topogramId : function(){
    var t = Topograms.findOne();
    return t._id
  }
})

Template.single.created = function() {

  // reactive var to share across templates
  this.network = new ReactiveVar();
  this.changeLayout = new ReactiveVar();
  this.graphState = new ReactiveVar(); // init graph state (TODO : should be reactiveDict or loaded from somewhere)

  var graphState = { // should be loaded from db
      showNodesLabels : 1,
      showEdgesLabels : 0,
      layout : "circle"
    }

  Template.instance().graphState.set(graphState);
}

Template.single.rendered = function() {

  $("#filterbox").hide();
  $("#sharebox").hide();

}
