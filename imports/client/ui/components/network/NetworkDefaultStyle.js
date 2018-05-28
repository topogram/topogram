import { stylesheet } from 'cytoscape'
import { colors } from '/imports/client/helpers/colors.js'
import  React, { PropTypes } from 'react'

const NetworkDefaultStyle = () =>

  stylesheet()
    .selector('node')
    .style({
      'font-size' : 4  ,
      'text-valign': 'center',
      'text-halign': 'right',
      'color': 'black',
      'text-max-width': 5,
      'text-wrap': 'ellipsis',
      'min-zoomed-font-size': 0.4,
      'border-color': '#D84315',
      'background-color'(e) {
        let color = 'steelblue'  // default
        if (e.data('group')) color = colors(e.data('group'))
        else if (e.data('color')) color = e.data('color')
        return e.data('selected') ? 'yellow' : color
      },
      // 'text-opacity' : 0, // hide label by default
      'label'(e) {
        return e.data('name') ? e.data('name').trunc(20) : ''
      }
    })
    // node with degree zero
    .selector('node[[degree = 0]]')
    .style({
      'background-color': '#111111'
      // 'display' :"none"
    })
    .selector('node[group="ghosts"]')
    .style({
      'background-opacity': .5,
      'border-width': '3',
      'border-color': 'gray',
      'border-opacity': .6
      // 'display' :"none"
    })
    .selector('edge')
    .style({
      'target-arrow-shape': 'diamond', // default is undirected graph
      'line-color'(e) {
        return e.data('selected') ?
          'yellow'
          :
          e.data('color') ? e.data('color') : '#AAAAAA'
      },
      'width'(e) {
        return e.data('weight') ? e.data('weight') : .3
      },
      'opacity'(e) {
        return e.data('selected') ? 1 : .7
      },
      'font-size':2,
      'text-rotation' : 'autorotate',
      'text-opacity' : 1, // hide label by default
      'label'(e) {
        return e.data('source') ? e.data('source')+" => "+e.data('target') : ''
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

// truncate String to make it shorter
String.prototype.trunc = String.prototype.trunc ||
  function (n) {
    return (this.length > n) ? this.substr(0,n-1)+'...' : this
  }

export default NetworkDefaultStyle
