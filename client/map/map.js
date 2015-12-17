var map, svg;

// global helper to check if network has geo information
//NEEDS REWRITE
hasGeo = function() {
    var node =[];
    console.log("nodes",nodes);
    if (nodes.length > 0) {
        var node = Nodes.findOne({}, {
            fields: {
                'data.data': 1
            }
        });
    };

    return node.data.lat ? true : false;
}

Template.map.rendered = function() {

    // get network
    var network = this.view.parentView.parentView._templateInstance.network.get();

    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    var url = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
    // var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var attrib = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors";
    var layer = new L.TileLayer(url, {
        minZoom: 1,
        maxZoom: 16,
        attribution: attrib
    });

    map = L.map('map').setView([35.0, 50.0], 4);
    map.addLayer(layer);

    svg = d3.select('#map').append('svg')
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)
        .style('width', $("#map").width())
        .style('height', $("#map").height());

    var transform = d3.geo.transform({
            point: projectPoint
        }),
        path = d3.geo.path().projection(transform);

    var nodes = Nodes.find().fetch();
    // create points
    var points = nodes.map(function(d) {

        return {
            latLng: new L.LatLng(d.data.lat, d.data.lng),
            id: d.data.id
        }
    })
    console.log(points);

    g = svg.append("g");

    var feature = g.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("id", function(d) {
            return d.id
        })
        .style("stroke", "black")
        .style("opacity", .6)
        .style("fill", "red")
        .attr("r", 10);

    map.on("viewreset", update);
    update();

    map.on('move', update);
    map.on('zoom', update);
    // map.on('resize', resetView);

    function update() {
        var mapBounds = map.getBounds();
        var SW = map.latLngToLayerPoint(mapBounds._southWest),
            NE = map.latLngToLayerPoint(mapBounds._northEast);

        svg.attr('viewBox', SW.x + ' ' + NE.y + ' ' + Math.abs(NE.x - SW.x) + ' ' + Math.abs(NE.y - SW.y));
        feature.attr("transform",
            function(d) {
                return "translate(" +
                    map.latLngToLayerPoint(d.latLng).x + "," +
                    map.latLngToLayerPoint(d.latLng).y + ")";
            }
        )
    }

    function resetView() {
        map.invalidateSize();
        svg.style('width', d3.select('#map').style('width'))
            .style('height', d3.select('#map').style('height'));
        update();
    }

    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(map, new L.LatLng(x, y));
        this.stream.point(point.x, point.y);
    }

}

// Use Leaflet to implement a D3 geometric transformation.
convertLatLngToCoords = function(lat, lng) {
    return map.latLngToLayerPoint(new L.LatLng(lat, lng))
}

convertCoordsToLatLng = function(x, y) {
    return map.layerPointToLatLng(new L.Point(x, y))
}

resizeMap = function(southWest, northEast) {
    var bounds = L.latLngBounds(southWest, northEast);
    map.fitBounds([southWest, northEast]);
}

