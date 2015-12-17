Template.sigma.events = {
  'change #sigmaViewParam': function(e, template) {

      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      //var valEdg = $(e.currentTarget).find('value').val();
      var valEdg = parseFloat(sigmaViewParam.value);


      console.log("values", valEdg);
      var dataSigmaEdge = [];
      console.log("dataSigmaEdge", dataSigmaEdge);

      net.edges().forEach(function(ele) {
              //FIXME

              ele.data().count = ele.data().width;
              console.log("ele.data().count = ele.data().width", ele.data().count, ele.data().width);
              dataSigmaEdge.push(parseFloat(ele.data().count));
          })
          console.log("I'm in sigma")
      console.log(dataSigmaEdge);
      var averageEd = average(dataSigmaEdge);
      var standardDeviationEd = standardDeviation(dataSigmaEdge);
      console.log("averageEd",averageEd);
      console.log("standardDeviationEd",standardDeviationEd);

      //FOR INIT, NOT SURE IT IS NEEDED BUT HEY... IT WORKS
      if (valEdg > 6) {
          valEdg = 1;
          console.log("sigma value set too high, so taking 1 instead")
      }
      net.edges().forEach(function(ele) {
          //FIXME:
          ele.data().count = ele.data().width
          var widthEd = ele.data().count;
          var zIndexEd = 10;
          //TODO: D3 SCALE

          if (widthEd <= (averageEd - ((valEdg + 4) * standardDeviationEd)) || widthEd >= (averageEd + ((valEdg + 4) * standardDeviationEd))) {
              color = '#FF1010'
              zIndexEd = 10
          } else if (widthEd <= (averageEd - ((valEdg + 3) * standardDeviationEd)) || widthEd >= (averageEd + ((valEdg + 3) * standardDeviationEd))) {
              color = '#EC5350'
              zIndexEd = 9
          } else if (widthEd <= (averageEd - ((valEdg + 2) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg + 2) * standardDeviationEd)) {
              color = '#42A5F5'
              zIndexEd = 8
          } else if (widthEd <= (averageEd - ((valEdg + 1) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg + 1) * standardDeviationEd)) {
              color = '#2BBBAD'
              zIndexEd = 7
          } else if (widthEd <= (averageEd - ((valEdg) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg) * standardDeviationEd)) {
              color = '#20B0A0'
              zIndexEd = 5
          } else if (widthEd <= (averageEd + (valEdg * standardDeviationEd)) && widthEd >= (averageEd - (valEdg * standardDeviationEd))) {
              color = '#EEEEEE'
              zIndexEd = 4
          } else {
              console.log("FOR UNCLASSIFIEDS")
              console.log(widthEd);
              console.log("averageEd", averageEd);
              console.log("standardDeviationEd", standardDeviationEd);
              color = '#000000'
          }
          ele.style({
              'line-color': ele.data('starred') ? 'yellow' : color,
              'z-index': ele.data('starred') ? 10 : zIndexEd
          })
      })

  },
  'change #sigmaNodesViewParam': function(e, template) {

      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      //var val = $(e.currentTarget).find('value').val();
      var valNod = parseFloat(sigmaViewParam.value);


      console.log("values", valNod);
      var dataSigmaNodes = [];
      console.log("dataSigmaNodes", dataSigmaNodes);

      net.nodes().forEach(function(ele) {
              //FIXME

              ele.data().count = ele.data().width;
              console.log("ele.data().count = ele.data().width", ele.data().count, ele.data().width);
              dataSigmaNodes.push(parseFloat(ele.data().count));
          })
          //console.log("I'm in sigma")
      console.log(dataSigmaNodes);
      var average1 = average(dataSigmaNodes);
      var standardDeviation1 = standardDeviation(dataSigmaNodes);
      //console.log("average1",average1);
      //console.log("standardDeviation1",standardDeviation1);

      //FOR INIT, NOT SURE IT IS NEEDED BUT HEY... IT WORKS
      if (valNod > 6) {
          valNod = 1;
          console.log("sigma value set too high, so taking 1 instead")
      }
      net.edges().forEach(function(ele) {
          //FIXME:
          ele.data().count = ele.data().width
          var width = ele.data().count;
          //TODO: D3 SCALE

          if (width <= (average1 - ((valNod + 4) * standardDeviation1)) || width >= (average1 + ((valNod + 4) * standardDeviation1))) {
              color = '#FF1010'
              zIndex = 10
          } else if (width <= (average1 - ((valNod + 3) * standardDeviation1)) || width >= (average1 + ((valNod + 3) * standardDeviation1))) {
              color = '#EC5350'
              zIndex = 9
          } else if (width <= (average1 - ((valNod + 2) * standardDeviation1)) || width >= (average1 + (valNod + 2) * standardDeviation1)) {
              color = '#42A5F5'
              zIndex = 8
          } else if (width <= (average1 - ((valNod + 1) * standardDeviation1)) || width >= (average1 + (valNod + 1) * standardDeviation1)) {
              color = '#2BBBAD'
              zIndex = 7
          } else if (width <= (average1 - ((valNod) * standardDeviation1)) || width >= (average1 + (valNod) * standardDeviation1)) {
              color = '#20B0A0'
              zIndex = 5
          } else if (width <= (average1 + (valNod * standardDeviation1)) && width >= (average1 - (valNod * standardDeviation1))) {
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
      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      var dataSigmaNodesDegree = []
      console.log("dataSigmaNodesDegree", dataSigmaNodesDegree);

      net.nodes().forEach(function(ele) {
          //FIXME
          //ele.data().count = ele.data().width
          dataSigmaNodesDegree.push(parseFloat(ele.degree()));
          console.log("ele.degree()", ele.degree());
      })

      console.log("I'm in sigma Degree Nodes");
      console.log("dataSigmaNodesDegree", dataSigmaNodesDegree);
      var average2 = average(dataSigmaNodesDegree);
      var standardDeviation2 = standardDeviation(dataSigmaNodesDegree);
      console.log("average2", average2);
      console.log("standardDeviation2", standardDeviation2);
      var valNodDeg = parseInt(sigmaNodeDegreeViewParam.value);
      // TOBEFIXED:need another use of ranges
      if (valNodDeg > 6) {
          valNodDeg = 1;
          console.log("sigma value set to fix, so taking 1 instead, need rewrite")
      }
      console.log("val", valNodDeg);
      net.nodes().forEach(function(ele) {

          //ele.data().count = ele.data().width
          var width = ele.degree();
          //TODO: D3 SCALE

          if (width <= (average2 - ((valNodDeg + 4) * standardDeviation2)) || width >= (average2 + ((valNodDeg + 4) * standardDeviation2))) {
              color = '#FF1010'
              zIndex = 10
          } else if (width <= (average2 - ((valNodDeg + 3) * standardDeviation2)) || width >= (average2 + ((valNodDeg + 3) * standardDeviation2))) {
              color = '#EC5350'
              zIndex = 9
          } else if (width <= (average2 - ((valNodDeg + 2) * standardDeviation2)) || width >= (average2 + (valNodDeg + 2) * standardDeviation2)) {
              color = '#42A5F5'
              zIndex = 8
          } else if (width <= (average2 - ((valNodDeg + 1) * standardDeviation2)) || width >= (average2 + (valNodDeg + 1) * standardDeviation2)) {
              color = '#2BBBAD'
              zIndex = 7
          } else if (width <= (average2 - ((valNodDeg) * standardDeviation2)) || width >= (average2 + (valNodDeg) * standardDeviation2)) {
              color = '#20B0A0'
              zIndex = 5
          } else if (width <= (average2 + (valNodDeg * standardDeviation2)) && width >= (average2 - (valNodDeg * standardDeviation2))) {
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
  


//THEY ARE HERE BECAUSE THEY ARE ACCESSED FROM OUTSIDE: D3 PARAMETERS
colorsNode = d3.scale.category20c();
colorsEdge = d3.scale.category20c();
//we NEED scales
function createLinearScale(domain, range) {

    //parse type  TODO if we want otherscaletypes
    //parse domain TODO ex: [100, 500]
    //parse range TODO ex: [10, 50]

    for (var i = 0; i < scaleForParams.length; i++) {
        if (!scaleForParams[i]) {
            scaleForParams[i] = d3.scaleForParams.linear()
                .domain(domain)
                .range(range);
            console.log("i", i);
            return i
        }
    };
}


// var scale = d3.scale.linear()
//                     .domain([100, 500])
//                     .range([10, 350]);

//color mean 
function colorMean(color1, color2) {
    console.log(color1, color2);
    rgb = hexToRgb(color1)
    shc = hexToRgb(color2)
        console.log("rgb", rgb)
        console.log("shc", shc)
    var r = rgb[Object.keys(rgb)[0]];
    var g = rgb[Object.keys(rgb)[1]];
    var b = rgb[Object.keys(rgb)[2]];
    var s = shc[Object.keys(shc)[0]];
    var h = shc[Object.keys(shc)[1]];
    var c = shc[Object.keys(shc)[2]];

    t = Math.round((r + s) / 2)
    i = Math.round((g + h) / 2)
    d = Math.round((b + c) / 2)
        console.log("t", t, "i", i, "d", d)
        console.log("rgbToHex(t, i, d)", rgbToHex(t, i, d))
    return rgbToHex(t, i, d)
}


//PLAY WITH COLOR
//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    console.log("hex", hex)
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}



//find whats relevant

//STAT FUNCTIONS



function standardDeviation(values) {
    var avg = average(values);

    var squareDiffs = values.map(function(value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data) {
    var sum = data.reduce(function(sum, value) {
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}