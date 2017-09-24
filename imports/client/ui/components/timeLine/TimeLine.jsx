import React from 'react'
import ui from 'redux-ui'
import moment from 'moment'

import {Card, CardText, CardHeader} from 'material-ui/Card'
import TimeSlider from './TimeSlider.jsx';

import FilterByTime from '../filterByTime/FilterByTime.jsx'

const styleTimeLine = {
  height: '20vh',
  position: 'fixed',
  bottom: 0,
  width: '100vw'
}

@ui()
export default class TimeLine extends React.Component {
  render() {

    const {minTime, maxTime} = this.props.ui
    const {hasTimeInfo} = this.props

    console.log(new Date(minTime).getTime());
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
              subtitle={`From ${moment(minTime).format("MMM Do YYYY")} to ${moment(maxTime).format("MMM Do YYYY")}`}
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
