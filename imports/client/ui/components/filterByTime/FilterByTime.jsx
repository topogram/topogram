import React from 'react'
import ui from 'redux-ui'
import moment from 'moment'

import DatePicker from 'material-ui/DatePicker';

import SideNavItem from '../sideNav/SideNavItem.jsx'

@ui()
export default class FilterByTime extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChangeMinTime = (event, date) => {
    ui.updateUI('minTime', date)
  };

  handleChangeMaxTime = (event, date) => {
    ui.updateUI('maxTime', date)
  };

  render() {

    const {minTime, maxTime} = this.props.ui
    console.log(minTime, maxTime);

    return (
      <SideNavItem
        title="Time Filter"
        subtitle={`${moment(minTime).format("MMM Do YYYY")} > ${moment(maxTime).format("MMM Do YYYY")}`}
        >
        <DatePicker
          onChange={this.handleChangeMinDate}
          autoOk={true}
          floatingLabelText="Min Date"
          value={minTime}
        />
        <DatePicker
          onChange={this.handleChangeMaxDate}
          autoOk={true}
          floatingLabelText="Max Date"
          value={maxTime}
        />
      </SideNavItem>
    );
  }

}
