import React from 'react'
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

export default class FilterByTime extends React.Component {

  constructor(props) {
    super(props);

    //default
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      hasDates : false,
      setDefault :false,
      minDate: minDate,
      maxDate: maxDate
    };
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };

  componentWillUpdate(nextProps) {

    // if (this.props.starts.length || this.props.nodes.length) {
    //
    //   console.log(minDate, maxDate);
    //   this.setState({minDate, maxDate, setDefault : true})
    // }
  }

  render() {

    return (
      <div style={optionsStyle}>
        <DatePicker
          onChange={this.handleChangeMinDate}
          autoOk={true}
          floatingLabelText="Min Date"
          minDate={this.state.minDate}
          defaultDate={this.state.minDate}
        />
        <DatePicker
          onChange={this.handleChangeMaxDate}
          autoOk={true}
          floatingLabelText="Max Date"
          maxDate={this.state.maxDate}
          defaultDate={this.state.maxDate}
        />
      </div>
    );
  }

}