// Template.map.rendered = function() {
//     // session vars
//     Session.set('minParamForDisplay', 0);
//     Session.set("D3mapCoords",{});
//     //In order to select if radius as to vary according to source, to target, or to both
//     Session.set('radiusas', 'both');
//     var self = this;
//     var topogramId = this.data.topogramId;
//     var maxRadius = 30;
//
//     //  retrieve data
//
//     var edges = Edges.find().fetch(),
//         nodes = Nodes.find().fetch();
//
//
//     //Checks that the selected nodes are connected with edges and checks nodes length
//     var selectedNodes = nodes.filter(function(node) {
//         var nodeEdgesSrc = edges.filter(function(edge) {
//             return edge.data.source == node.data.data.id;
//         });
//         var nodeEdgesTar = edges.filter(function(edge) {
//             return edge.data.target == node.data.data.id;
//         });
//         node['nodeEdgesSrc'] = nodeEdgesSrc;
//         node['nodeEdgesTar'] = nodeEdgesTar;
//
//         return nodeEdgesSrc.length > 0 || nodeEdgesTar.length > 0;
//     });
//
//     /*-----GeoJSON features for Nodes-----------*/
//     var features = [];
//
//     Object.keys(selectedNodes).forEach(function(id) {
//         var selectedNode = selectedNodes[id];
//
//         if (!isValidCoordinate(selectedNode.data.data.lat, selectedNode.data.data.long)) {
//             return;
//         } else {
//             // parse GeoJSON  point
//             var p = turf.point(
//                 [selectedNode.data.data.lat, selectedNode.data.data.long], {
//                     'topogramId': selectedNode.topogramId,
//                     '_id': selectedNode._id,
//                     'countSrc': selectedNode.nodeEdgesSrc.length,
//                     'countTar': selectedNode.nodeEdgesTar.length
//
//                 }
//             );
//
//             features.push(p);
//
//             ///add coords for gravitycentercalculation
//
//         }
//     });
//
//     // GeoJSON collection for Nodes
//     var collection = turf.featurecollection(features);
//     var q = [];
//     // console.log( 'collection', collection );
//
//     //var colleccentr = turf.featurecollection( q );
//     // console.log( 'colleccentr', colleccentr );
//
//     /*-----GeoJSON features for Edges-----------*/
//
//     Object.keys(edges).forEach(function(id) {
//         // console.log('edges[ ' + id + ' ]', edges[id]);
//
//         // for-loop is better than selectedNodes.filter( ... ) here since we want only one source and one target, and we can thus break the for-loop once they are found instead of looping through all selectedNodes
//         var sourceNode, targetNode,
//             srcFound = false,
//             tarFound = false;
//         for (var i = 0, l = selectedNodes.length; i < l; i++) {
//             if (!srcFound && selectedNodes[i].data.id == edges[id].data.source) {
//                 sourceNode = selectedNodes[i];
//                 srcFound = true;
//             } else if (!tarFound && selectedNodes[i].data.id == edges[id].data.target) {
//                 targetNode = selectedNodes[i];
//                 tarFound = true;
//             } else if (srcFound && tarFound) break; //stop for-loop since we found our nodes
//         }
//
//
//
//         edges[id].data.sourcelat = sourceNode.data.lat;
//         edges[id].data.sourcelong = sourceNode.data.lng;
//         edges[id].data.targetlat = targetNode.data.lat;
//         edges[id].data.targetlong = targetNode.data.lng;
//
//
//
//         if ((!isValidCoordinate(edges[id].data.sourcelat, edges[id].data.sourcelong)) && (!isValidCoordinate(edges[id].data.targetlat, edges[id].data.targetlong))) {
//             return;
//         } else {
//             // parse GeoJSON  point
//             var p = turf.linestring(
//                 [
//                     [edges[id].data.sourcelat, edges[id].data.sourcelong],
//                     [edges[id].data.targetlat, edges[id].data.targetlong]
//                 ], {
//                     //'topogramId': selectedEdge.topogramId,
//                     //'_id': selectedEdge._id,
//                     //'countSrc': selectedEdge.nodeEdgesSrc.length,
//                     //'countTar': selectedEdge.nodeEdgesTar.length
//
//                     // 'city': selectedNode.city,
//                     // 'country': selectedNode.country
//                 }
//             );
//
//             q.push(p);
//             //console.log("q1",q);
//             ///add coords for gravitycentercalculation
//
//         }
//     });
//
//     // GeoJSON collection for Edges
//     // console.log( "q2", q );
//     var collectionedges = turf.featurecollection(q);
//     // console.log( "collectionedges", collectionedges );
//     // console.log('collection', collection);
//     //var colleccentr = turf.featurecollection( q );
//     // console.log('colleccentr', colleccentr);
//
//     // setup map
//     L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
//     var url = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
//     //var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//     var attrib = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors";
//     var layer = new L.TileLayer(url, {
//         minZoom: 2,
//         maxZoom: 16,
//         attribution: attrib
//     });
//     var map = L.map('map').setView([35.0, 50.0], 4);
//     map.addLayer(layer);
//
//     var svg = d3.select('#map').append('svg')
//         .style('position', 'absolute')
//         .style('top', 0)
//         .style('left', 0)
//         .style('width', d3.select('#map').style('width'))
//         .style('height', d3.select('#map').style('height'));
//
//     var g = svg.append('g').attr('class', 'leaflet-zoom-hide');
//
//     var transform = d3.geo.transform({
//             point: projectPoint
//         }),
//         path = d3.geo.path().projection(transform);
//     // console.log( 'path', path );
//     // console.log( 'transform', transform );
//
//     // radius scale
//     var radius = d3.scale.linear()
//         .domain([
//             Session.get('minParamForDisplay'),
//             d3.max(Object.keys(selectedNodes).map(function(d) {
//                 // console.log('selectedNodes[d].count', selectedNodes[d].nodeEdgesSrc.length + selectedNodes[d].nodeEdgesTar.length);
//
//                 return selectedNodes[d].nodeEdgesSrc.length + selectedNodes[d].nodeEdgesTar.length;
//             }))
//         ])
//         .range([5, maxRadius]);
//
//     ///IMPROVEME: Size need to be set according to the number of edges;
//     var feature = g.selectAll('circle')
//         .data(collection.features).enter()
//         .append('circle')
//         .attr('r', function(d) {
//             //TODO:IMPLEMENT SELECTOR FOR THE RADIUS SIZE
//
//             // console.log('radius(d.properties.countSrc + d.properties.countTar)', radius(d.properties.countSrc + d.properties.countTar));
//             return ~~(radius(d.properties.countSrc + d.properties.countTar));
//         })
//         .style('fill', 'red')
//         .style('stroke', 'none')
//         .style('opacity', .6);
//     // console.log( 'feature', feature );
//
//     // Edge features
//
//     var g2 = svg.append('g').attr('class', 'leaflet-zoom-hide');
//     // console.log( g2 );
//
//     var featureedges = g2.selectAll('line')
//         .data(collectionedges.features).enter()
//         .append('line')
//         .style('stroke', 'yellow')
//         .style('stroke-width', '4')
//         .style('opacity', .8);
//
//     // console.log( "featureedges", featureedges );
//     d3.selectAll('line').on('mouseover', function(d) {
//         var infos = '';
//         // linestring
//         for (var p in d.properties) {
//             infos += p + ': ' + d.properties[p] + '\n';
//         }
//         // console.log( infos );
//     });
//
//     // define projection
//     map.on('resize', resetView);
//     map.on('move', update);
//     map.on('zoom', update);
//
//     d3.select('.tab')
//         .on('click', function() {
//             resetView();
//         });
//
//     function resetView() {
//         map.invalidateSize();
//         svg.style('width', d3.select('#map').style('width'))
//             .style('height', d3.select('#map').style('height'));
//         update();
//     }
//
//     function update() {
//         var mapBounds = map.getBounds();
//         var SW = map.latLngToLayerPoint(mapBounds._southWest),
//             NE = map.latLngToLayerPoint(mapBounds._northEast);
//
//         // console.log(NE, SW);
//         // console.log(Math.abs(NE.x - SW.x), Math.abs(NE.y - SW.y));
//
//         svg.attr('viewBox', SW.x + ' ' + NE.y + ' ' + Math.abs(NE.x - SW.x) + ' ' + Math.abs(NE.y - SW.y));
//
//         // points
//         feature.attr('transform', function(d) {
//             // console.log("d",d)
//             return 'translate(' +
//                 applyLatLngToLayer(map, d).x + ',' +
//                 applyLatLngToLayer(map, d).y + ')';
//
//         });
//
//         featureedges.attr('x1', function(d) {
//
//                 return applyLatLngToLayerForEdges(map, d.geometry.coordinates[0]).x;
//             })
//             .attr('y1', function(d) {
//                 return applyLatLngToLayerForEdges(map, d.geometry.coordinates[0]).y;
//             })
//             .attr('x2', function(d) {
//                 return applyLatLngToLayerForEdges(map, d.geometry.coordinates[1]).x;
//             })
//             .attr('y2', function(d) {
//                 return applyLatLngToLayerForEdges(map, d.geometry.coordinates[1]).y;
//             });
//     }
//     window.setInterval(resetView, 500);
//
//     // Use Leaflet to implement a D3 geometric transformation.
//     function projectPoint(x, y) {
//         var point = map.latLngToLayerPoint(map, new L.LatLng(x, y));
//         this.stream.point(point.x, point.y);
//     }
//
// };


Template.map.events({
    'click #showselectedNodes': function(e) {
        e.preventDefault();
        var topogram = Topograms.findOne();
        // render
    }
});
