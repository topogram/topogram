import 'rc-slider/assets/index.css';
import './timeline.css';

import React from 'react'
import moment from 'moment'


import Slider, { createSliderWithTooltip } from 'rc-slider';
const Range = Slider.Range;
const Handle = Slider.Handle;


const SliderWithTooltip = createSliderWithTooltip(Slider);

function dateFormatter(v) {
  return moment(v).format("MMM D, YYYY")
}

export default class TimeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.maxTime
    };
  }
  onSliderChange = (value) => {
    this.setState({ value });
  }

  render() {
    const {minTime, maxTime} = this.props

    const minYear = moment(minTime).year(),
      maxYear = moment(maxTime).year()

    // generate list of years
    const marksYears = {}
    Array(maxYear-minYear+1)
      .fill(0)
      .map((n,i) => minYear+i)
      .forEach(n => marksYears[new Date(n, 0, 1).getTime()] = n)

    return (
      <div>
        <SliderWithTooltip
          style={{ zIndex : 100 }}
          value={this.state.value}
          min={minTime}
          max={maxTime}
          marks={marksYears}
          tipFormatter={dateFormatter}
          tipProps={{ overlayClassName: 'foo' }}
          onChange={this.onSliderChange}
        />
        {/* <Range
          allowCross={false}
        /> */}
      </div>
    );
  }
}
