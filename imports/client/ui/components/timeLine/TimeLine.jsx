import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import moment from 'moment'

import { Card, CardText, CardHeader } from 'material-ui/Card'
import DatePicker from 'material-ui/DatePicker'
import IconButton from 'material-ui/IconButton'
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import TimeSlider from './TimeSlider.jsx'

const styleTimeLine = {
  height: '20vh',
  position: 'fixed',
  bottom: 0,
  width: '100vw'
}

@ui()





export default class TimeLine extends React.Component {

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
    console.log('maxDAte')
  }


  playOrPause = (event ) => {
    if (playOrPauseTrig == 1) {
      console.log("CLEARING A MESSY SCREEN THERE, LETS STOP THAT LOOP");
      console.log(tid)
      clearInterval(timerPlayPause);

      var playOrPauseTrig = 0;
      return;}


    var playOrPauseTrig = 1
    console.log('maxTime', this.props.ui.maxTime)
    console.log('minTime', this.props.ui.minTime)
    console.log("pros.ui.all", this.props.ui);
    console.log('ran playOrPause')

    var seconds = parseInt((this.props.ui.maxTime-this.props.ui.minTime)/1000);
    var tempo = Math.floor(seconds);
    //var k = Math.round(this.props.ui.minTime/1000);
    var k = Math.round(this.props.ui.minTime)
    console.log("k ,",k);
    //this.props.updateUI({currentSliderTime : Math.round(this.props.ui.minTime)} )
    // while (Math.round(k) < Math.round(this.props.ui.maxTime)) {
       console.log("tempo",tempo);
       console.log("k",k);
    // var
      var that = this


      var timerPlayPause = function(){
           console.log("momk",moment(k));
           console.log("pros.ui.all", that.props.ui);
           that.props.updateUI({currentSliderTime :  k })
           console.log("k_add",k);
           console.log(Math.round(that.props.ui.maxTime));
           k = Math.round(k + tempo)
           if (k >= Math.round(that.props.ui.maxTime))
           {
             clearInterval(tid)

           }
    //        ;
        }
        var tid = setInterval(timerPlayPause, 10);
  //   }
  }

  render() {

    const { minTime, maxTime } = this.props.ui
    const { hasTimeInfo } = this.props
//FOR TIMER

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

                  <IconButton onClick={this.playOrPause}>
                    <PlayCircleFilled />
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
