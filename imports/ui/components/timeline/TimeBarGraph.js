import d3 from 'd3'

export const TimeBarGraph = {
    init : function (_settings) {

        this.settings = {
            div:  '#bargraph-timeline' || _settings.div,
            margin : _settings.margin || {top: 20, right: 20, bottom: 80, left: 40},
            width : _settings.width || 900,
            height : _settings.height || 250,
            gap : _settings.gap || 0,
            ease : _settings.ease || 'cubic-in-out',
            duration : _settings.duration || 500
        }

        this.start = Date.now()
        this.end = Date.now()

        this.initSVG()
        return this
    },
    initSVG : function() {
        var w = this.settings.width - this.settings.margin.left - this.settings.margin.right,
            h = this.settings.height - this.settings.margin.top - this.settings.margin.bottom

        // Construct our SVG object.
        this.svg = d3.select(this.settings.div)
            .append("svg")
            .style("background","#fff")
            .attr("width", w + this.settings.margin.left + this.settings.margin.right)
            .attr("height", h + this.settings.margin.top + this.settings.margin.bottom)
                .append("g")
            .attr("transform", "translate(" + this.settings.margin.left + "," + this.settings.margin.top + ")")

        // tooltip
        this.tooltip = d3.select(this.settings.div)
            .append("g")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .text("a simple tooltip")
            .style("font-size",9)
            .style("color", "#404040")
    },
    draw : function( _data, timescale) {

        d3.selectAll(".axis").remove()
        d3.selectAll(".timebar").remove()

        this.bars

        var svg = this.svg,
            tooltip = this.tooltip

        var w = this.settings.width - this.settings.margin.left - this.settings.margin.right,
            h = this.settings.height - this.settings.margin.top - this.settings.margin.bottom

        // date formatting
        var datePattern = "%Y"  // default
        switch(timescale) {
            case "year" : datePattern = "%Y"
              break
            case "month" : datePattern = "%b %Y"
              break
            case "week" : datePattern = "%b %Y"
              break
        }
        var formatDate = d3.time.format(datePattern)

        // Scales
        var x = d3.time.scale().range([w/_data.length/2, w-w/_data.length/2])
        var y = d3.scale.linear().range([h, 0])

        this.start = d3.min( _data.map(function(d){return d.time}) )
        this.end = d3.max( _data.map(function(d){return d.time}) )

        // Axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(formatDate)

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickFormat(d3.round)

        // Set scale domains.
        x.domain(d3.extent(_data, function(d) { return d.time  }))
        y.domain([0, d3.max(_data, function(d) { return d.count  })])

        // transition
        svg.transition().duration(this.settings.duration).attr({width: w, height: h})

        // Call x-axis.
        d3.select(".x.axis")
            .transition()
            .duration(this.settings.duration)
            .ease(this.settings.ease)
            .call(xAxis)

        // Draw bars.
        this.bars = svg.append("g")
            .attr("class","timebar")
            .selectAll(".timebar")
            .data( _data, function(d) { return d.time  })

        d3.select(".timebar")
            .append("g")
            .attr("transform","translate(50,10)")
            .append("text")
            .style("font-size",9)
            .style("color", "#404040")
            .text("Volume of messages")

        this.bars.transition()
            .duration(this.settings.duration)
            .ease(this.settings.ease)
            .attr("x", function(d) { return x(d.time) - w/_data.length/2  })
            .attr("width", w / _data.length)
            .attr("y", function(d) { return y(d.count)  })
            .attr("height", function(d) { return h - y(d.count) })


        this.bars_enter =  this.bars.enter().append("rect")
            .attr("class", "count")
            .attr("width", w / _data.length)
            .attr("x", function(d) { return x(d.time) - (w/_data.length)/2  })
            .attr("y", h)
            .attr("height", 0)

        this.bars_enter.transition().duration(1000)
            .attr("y", function(d) { return y(d.count)  })
            .attr("height", function(d) { return h - y(d.count) })
            .style("fill", function(){ return "steelblue" })
            // .style("fill", function(d){ return (d.selected) ? "black" : "#CCC"})

        var graphClicked = false

        this.bars_enter
            .on("mouseover",function(d){
                d3.select(this).style("fill", "red")
                // console.log(formatDate)
                tooltip.text(d.count  + " on " +   formatDate( new Date(d.time) ) )
                tooltip.style("visibility", "visible")
            })
            .on("mousemove", function(){
                return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")
            })
            .on("mouseout",function(){
                if (!graphClicked) {
                    d3.select(this).style("fill", "steelblue")
                    return tooltip.style("visibility", "hidden")
                }
            })
            .on("click",function(){
                graphClicked = (graphClicked) ? false : true
                console.log(graphClicked)
            })

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)
            .selectAll("text")
                .attr("font-family", "sans-serif")
                .attr("fill", "#4B4B4B")
                .attr("font-size", 10)
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function() {
                    return "rotate(-65)"
                    })
                // .attr("transform", "rotate(-90)" )

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis)
            .selectAll("text")
                .attr("font-family", "sans-serif")
                .attr("fill", "#4B4B4B")
                .attr("font-size", 10)

        svg.select(".y")
            .append("text") // caption
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("fill", "#4B4B4B")
                // .style("text-decoration", "bold")
                .attr("font-size", 10)
                .text("Qty per day (tweets)")

        svg.selectAll(".domain")
            .attr("fill", "none")
            .attr("stroke", "#000")

        this.bars.exit().transition().style({opacity: 0}).remove()

        // var duration = 500
    },

    setStart: function (start) {
        this.start = start
        this.select()
    },
    setEnd: function (end) {
        this.end = end
        this.select()
    },
    select : function () {
        var self = this
        this.bars_enter
            .style("fill", function(d){
                // console.log(d.time, self.start, self.end)
                return (d.time >= self.start && d.time <= self.end) ? "steelblue" : "#CCC"
            })
        }
}
