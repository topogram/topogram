import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import moment from 'moment'

import { Card, CardText, CardHeader } from 'material-ui/Card'
import DatePicker from 'material-ui/DatePicker'
import IconButton from 'material-ui/IconButton'
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import Pause from 'material-ui/svg-icons/av/pause';
import Stop from 'material-ui/svg-icons/av/stop';
import TimeSlider from './TimeSlider.jsx'

const styleTimeLine = {
  height: '20vh',
  position: 'fixed',
  bottom: 0,
  width: '100vw'
}

@ui()
export default class TimeLine extends React.Component {

  constructor(props) {
   super(props)

   var seconds = parseInt((this.props.ui.maxTime-this.props.ui.minTime)/1000);
   var tempo = Math.floor(seconds);

   this.state = {
     playing : false,
     tempo,
     timer : null
   }
  }

  static propTypes = {
    hasTimeInfo : PropTypes.bool
  }

  handleChangeMinTime = (event, date) => {
    this.props.updateUI('minTime', date)
  }

  handleChangeMaxTime = (event, date) => {
    this.props.updateUI('maxTime', date)
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
    const { maxTime } = this.props.ui

    // start setInterval
    const timer = setInterval( () => {
      const newTime = Math.round(this.props.ui.currentSliderTime) + tempo;
      if (newTime >= Math.round(maxTime)) this.pause()

      this.props.updateUI({currentSliderTime :  newTime })
    },10)

    this.setState({
      playing : true,
      timer
    })
  }

  stop = () => {
    this.pause()
    this.props.updateUI({
      currentSliderTime : Math.round(this.props.ui.minTime)
    })
  }

  render() {

    const { minTime, maxTime } = this.props.ui
    const { hasTimeInfo } = this.props

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
                <p>
                  From <a onClick={this.openMinDatePicker}
                    style={{ cursor : 'pointer', color : 'black' }}>
                    {`${moment(minTime).format('MMM Do YYYY')}`}
                  </a>
                   to <a onClick={this.openMaxDatePicker}
                    style={{ cursor : 'pointer', color : 'black' }}>
                    {`${moment(maxTime).format('MMM Do YYYY')}`}
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
                </p>
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
                <div>
                      <TimeSlider
                        minTime={new Date(minTime).getTime()}
                        maxTime={new Date(maxTime).getTime()}
                    />

                </div>
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
