Template.nodesOptions.helpers({
  nodeColorMethod: function() {
      return ["fix", "setInFile", "group", "alphabet", "count", "compNodEdg", "sigma", "sigmaDegree"]
  },

  nodeSizeMethods: function() {
      var node = Nodes.findOne();
      var nodeSizeMethods = ["fixed", "degree"];
      if (!node) return false
      else if (node.data.count) nodeSizeMethods.push("width");
      return nodeSizeMethods
  },

});

Template.nodesOptions.events = {

  'change #nodeSize': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      var val = $(e.currentTarget).find('option:selected').val();
      var self = this;

      var degrees = net.nodes().nodes().map(function(e){ return e.degree() });
      var radiusScale = d3.scale.linear().domain([d3.min(degrees),d3.max(degrees)]).range([ 5, 40 ]);

      if (val == 'degree')
          net.nodes().style({
              'width': function (ele) { return radiusScale(ele.degree()) },
              'height': function (ele) { return radiusScale(ele.degree()) }
          })
      else if (val == 'fixed  ')
          net.nodes().style({
              'width': 5,
              'height': 5
          })
      else if (val == 'weight')
          net.nodes().style(function(ele) {
            return {
              'width': ele.data().count,
              'height': ele.data().count
            }
          })
  },
  'change #nodeColorMethod': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      var val = $(e.currentTarget).find('option:selected').val();
      var nodes = Nodes.find().fetch(),
          edges = Edges.find().fetch();
      var self = this;

      if (val == 'setInFile') {
          // console.log("I'm in nodefile")
          net.nodes().forEach(function(ele) {
              if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) == '#') {
                  ele.style({
                      'background-color': ele.data('starred') ? 'yellow' : ele.data().color
                  })
              } else if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) != '#') {
                  ele.style({
                      'background-color': ele.data('starred') ? 'yellow' : "#" + ele.data().color
                  })
              }
          })
      } else if (val == 'alphabet') {
          // console.log("I'm in! nodealpha")
          warning = []
          net.nodes().forEach(function(ele) {
                  // console.log("ele.data().name", ele.data().name)
                  if (ele.data().name == "" || 0) {
                      warning.push(ele.data().id);
                      var eleColor = colorsNode(ele.data().id.slice(0, 1))
                  } else {
                      var eleColor = colorsNode(ele.data().name.slice(0, 1));
                  }
                  ele.style({
                      'background-color': ele.data('starred') ? 'yellow' : eleColor
                  })
              })
              // console.log("warning.length", warning.length)

          if (warning.length > 0) {
              text = "elements with ids "
              for (index = 0; index < warning.length; index++) {
                  text += warning[index] + " ";
              }
              text += "used id instead of name field"
              FlashMessages.sendError(text)
          }
      } else if (val == 'group') {
          net.nodes().forEach(function(ele) {
              if (ele.data().group == 0 || "") {
                  FlashMessages.sendError("no data available, creating");
                  //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                  var tmpcol = colorsNode(ele.data().id);
                  // console.log(tmpcol)
                  ele.data({
                      'group': tmpcol
                  });
                  // console.log("ele.data().group", ele.data().group);
              }

              if (ele.data().color == 0 || "") {
                  //FlashMessages.sendError("no color available, creating");
                  //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                  var tmpcol = colorsNode(ele.data().group)
                      // console.log(tmpcol)
                  ele.data({
                      'color': tmpcol
                  });
                  // console.log("ele.data().color", ele.data().color);
                  if (ele.data().id == 'BEAL') {
                      // console.log('BEAL', ele.data().color)
                  }
              }
              // console.log(ele.data().color)
              var eleColor = (ele.data().group == 0) ? "#CCCCCC" : colorsNode(ele.data().group);
              // console.log(eleColor)
              ele.style({
                  'background-color': ele.data('starred') ? 'yellow' : eleColor
              })
          })
      } else if (val == 'sigma') {
          var data2 = []
          console.log("data2", data2);

          net.nodes().forEach(function(ele) {
              //FIXME
              ele.data().count = ele.data().width
              data2.push(parseFloat(ele.data().count));
              console.log("ele.data().width, ele.data().count", ele.data().width, ele.data().count);
          })

          console.log("I'm in sigma nodeS");
          console.log("data2", data2);
          var average2 = average(data2);
          var standardDeviation2 = standardDeviation(data2);
          console.log("average2", average2);
          console.log("standardDeviation2", standardDeviation2);
          var val = parseInt(countEdgeViewParam1.value);
          // NOT SURE IT IS NEEDED
          if (val > 6) {
              val = 1;
              console.log("sigma value set too high, so taking 1 instead")
          }
          console.log("val", val);
          net.nodes().forEach(function(ele) {
              //FIXME:
              ele.data().count = ele.data().width
              var width = ele.data().count;
              //TODO: D3 SCALE

              if (width <= (average2 - ((val + 4) * standardDeviation2)) || width >= (average2 + ((val + 4) * standardDeviation2))) {
                  color = '#FF1010'
                  zIndex = 10
              } else if (width <= (average2 - ((val + 3) * standardDeviation2)) || width >= (average2 + ((val + 3) * standardDeviation2))) {
                  color = '#EC5350'
                  zIndex = 9
              } else if (width <= (average2 - ((val + 2) * standardDeviation2)) || width >= (average2 + (val + 2) * standardDeviation2)) {
                  color = '#42A5F5'
                  zIndex = 8
              } else if (width <= (average2 - ((val + 1) * standardDeviation2)) || width >= (average2 + (val + 1) * standardDeviation2)) {
                  color = '#2BBBAD'
                  zIndex = 7
              } else if (width <= (average2 - ((val) * standardDeviation2)) || width >= (average2 + (val) * standardDeviation2)) {
                  color = '#20B0A0'
                  zIndex = 5
              } else if (width <= (average2 + (val * standardDeviation2)) && width >= (average2 - (val * standardDeviation2))) {
                  color = '#EEEEEE'
                  zIndex = 4
              } else {
                  console.log("FOR UNCLASSIFIEDS")
                  console.log(width);
                  console.log("average2", average2);
                  console.log("standardDeviation2", standardDeviation2);
                  color = '#000000'
              }
              ele.style({
                  'background-color': ele.data('starred') ? 'yellow' : color,
                  'z-index': ele.data('starred') ? 10 : zIndex
              })
          })
      } else if (val == 'sigmaDegree') {
          var data2 = []
          console.log("data2", data2);

          net.nodes().forEach(function(ele) {
              //FIXME
              //ele.data().count = ele.data().width
              data2.push(parseFloat(ele.degree()));
              console.log("ele.degree()", ele.degree());
          })

          console.log("I'm in sigma Degree Nodes");
          console.log("data2", data2);
          var average2 = average(data2);
          var standardDeviation2 = standardDeviation(data2);
          console.log("average2", average2);
          console.log("standardDeviation2", standardDeviation2);
          var val = parseInt(countEdgeViewParam1.value);
          // TOBEFIXED:need another use of ranges
          //if (val > 6 ) {
          val = 1;
          console.log("sigma value set to fix, so taking 1 instead, need rewrite")
              //}
          console.log("val", val);
          net.nodes().forEach(function(ele) {

              //ele.data().count = ele.data().width
              var width = ele.degree();
              //TODO: D3 SCALE

              if (width <= (average2 - ((val + 4) * standardDeviation2)) || width >= (average2 + ((val + 4) * standardDeviation2))) {
                  color = '#FF1010'
                  zIndex = 10
              } else if (width <= (average2 - ((val + 3) * standardDeviation2)) || width >= (average2 + ((val + 3) * standardDeviation2))) {
                  color = '#EC5350'
                  zIndex = 9
              } else if (width <= (average2 - ((val + 2) * standardDeviation2)) || width >= (average2 + (val + 2) * standardDeviation2)) {
                  color = '#42A5F5'
                  zIndex = 8
              } else if (width <= (average2 - ((val + 1) * standardDeviation2)) || width >= (average2 + (val + 1) * standardDeviation2)) {
                  color = '#2BBBAD'
                  zIndex = 7
              } else if (width <= (average2 - ((val) * standardDeviation2)) || width >= (average2 + (val) * standardDeviation2)) {
                  color = '#20B0A0'
                  zIndex = 5
              } else if (width <= (average2 + (val * standardDeviation2)) && width >= (average2 - (val * standardDeviation2))) {
                  color = '#EEEEEE'
                  zIndex = 4
              } else {
                  console.log("FOR UNCLASSIFIEDS")
                  console.log(width);
                  console.log("average2", average2);
                  console.log("standardDeviation2", standardDeviation2);
                  color = '#000000'
              }
              ele.style({
                  'background-color': ele.data('starred') ? 'yellow' : color,
                  'z-index': ele.data('starred') ? 10 : zIndex
              })
          })
      }

  }
}
