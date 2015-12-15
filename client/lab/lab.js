Template.lab.helpers({

  topogram: function() {
      var topogram = Topograms.findOne();
      // console.log(topogram);
      return topogram;
  },

  hasNodes: function() {
      return Nodes.find().fetch().length > 0;
  },

  hasEdges: function() {
      return Edges.find().fetch().length > 0;
  },

  hasElements: function() {
      return Nodes.find().fetch().length > 0 || Edges.find().fetch().length > 0;
  },

})
