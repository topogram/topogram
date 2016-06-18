import './pieChart.html'
import { Template } from 'meteor/templating'

import { colors } from '../../../../helpers.js'
// TODO import d3 properly

Template.pieChart.rendered = function() {

  var width = 250,
    height = 250,
    offsetLabel = -50 ;

  var svg = d3.select("svg.pie-chart")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg.append("g")
    .attr("class", "slices");

  svg.append("g")
    .attr("class", "labels");

      console.log(this);
      console.log(this.dataCount);

      var radius = 100;

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { console.log(d);return d.count; });

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var svg = d3.select("svg.pie-chart");
      console.log(svg);

      /* ------- PIE SLICES -------*/
    	var slice = svg.select(".slices")
        .selectAll("path.slice")
    		.data(pie(this.data.dataCount));

    	slice.enter()
    		.append("path")
        .attr("class", "slice")
        .attr("d", arc)
        .style("fill", function(d) {
          console.log(d);
          return colors(d.data.group);
        })
        .on("mouseover", function(d){
          d3.select("#pie-tooltip")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("opacity", 1)
            .classed("hidden",false);

          d3.select("#pie-tooltip")
            .select("strong")
            .text(d.data.group);

          d3.select("#pie-tooltip")
            .select("#value")
            .text(d.data.count);

        })
        .on("mouseout", function() {
          // Hide the tooltip
          d3.select("#pie-tooltip").classed("hidden", true);
        });

    	slice.exit()
    		.remove();

};
