import React from 'react'
import PropTypes from 'prop-types'
import store from '../../store'
import format from 'date-fns/format';

import { Card, CardText, CardHeader } from 'material-ui/Card'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker'
import IconButton from 'material-ui/IconButton'
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import Pause from 'material-ui/svg-icons/av/pause';
import Stop from 'material-ui/svg-icons/av/stop';
import TimeSlider from './TimeSlider.jsx'

const styleTimeLine = {
  height: '30vh',
  position: 'fixed',
  bottom: 0,
  width: '100vw'
}


export default class TimeLine extends React.Component {

  constructor(props) {
   super(props)

   var seconds = parseInt((this.props.maxTime-this.props.minTime)/1000);
   var tempo = Math.floor(seconds);

   this.originalTempo = tempo

   this.state = {
     playing : false,
     tempo,
     step : 1,
     timer : null
   }
  }

  static propTypes = {
    hasTimeInfo : PropTypes.bool
  }

  handleChangeMinTime = (event, date) => {
    store.dispatch({
      type : 'SET_MIN_TIME',
      minTime:  date
    })
  }

  handleChangeMaxTime = (event, date) => {
    store.dispatch({
      type : 'SET_MAX_TIME',
      maxTime:  date
    })
  }

  openMinDatePicker = () => {
    this.refs.minDatePicker.focus()
  }

  openMaxDatePicker = () => {
    this.refs.maxDatePicker.focus()
  }

  pause = () => {
    // clearInterval
    clearInterval(this.state.timer)
    this.setState({playing : false, timer : null})
  }

  play = () => {

    const { tempo } = this.state;
    const {
      currentSliderTime,
      maxTime
     } = this.props

    // start setInterval
    const timer = setInterval( () => {
      const newTime = Math.round(currentSliderTime) + tempo;
      if (newTime >= Math.round(maxTime)) this.pause()

      store.dispatch({
        type : 'SET_CURRENT_SLIDER_TIME',
        currentSliderTime:  newTime
      })

    },10)

    this.setState({
      playing : true,
      timer
    })
  }

  stop = () => {
    this.pause()
    store.dispatch({
      type : 'SET_CURRENT_SLIDER_TIME',
      currentSliderTime:  Math.round(this.props.minTime)
    })
  }

  handleChangeStep = (e) => {
    const step = e.target.value
    const tempo = this.originalTempo*step
    this.setState({ step, tempo })
  }

  render() {

    const {
      minTime,
      maxTime,
      currentSliderTime,
      hasTimeInfo
    } = this.props

    return (
      <Card
        style={styleTimeLine}
      >
        { !hasTimeInfo ?
          <CardHeader
            title={'No time info available.'}
          />
          :
          <div>
            <CardHeader
              subtitle={
                <span>
                  From <a onClick={this.openMinDatePicker}
                    style={{ cursor : 'pointer', color : 'black' }}>
                    {`${format(minTime, 'MMM Do YYYY')}`}
                  </a> to <a onClick={this.openMaxDatePicker}
                    style={{ cursor : 'pointer', color : 'black' }}>
                    {`${format(maxTime, 'MMM Do YYYY')}`}
                  </a>

                  <IconButton
                    onClick={
                      this.state.playing ?
                        () => this.pause()
                        :
                        () => this.play()
                      }
                    alt="Play/Resume"
                    title="Play/Resume"
                    >
                    {
                      this.state.playing ?
                        <Pause />
                        :
                        <PlayCircleFilled />
                    }
                  </IconButton>
                  <IconButton
                    onClick={() => this.stop()}
                    alt="Stop"
                    title="Stop"
                    >
                    <Stop />
                  </IconButton>

                  <TextField
                    name='stepSetter'
                    type='number'
                    min={0.1}
                    max={10}
                    step={.1}
                    floatingLabelFixed={true}
                    floatingLabelText='Speed'
                    style={{width : '3em', margin: '0 2em'}}
                    value={this.state.step}
                    onChange={this.handleChangeStep}
                    />

                </span>
              }
            />



            <DatePicker
              onChange={this.handleChangeMinTime}
              ref="minDatePicker"
              autoOk={true}
              textFieldStyle={{ display: 'none' }}
              floatingLabelText="Min Date"
              value={minTime}
            />
            <DatePicker
              ref="maxDatePicker"
              textFieldStyle={{ display: 'none' }}
              onChange={this.handleChangeMaxTime}
              autoOk={true}
              floatingLabelText="Max Date"
              value={maxTime}
            />
            <CardText>
              { minTime && maxTime ?
                <TimeSlider
                  minTime={new Date(minTime).getTime()}
                  maxTime={new Date(maxTime).getTime()}
                  currentSliderTime={currentSliderTime}
                  />
                :
                null
              }
            </CardText>
          </div>
        }
      </Card>
    )
  }
}
