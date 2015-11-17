Template.networkTools.onCreated(function() {
    this.changeLayout = new ReactiveVar();


    // inherit change layout function from parent topogram view
    this.changeLayout.set(this.view.parentView._templateInstance.changeLayout.get())
});

Template.networkTools.rendered = function() {

    //for searching easily
    var nodes = Nodes.find().fetch(),
        edges = Edges.find().fetch();
    var self = this;
}

Template.networkTools.helpers({

    layouts: function() {
        return [
            'springy', 'random', 'grid', 'circle', 'breadthfirst', 'concentric'
        ].map(function(d) {
            return {
                'slug': d,
                'name': d.charAt(0).toUpperCase() + d.slice(1)
            };
        });
    },

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
    nodeColorMethod: function() {
        return nodeColorMethod = ["fix", "file", "group", "alphabet", "count"]
    },
    edgeColorMethod: function() {
        return edgeColorMethod = ["fix", "file", "nodesMean", "nodesDash", "group", "count"]
    },
    edgeWidthMethod: function() {
        return edgeWidthMethod = ["simple", "width"]
    },
    // nodeTextMethod: function() {
    //     return edgeWidthMethod = ["true", "false"]
    // },
    // edgeTextMethod: function() {
    //     return edgeWidthMethod = ["true", "false"]
    // },
    nodeWidthMethod: function() {
        return edgeWidthMethod = ["simple", "width", "edge"]
    },
    textLocationMethod: function() {
        return textLocationMethod = ["above", "below", "alternate"]
    },
    edgeEndMethod: function() {
        return edgeEndMethod = ["simple", "arrow", "arrows"]
    },
   // textSizeParam : function() { return Session.get('textSizeParam'); },
});

