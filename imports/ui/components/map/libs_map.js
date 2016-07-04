// // setup map
// var svg, map 
//
// hasGeo = function() {
//   var node = Nodes.findOne({}, {
//       fields: {
//           'data.data': 1
//       }
//   }) 
//
//   return node.data.data.lat ? true : false 
// }
//
// initMap = function() {
//
//     L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images' 
//     // var url = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png' 
//     var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
//     var attrib = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors" 
//     var layer = new L.TileLayer(url, {
//         minZoom: 0,
//         maxZoom: 160,
//         attribution: attrib
//     }) 
//
//     map = L.map('map').setView([51.505, -0.09], 13) 
//     // .setView([35.0, 50.0], 4) 
//     map.addLayer(layer) 
//
//     console.log(d3.select('#map').style('width'), d3.select('#map').style('height')) 
//
//     svg = d3.select('#map').append('svg')
//         .style('position', 'absolute')
//         .style('top', 0)
//         .style('left', 0)
//         .style('width', $("#map").width())
//         .style('height', $("#map").height()) 
//
//     var transform = d3.geo.transform({
//             point: projectPoint
//         }),
//         path = d3.geo.path().projection(transform) 
//
//     // map.on('resize', resetView) 
//     // map.on('move', updateMap) 
//     // map.on('zoom', updateMap) 
//
//     function resetView() {
//         map.invalidateSize() 
//         svg.style('width', d3.select('#map').style('width'))
//             .style('height', d3.select('#map').style('height')) 
//         update() 
//     }
//
//     function projectPoint(x, y) {
//         var point = map.latLngToLayerPoint(map, new L.LatLng(x, y)) 
//         this.stream.point(point.x, point.y) 
//     }
//
// }
//
// updateMap = function() {
//     var mapBounds = map.getBounds() 
//     var SW = map.latLngToLayerPoint(mapBounds._southWest),
//         NE = map.latLngToLayerPoint(mapBounds._northEast) 
//
//     // console.log(NE, SW) 
//     // console.log(Math.abs(NE.x - SW.x), Math.abs(NE.y - SW.y)) 
//
//     svg.attr('viewBox', SW.x + ' ' + NE.y + ' ' + Math.abs(NE.x - SW.x) + ' ' + Math.abs(NE.y - SW.y)) 
//
//     return applyLatLngToLayer(map, d) 
//
// }
//
// // resizeMap = function(southWest, northEast) {
// //   var bounds = L.latLngBounds(southWest, northEast) 
// //   map.fitBounds([ southWest, northEast ]) 
// // }
//
//
// // Use Leaflet to implement a D3 geometric transformation.
// // convertLatLngToCoords = function(lat,lng) {
// //     return map.latLngToLayerPoint(new L.LatLng(lat, lng))
// // }
// //
// // convertCoordsToLatLng = function(x,y) {
// //     return map.layerPointToLatLng(new L.Point(x, y))
// // }
//
// applyLatLngToLayer = function(map, d) {
//     var y = d.geometry.coordinates[1] 
//     var x = d.geometry.coordinates[0] 
//     return map.latLngToLayerPoint(new L.LatLng(x, y))
// }
//
// applyLatLngToLayerForEdges = function(map, coords) {
//     var x = coords[0] 
//     var y = coords[1] 
//     return map.latLngToLayerPoint(new L.LatLng(x, y)) 
// }
//
// isValidCoordinate = function(lat, lng) {
//     var valLat = parseFloat(lat) 
//     var valLng = parseFloat(lng) 
//     return (!isNaN(valLat) && valLat <= 90 && valLat >= -90 && !isNaN(valLng) && valLng <= 180 && valLng >= -180) ? true : false 
// }
//
//
// getRandomColor = function() {
//     var letters = '0123456789ABCDEF'.split('') 
//     var color = '#' 
//     for (var i = 0  i < 6  i++) {
//         color += letters[Math.floor(Math.random() * 16)] 
//     }
//     return color 
// } 
