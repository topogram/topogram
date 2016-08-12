import './pieChart.html'
import { Template } from 'meteor/templating'

import { colors } from '../../../../helpers/colors.js'
import d3 from 'd3'

Template.pieChart.rendered = function() {

  var width = 250,
  height = 250

  var svg = d3.select("svg.pie-chart")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + 150 + ")")

  svg.append("g")
  .attr("class", "slices")

  svg.append("g")
  .attr("class", "labels")

  // console.log(this)
  // console.log(this.dataCount)

  var radius = 100

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count  })

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)

  var total = d3.sum(this.data.dataCount, function(d) { return d.count });

  /* ------- PIE SLICES -------*/
  var slice = svg.select(".slices")
    .selectAll("path.slice")
    .data(pie(this.data.dataCount))

  slice.enter()
    .append("path")
    .attr("class", "slice")
    .attr("d", arc)
    .style("fill", function(d) {
      return colors(d.data.group)
    })
    .on("mouseover", function(d){
      d3.select("#pie-tooltip")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px")
      .style("opacity", 1)
      .classed("hidden",false)

      d3.select("#pie-tooltip")
      .select("strong")
      .text(d.data.group)

      d3.select("#pie-tooltip")
      .select("#value")
      .text(Math.floor((d.data.count/total)*100) + '% (' + d.data.count + ')') // in percent and units

    })
  .on("mouseout", function() {
    // Hide the tooltip
    d3.select("#pie-tooltip")
      .classed("hidden", true)
  })

  slice.exit()
    .remove()


  /* CAPTION */

  var caption = d3.select("#caption")
    .selectAll("p")
    .data(this.data.dataCount)
    .enter()

  var captionG = caption
    .append('p')
    // .attr("transform", function(d,i){ return "translate(-"+ radius +"," + (radius + i*20) + ")" });

  captionG
  .append('svg')
    .attr("width", 10)
    .attr("height", 10)
    .style('padding', '0 10px')
  .append('circle')
    .attr('r', 5)
    .attr('cy', 5)
    .attr("transform", "translate(5,0)")
    .attr('fill', function(d) { return colors(d.group) })

  captionG
    .append('span')
    .style('padding', '0 10px')
    .text(function(d){ console.log(d); return d.group })
  //.append("text")
  // .attr('x', 15)







}
