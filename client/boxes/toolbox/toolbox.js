Template.toolbox.rendered = function() {
    var nodes = Nodes.find().fetch(),
        edges = Edges.find().fetch();
    scaleForParams = [];

    $(".collapsible").collapsible({
      accordion: false
    });
}

Template.toolbox.helpers({
    nodeCategories: function() {
        var node = Nodes.findOne({}, {
            fields: {
                'data.data': 1
            }
        });
        return Object.keys(node.data.data);
    },

    nodeTypes: function() {
        var nodes = Nodes.find({}, {
            fields: {
                'data.data': 1
            }
        }).fetch();

        var types = [''];
        nodes.forEach(function(node) {
            if (types.indexOf(node.data.data.type) < 0) types.push(node.data.data.type);
        });
        return types;
    },

    edgeColorMethod: function() {
        return edgeColorMethod = ["fix", "file", "nodesMeanGroup","nodesMeanColor", "nodesDash", "group", "count", "compNodEdg", "sigma"]
    }
});

Template.toolbox.events = {

        // add/remove nodes
        'click #add-node': function() {
            var nodeId = 'node' + Math.round(Math.random() * 1000000);
            var node = makeNode(nodeId);
            Meteor.call('addNode', node);
        },

        // add random nodes
        'click #init-data': function() {
            Meteor.call('resetTopogramData', this.topogramId);
        },

        // toggle add/remove edges feature
        'click #draw-edgehandles': function() {
            // var edgeHandlesOn = Session.get('edgeHandlesOn') == 'drawoff' ? 'drawon' : 'drawoff';
            // var edgeHandlesOn = Session.get('edgeHandlesOn') == 'disable' ? 'enable' : 'disable';

            var edgeHandlesOn = Session.get('edgeHandlesOn') ? false : true;
            Session.set('edgeHandlesOn', edgeHandlesOn);
            console.log(edgeHandlesOn);
            if (edgeHandlesOn) net.edgehandles.start();
        },

        // degree
        'click #remove-isolated-nodes': function() {
            // var topogram = Template.instance().network.get();
            var isolated = topogram.elements('node[[degree = 0]]');
            topogram.remove(isolated);
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


// // var scale = d3.scale.linear()
// //                     .domain([100, 500])
// //                     .range([10, 350]);

// //color mean
// function colorMean(color1, color2) {
//     console.log(color1, color2);
//     rgb = hexToRgb(color1)
//     shc = hexToRgb(color2)
//         console.log("rgb", rgb)
//         console.log("shc", shc)
//     var r = rgb[Object.keys(rgb)[0]];
//     var g = rgb[Object.keys(rgb)[1]];
//     var b = rgb[Object.keys(rgb)[2]];
//     var s = shc[Object.keys(shc)[0]];
//     var h = shc[Object.keys(shc)[1]];
//     var c = shc[Object.keys(shc)[2]];

//     t = Math.round((r + s) / 2)
//     i = Math.round((g + h) / 2)
//     d = Math.round((b + c) / 2)
//         console.log("t", t, "i", i, "d", d)
//         console.log("rgbToHex(t, i, d)", rgbToHex(t, i, d))
//     return rgbToHex(t, i, d)
// }


// //PLAY WITH COLOR
// //http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

// function hexToRgb(hex) {
//     // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
//     var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//     console.log("hex", hex)
//     hex = hex.replace(shorthandRegex, function(m, r, g, b) {
//         return r + r + g + g + b + b;
//     });

//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null;
// // }


// function componentToHex(c) {
//     var hex = c.toString(16);
//     return hex.length == 1 ? "0" + hex : hex;
// }

// function rgbToHex(r, g, b) {
//     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }



// function wait(ms) {
//     var start = new Date().getTime();
//     var end = start;
//     while (end < start + ms) {
//         end = new Date().getTime();
//     }
// }
// //find whats relevant

// //STAT FUNCTIONS
// function standardDeviation(values) {
//     var avg = average(values);

//     var squareDiffs = values.map(function(value) {
//         var diff = value - avg;
//         var sqrDiff = diff * diff;
//         return sqrDiff;
//     });

//     var avgSquareDiff = average(squareDiffs);

//     var stdDev = Math.sqrt(avgSquareDiff);
//     return stdDev;
// }

// function average(data) {
//     var sum = data.reduce(function(sum, value) {
//         return sum + value;
//     }, 0);

//     var avg = sum / data.length;
//     return avg;
// }
