Template.sigma.events = {
  'change #sigmaViewParam': function(e, template) {

      var net = template.view.parentView._templateInstance.network.get().net;
      //var val = $(e.currentTarget).find('value').val();
      var val = parseFloat(sigmaViewParam.value);


      console.log("values", val);
      var data1 = [];
      console.log("data1", data1);

      net.edges().forEach(function(ele) {
              //FIXME

              ele.data().count = ele.data().width;
              console.log("ele.data().count = ele.data().width", ele.data().count, ele.data().width);
              data1.push(parseFloat(ele.data().count));
          })
          //console.log("I'm in sigma")
      console.log(data1);
      var average1 = average(data1);
      var standardDeviation1 = standardDeviation(data1);
      //console.log("average1",average1);
      //console.log("standardDeviation1",standardDeviation1);

      // NOT SURE IT IS NEEDED
      if (val > 6) {
          val = 1;
          console.log("sigma value set too high, so taking 1 instead")
      }
      net.edges().forEach(function(ele) {
          //FIXME:
          ele.data().count = ele.data().width
          var width = ele.data().count;
          //TODO: D3 SCALE

          if (width <= (average1 - ((val + 4) * standardDeviation1)) || width >= (average1 + ((val + 4) * standardDeviation1))) {
              color = '#FF1010'
              zIndex = 10
          } else if (width <= (average1 - ((val + 3) * standardDeviation1)) || width >= (average1 + ((val + 3) * standardDeviation1))) {
              color = '#EC5350'
              zIndex = 9
          } else if (width <= (average1 - ((val + 2) * standardDeviation1)) || width >= (average1 + (val + 2) * standardDeviation1)) {
              color = '#42A5F5'
              zIndex = 8
          } else if (width <= (average1 - ((val + 1) * standardDeviation1)) || width >= (average1 + (val + 1) * standardDeviation1)) {
              color = '#2BBBAD'
              zIndex = 7
          } else if (width <= (average1 - ((val) * standardDeviation1)) || width >= (average1 + (val) * standardDeviation1)) {
              color = '#20B0A0'
              zIndex = 5
          } else if (width <= (average1 + (val * standardDeviation1)) && width >= (average1 - (val * standardDeviation1))) {
              color = '#EEEEEE'
              zIndex = 4
          } else {
              console.log("FOR UNCLASSIFIEDS")
              console.log(width);
              console.log("average1", average1);
              console.log("standardDeviation1", standardDeviation1);
              color = '#000000'
          }
          ele.style({
              'line-color': ele.data('starred') ? 'yellow' : color,
              'z-index': ele.data('starred') ? 10 : zIndex
          })
      })

  },
  'change #sigmaNodeDegreeViewParam': function(e, template) {
      var net = template.view.parentView._templateInstance.network.get().net;
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
      var val = parseInt(sigmaNodeDegreeViewParam.value);
      // TOBEFIXED:need another use of ranges
      if (val > 6) {
          val = 1;
          console.log("sigma value set to fix, so taking 1 instead, need rewrite")
      }
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
