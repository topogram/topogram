import 'rc-slider/assets/index.css'
import './timeline.css'

import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import moment from 'moment'


import Slider, { createSliderWithTooltip } from 'rc-slider'

const SliderWithTooltip = createSliderWithTooltip(Slider)

function dateFormatter(v) {
  return moment(v).format('MMM D, YYYY')
}


export default class TimeSlider extends React.Component {

  static propTypes = {
    minTime : PropTypes.number,
    maxTime : PropTypes.number
  }

  onSliderChange = (value) => {
    this.props.updateUI({ currentSliderTime : value })
  }

  render() {
    const { minTime, maxTime } = this.props
    const { currentSliderTime } = this.props.ui

    const minYear = moment(minTime).year(),
      maxYear = moment(maxTime).year()

    // generate list of years (in ms)
    const marksYears = {}
    Array(maxYear-minYear+1)
      .fill(0)
      .map((n,i) => minYear+i)
      .forEach(n => marksYears[new Date(n, 0, 1).getTime()] = n)

    return (
      <div>
        <SliderWithTooltip
          style={{ zIndex : 100 }}
          value={currentSliderTime}
          min={minTime}
          max={maxTime}
          step={1}
          marks={marksYears}
          tipFormatter={dateFormatter}
          tipProps={{ overlayClassName: 'foo' }}
          onChange={this.onSliderChange}
        />
      </div>
    )
  }
}
