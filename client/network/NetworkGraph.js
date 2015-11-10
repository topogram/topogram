var NodeColorMethod = 'file'; //file ou fix ou group ou alphabet
var EdgeColorMethod = 'fromNodes'; //file ou fix ou fromNodes ou group
var color = '#bb11ff';
var repMethodEdge = 'line'; // line ou (arrow ou arrows)TODO
var repMethodWidthEdge = 'simple'; // width ou (countsrc ou counttgt ou both)TODO ou simple
var repMethodWidthNode = 'simple'; // width ou (edge ou edgeWeighed ou both)TODO ou simple
var textNode = true;
var textEdge = false;
var mergerNodes = false;
var fontSize = 3;
var fixedWidth = 1;

NetworkGraph = {
        initTopogram: function(containerId, topogramId) {
            // console.log( 'initTopogram' );
            this.containerId = containerId;
            this.topogramId = topogramId;
            this.colors = d3.scale.category20c();
            //for searching easily
            var nodes = Nodes.find().fetch(),
                edges = Edges.find().fetch();
            var self = this;

            this.net = cytoscape({
                container: document.getElementById(containerId),
                hideLabelsOnViewport: true,
                ready: function() {

                    // console.log('topogram ready');

                    // add everything
                    // self.addQTip();
                    self.addCxtMenu();
                    self.addMouseBehaviours();
                    self.addEdgehandles();
                    console.log("repMethodEdge", repMethodWidthEdge);
                    console.log("repMethodEdge", repMethodEdge);
                },
                // load existing positions
                layout: {
                    name: 'preset'
                },
                // style
                style: cytoscape.stylesheet()
                    .selector('node')
                    .style({
                        'content': function(e) {
                            if (textNode == true) {
                                var content = e.data().name;
                                return content;
                            } else {
                                return ""
                            }
                        },
                        'background-color': function(e) {
                            if (NodeColorMethod == 'file' && e.data().color.slice(0,1) == '#') {
                                return e.data('starred') ? 'yellow' : e.data().color;
                            }else  if (NodeColorMethod == 'file' && e.data().color.slice(0,1) != '#') {
                                return e.data('starred') ? 'yellow' : "#" + e.data().color;
                            } else if (NodeColorMethod == 'alphabet') {
                                return e.data('starred') ? 'yellow' : self.colors(e.data().name)
                            } else if (NodeColorMethod == 'group') {
                                return e.data('starred') ? 'yellow' : self.colors(e.data().group)
                            }
                        },
                        'font-size': fontSize,
                        'text-valign': 'center',
                        'color': 'black',
                        'text-outline-width': 2,
                        'text-outline-color': function(e) {
                            return e.locked() ? 'red' : '#888';
                        },
                        'min-zoomed-font-size': 8,
                        'width': function(e) {
                            if (repMethodWidthNode == 'edge') {
                                var count = e.data().data.count || e.degree();
                                // console.log("count", count);
                                // console.log("e.data()", e.data());
                                return count * 10; //'mapData('+ count +',0, 1, 20, 50)'};
                            } else if (repMethodWidthNode == 'width') {
                                var count = e.data().data.count || e.degree();
                                // console.log("count", count);
                                // console.log("e.data()", e.data());
                                return count * 10; //'mapData('+ count +',0, 1, 20, 50)'};
                            } else if (repMethodWidthNode == 'simple') {
                                var count = fixedWidth;
                                // console.log("count", count);
                                // console.log("e.data()", e.data());
                                return count * 10; //'mapData('+ count +',0, 1, 20, 50)'};
                            }


                        },
                        'height': function(e) {
                            if (repMethodWidthNode == 'edge') {
                                var count = e.data().data.count || e.degree();
                                // console.log("count", count);
                                // console.log("e.data()", e.data());
                                return count * 10; //'mapData('+ count +',0, 1, 20, 50)'};
                            } else if (repMethodWidthNode == 'width') {
                                var count = e.data().data.count || e.degree();
                                // console.log("count", count);
                                // console.log("e.data()", e.data());
                                return count * 10; //'mapData('+ count +',0, 1, 20, 50)'};
                            } else if (repMethodWidthNode == 'simple') {
                                var count = fixedWidth;
                                // console.log("count", count);
                                // console.log("e.data()", e.data());
                                return count * 10; //'mapData('+ count +',0, 1, 20, 50)'};
                            }


                        }
                    })
                    .selector('node[[degree = 0]]')
                    .style({
                        'background-color': '#555'
                    })
                    .selector('edge')
                    .style({
                        // 'content': function( e ){ return e.data('name')? e.data('name') : '';},
                        'target-arrow-shape': function(e) {
                            if (repMethodEdge == 'line') {
                                return 'none';
                            } else if (repMethodEdge = 'arrow') {
                                return 'triangle';
                            }
                        },

                        //HERE WE ADD THE EDGE COLOR PICKER
                        'line-color': function(e) {
                            if (EdgeColorMethod == 'fromNodes') {
                                var sourceNode, targetNode,
                                    srcFound = false,
                                    tarFound = false;
                                for (var i = 0, l = nodes.length; i < l; i++) {
                                    if (!srcFound && nodes[i].data.id == e.data().source) {
                                        sourceNode = nodes[i];
                                        srcFound = true;
                                    } else if (!tarFound && nodes[i].data.id == e.data().target) {
                                        targetNode = nodes[i];
                                        tarFound = true;
                                    } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
                                }
                                // console.log("sourceNode", sourceNode.data.id);
                                // console.log("targetNode", targetNode.data.id);
                                // console.log("sourceNode color", sourceNode.data.color);
                                // console.log("targetNode color", targetNode.data.color);                            
                                var color = colorMean(sourceNode.data.color, targetNode.data.color);
                                return color;
                            } else if (EdgeColorMethod == 'group') {
                                return self.colors(e.data().group);
                            }
                        },
                        //CHOOSE EDGE WIDTH METHOD
                        'width': function(e) {
                            if (repMethodWidthEdge == 'width') {
                                var width = e.data().width;
                                return width;
                            } else if (repMethodWidthEdge == 'simple') {
                                var width = 1;
                                return width;
                            }
                        }
                    })
                    .selector('.edgehandles-hover')
                    .style({
                        'background-color': 'red'
                    })
                    .selector('.edgehandles-source')
                    .selector('.edgehandles-target')
                    .selector('.edgehandles-preview, .edgehandles-ghost-edge')
                    .style({
                        'line-color': 'red',
                        'target-arrow-color': 'red',
                        'source-arrow-color': 'red'
                    })
            });

            return this;
        },

        addNode: function(node) {
            this.net.add(node);
        },
        updateNode: function(_id, changes) {
            console.log(node);
        },
        addEdge: function(edge) {
            this.net.add(edge);
        },
        updateEdge: function(edge) {
            console.log(edge);
        },
        initData: function(nodes, edges) {
            // console.log('updateTopogramData');

            this.net.elements().remove(); // make sure evything is clean

            // prevent edges to be added before nodes
            this.net.add(nodes);
            this.net.add(edges);

            this.net.reset(); // render layout
        },

        addQTip: function() {
            // qtip
            this.net.elements('node:selectable').qtip({
                content: function() {
                    return this.data().data.type + ' - ' + this.data().data.name;
                },
                show: {
                    event: 'mouseover'
                },
                hide: {
                    event: 'mouseout'
                }
            });

            this.net.elements('edge:selectable').qtip({
                content: function() {
                    return this.data().data.type;
                },
                show: {
                    event: 'mouseover'
                },
                hide: {
                    event: 'mouseout'
                }
            });
        },

        // contextual menu
        addCxtMenu: function() {
            this.net.cxtmenu({
                selector: 'node',
                commands: [{
                    content: '<span class="medium material - icons">delete</span>',
                    select: function() {

                        // remove the node plus all connected edges
                        Meteor.call('deleteNodeAndConnectedEdges', this.id(), this.neighborhood('edge').map(function(d) {
                            return d.id()
                        }));

                        // remove from graph
                        net.remove(this.neighborhood('edge'));
                        net.remove(this);
                    }
                }, {
                    content: '<span class="medium material - icons">star_rate</span>',
                    select: function() {
                        Meteor.call('starNode', this.id());
                        this.style({
                            'background-color': 'yellow'
                        });
                    }
                }, {
                    content: '<span class="medium material - icons">lock</span>',
                    select: function() {
                        // console.log( this.position() );
                        Meteor.call('lockNode', this.id(), this.position());
                    },
                }, {
                    content: '<span class="medium material - icons">comment</span>',
                    select: function() {
                        Meteor.call('addComment', this.id());
                    },

                }]
            });
        },

        // edgehandles
        addEdgehandles: function() {
            var self = this;

            var onComplete = function(source, target, addedEntities) {
                Meteor.call('addEdgeFromIds', self.topogramId, source.data('id'), target.data('id'));
            };

            this.net.edgehandles({
                complete: onComplete
            });
        },

        // drag behaviour
        addMouseBehaviours: function() {
                var self = this;

                this.net.on('select', 'node', /*_.debounce(*/ function(e) {

                    var node = e.cyTarget;
                    Session.set('currentType', 'node');
                    Session.set('currentId', node.id());

                    // color focus
                    self.net.nodes().style({
                        'opacity': '.1'
                    });
                    self.net.edges().style({
                        'opacity': '.1'
                    });
                    node.style({
                        'opacity': '1'
                    });
                    node.neighborhood().style({
                        'opacity': '1'
                    });

                    // make only the focus selectable 
                    self.net.nodes().unselectify();
                    self.net.edges().unselectify(false);
                    node.neighborhood().selectify();

                    // add tooltip
                    self.addQTip();

                    $('#infoBox').css('visibility', 'visible');
                });


                this.net.on('select', 'edge', /*_.debounce(*/ function(e) {
                    var edge = e.cyTarget;
                    Session.set('currentType', 'edge');
                    Session.set('currentId', edge.id());
                    $('#infoBox').css('visibility', 'visible');
                });

                this.net.on('free', 'node', /*_.debounce(*/ function(e) {
                             var node = e.cyTarget;

                            // update position
                             Meteor.call('updateNodePosition', node.id(), node.position());

                                        // check for node merger 
                                        var bb = node.boundingbox();

                                        var targets = Nodes.find({
                                            "position.x": {
                                                "$lt": Math.max(bb.x1, bb.x2),
                                                "$gte": Math.min(bb.x1, bb.x2)
                                            },
                                            "position.y": {
                                                "$lt": Math.max(bb.y1, bb.y2),
                                                "$gte": Math.min(bb.y1, bb.y2)
                                            },
                                            "data.id": {
                                                "$not": node.id()
                                            }
                                        }).fetch();

                                        var nodeSource = Nodes.findOne({
                                            "data.id": node.id()
                                        });

                                        if (targets.length) {
                                            Session.set("mergeSource", nodeSource)
                                            Session.set("mergeTargets", targets)
                                            $('#modal-merge').openModal();
                                        }
                                    });

                                    // check for node merger 
                                    this.net.on('cxtdragout', 'node', function(e) {
                                        console.log('test');
                                        console.log(e.boundingBox());
                                     });
                                }


                            };


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


                            //Play with color
                            //http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

                            function hexToRgb(hex) {
                                // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
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