Template.networkTools.events = {
    


    'change #textSizeParam': function(e,template){

        var net = template.view.parentView._templateInstance.network.get().net;
        //var val = $(e.currentTarget).find('value').val();
        var val = textSizeParam.value;
        console.log("val",val);

        net.nodes().css({ 'font-size': val })
        console.log(net.nodes().style("font-size"));

        // net.nodes().forEach(function(ele) {
        //     ele.css({ 'font-size': val })
        // }) 

    },
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

    // apply layout
    'click .layout': function(e, template) {
        template.view.parentView._templateInstance.changeLayout.get()($(e.target).data().layoutName);
    },

    // color
    //     'change #nodeCatColor': function( e, template ) {
    //         var val = $( e.currentTarget ).find( 'option:selected' ).val();
    //         var net = template.view.parentView._templateInstance.network.get().net;

    //         console.log( val );

    //         var colors = d3.scale.category20b();
    //         net.nodes().forEach( function( ele ) {
    //             // console.log(val);
    //             ele.style( {
    // //                'background-color': ele.data( 'starred' ) ? 'yellow' : colors( ele.data().data[ val ] )
    //                 'background-color': ele.data( 'starred' ) ? 'yellow' : colors( ele.data().data.color )
    //             } ); 
    //         } );
    //     },

    // filter
    'change #nodeFilterType': function(e, template) {
        var val = $(e.currentTarget).find('option:selected').val();
        var net = template.view.parentView._templateInstance.network.get().net;

        if (val == '' || !val) {
            net.nodes().style({
                'visibility': 'visible'
            })
        } else {
            var visible = net.nodes().forEach(function(ele) {
                if (ele.data().data.type == val) ele.style({
                    'visibility': 'visible'
                })
                else ele.style({
                    'visibility': 'hidden'
                })
            })
        }
    },

    'click .toggle-node-labels': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;

        if (net.nodes()[0].css('content') == '') {
            net.nodes().css({
                'content': function(e) {
                    // console.log(e.data().data.name);
                    return e.data().data.name;
                }
            });
        } else {
            net.nodes().css({
                'content': ''
            });
        }
    },

    'click .toggle-edge-labels': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;

        if (net.edges()[0].css('content') == '') {
            net.edges().css({
                'content': function(e) {
                    if (e.data().data) return e.data().data.name;
                    else return '';
                }
            });
        } else {
            net.edges().css({
                'content': ''
            });
        }
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
        // var topogram = Template.instance().network.get().net;
        var isolated = topogram.elements('node[[degree = 0]]');
        topogram.remove(isolated);
    },
    'change #nodeColorMethod': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;
        var val = $(e.currentTarget).find('option:selected').val();
        var nodes = Nodes.find().fetch(),
            edges = Edges.find().fetch();
        var self = this;

        if (val == 'file') {
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
                    FlashMessages.sendError("no color available, creating");
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
        }
    },
    'change #nodeWidthMethod': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;
        var val = $(e.currentTarget).find('option:selected').val();
        var nodes = Nodes.find().fetch(),
            edges = Edges.find().fetch();
        var self = this;

        if (val == 'edge') {
            net.nodes().forEach(function(ele) {
                ele.style({
                    'width': ele.degree(),
                    'height': ele.degree()
                })
            })
        } else if (val == 'witdth') {
            net.nodes().forEach(function(ele) {
                ele.style({
                    'width': ele.data().count,
                    'height': ele.data().count
                })
            })
        } else if (val == 'simple') {
            net.nodes().forEach(function(ele) {
                ele.style({
                    'width': 5,
                    'height': 5
                })
            })
        }
    },
    'change #edgeWidthMethod': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;
        var val = $(e.currentTarget).find('option:selected').val();
        var nodes = Nodes.find().fetch(),
            edges = Edges.find().fetch();
        var self = this;

        if (val == 'simple') {
            net.edges().forEach(function(ele) {
                ele.style({
                    'width': 5
                })
            })
        } else if (val == 'width') {
            net.edges().forEach(function(ele) {
                ele.style({
                    'width': ele.data().width
                })
            })
        }
    },
    'change #edgeEndMethod': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;
        var val = $(e.currentTarget).find('option:selected').val();
        var nodes = Nodes.find().fetch(),
            edges = Edges.find().fetch();
        var self = this;

        if (val == 'simple') {
            net.edges().forEach(function(ele) {
                ele.style({
                    'target-arrow-shape': 'none',
                    'source-arrow-shape': 'none'
                })
            })
        } else if (val == 'arrow') {
            net.edges().forEach(function(ele) {
                ele.style({
                    'target-arrow-shape': 'triangle',
                    'source-arrow-shape': 'none'
                })
            })
        } else if (val == 'arrows') {
            net.edges().forEach(function(ele) {
                ele.style({
                    'target-arrow-shape': 'triangle',
                    'source-arrow-shape': 'triangle'
                })
            })
        }
    },
    'change #textLocationMethod': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;
        var val = $(e.currentTarget).find('option:selected').val();
        var nodes = Nodes.find().fetch(),
            edges = Edges.find().fetch();
        var self = this;

        if (val == 'above') {
            net.nodes().forEach(function(ele) {
                ele.style({
                    'text-valign': 'top'

                })
            })
        } else if (val == 'below') {
            net.nodes().forEach(function(ele) {
                ele.style({
                    'text-valign': 'bottom'

                })
            })
        } else if (val == 'alternate') {
            var alternate = 1;
            net.nodes().forEach(function(ele) {
                erro = alternate % 2
                    // console.log("alternate % 2", erro)
                if ((alternate % 2) == 0) {
                    // console.log("here")
                    ele.style({
                        'text-valign': 'top'

                    })
                } else {
                    // console.log("there");
                    ele.style({
                        'text-valign': 'bottom'

                    })
                }
                alternate = alternate + 1;
                // console.log("alternate", alternate);
            })
        }
    },
    'change #edgeColorMethod': function(e, template) {
        var net = template.view.parentView._templateInstance.network.get().net;
        var val = $(e.currentTarget).find('option:selected').val();
        var nodes = Nodes.find().fetch(),
            edges = Edges.find().fetch();
        var self = this;
        if (val == 'file') {
            // console.log("I'm in edgefile")
            net.edges().forEach(function(ele) {
                if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) == '#') {
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : ele.data().color
                    })
                } else if (ele.data().color.length > 2 && ele.data().color.slice(0, 1) != '#') {
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : "#" + ele.data().color
                    })
                }
            })
        } else if (val == 'alphabet') {
            // console.log("I'm in edge alphabet")
            net.edges().forEach(function(ele) {
                ele.style({

                    'line-color': ele.data('starred') ? 'yellow' : colorsNode(ele.data().name.slice(0, 1))
                })
            })
        } else if (val == 'group') {
            // console.log("I'm in!3")
            net.edges().forEach(function(ele) {
                if (ele.data().group == 0) {
                    FlashMessages.sendError("no data available, creating");
                    //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                    ele.data("group", colorsEdge(ele.data().id))
                }

                if (ele.data().color == 0) {
                    FlashMessages.sendError("no color available, creating");
                    //WE SET THIS BECAUSE WE WANT TO BE ABLE TO DISTINGUISH BETWEEN SELF AND ADDED COLORS, SO WE DON4T RETUR ele.data.color
                    ele.data("color", colorsEdge(ele.data().group))
                }
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : colorsEdge(ele.data().group)
                })
            })
        } else if (val == 'nodesMean') {
            net.edges().forEach(function(ele) {
                var sourceNode = "";
                var targetNode = "";
                srcFound = false;
                tarFound = false;
                for (var i = 0, l = nodes.length; i < l; i++) {
                    if (!srcFound && nodes[i].data.id == ele.data().source) {
                        sourceNode = nodes[i];
                        srcFound = true;
                    } else if (!tarFound && nodes[i].data.id == ele.data().target) {
                        targetNode = nodes[i];
                        tarFound = true;
                    } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
                }
                // console.log("sourceNode", sourceNode.data.id);
                // console.log("targetNode", targetNode.data.id);
                // console.log("sourceNode color", sourceNode.data.color);
                // console.log("targetNode color", targetNode.data.color);
                var color = colorMean(colorsNode(sourceNode.data.group), colorsNode(targetNode.data.group));
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : color,
                    'line-style': "solid"
                })
            })
        } else if (val == 'nodesDash') {
            net.edges().forEach(function(ele) {
                var sourceNode, targetNode,
                    srcFound = false,
                    tarFound = false;
                for (var i = 0, l = nodes.length; i < l; i++) {
                    if (!srcFound && nodes[i].data.id == ele.data().source) {
                        sourceNode = nodes[i];
                        srcFound = true;
                    } else if (!tarFound && nodes[i].data.id == ele.data().target) {
                        targetNode = nodes[i];
                        tarFound = true;
                    } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
                }
                // console.log("sourceNode", sourceNode);
                // console.log("targetNode", targetNode);
                // console.log("sourceNode color", sourceNode.data.color);
                // console.log("targetNode color", targetNode.data.color);

                if (sourceNode.data.group != targetNode.data.group) {
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : '#ff0000',
                        'line-style': "dashed"
                    })
                } else {
                    ele.style({
                        'line-color': ele.data('starred') ? 'yellow' : colorsNode(sourceNode.data.group),
                        'line-style': "solid"
                    })
                }
                //MESSAGE///TAUX ETC
            })
        } else if (val == 'fix') {
            net.edges().forEach(function(ele) {
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : '#000000'
                })
            })
        } else if (val == 'count') {
            net.edges().forEach(function(ele) {
                //FIXME:
                ele.data().count = ele.data().width
                var width = ele.data().count;
                //TODO: D3 SCALE
                // console.log("widthedge", width)
                if (width <= 3) {
                    color = '#ECECEC'
                } else if (width > 3 && width <= 6) {
                    color = '#2BBBAD'
                } else if (width > 6 && width <= 9) {
                    color = '#42A5F5'
                } else if (width >= 10) {
                    color = '#EF5350'
                } else {
                    color = '#000000'
                }
                ele.style({
                    'line-color': ele.data('starred') ? 'yellow' : color
                })
            })
        }
    }

}

//color mean
function colorMean(color1, color2) {
    // console.log(color1, color2);
    rgb = hexToRgb(color1)
    shc = hexToRgb(color2)
        // console.log("rgb", rgb)
        // console.log("shc", shc)
    var r = rgb[Object.keys(rgb)[0]];
    var g = rgb[Object.keys(rgb)[1]];
    var b = rgb[Object.keys(rgb)[2]];
    var s = shc[Object.keys(shc)[0]];
    var h = shc[Object.keys(shc)[1]];
    var c = shc[Object.keys(shc)[2]];

    t = Math.round((r + s) / 2)
    i = Math.round((g + h) / 2)
    d = Math.round((b + c) / 2)
        // console.log("t", t, "i", i, "d", d)
        // console.log("rgbToHex(t, i, d)", rgbToHex(t, i, d))
    return rgbToHex(t, i, d)
}


//Play with color
//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    // console.log("hex", hex)
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
//THEY ARE HERE BECAUSE THEY ARE ACCESSED FROM OUTSIDE
colorsNode = d3.scale.category20c();
colorsEdge = d3.scale.category20c();

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
