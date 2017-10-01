import React from 'react'
import ui from 'redux-ui'
import moment from 'moment'

import { Card, CardText, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'

import TimeSlider from './TimeSlider.jsx'

// import FilterByTime from '../filterByTime/FilterByTime.jsx'

const styleTimeLine = {
  height: '20vh',
  position: 'fixed',
  bottom: 0,
  width: '100vw'
}

@ui()
export default class TimeLine extends React.Component {

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
                <TimeSlider
                  minTime={new Date(minTime).getTime()}
                  maxTime={new Date(maxTime).getTime()}
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
