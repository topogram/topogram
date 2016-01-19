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

Template.network.rendered = function() {

}

Template.single.helpers( {
    topogram: function() {
        var topogram = Topograms.findOne();
        // console.log(topogram);
        return topogram;
    },
    graphState: function() {
      console.log(this);
      return this.graphState;
    }
});
