import React from 'react'

import { SelectField, MenuItem, Checkbox } from 'material-ui';

const ImportFieldSelector = React.createClass({
  getDefaultProps() {
    return {
      fields : [],
      optional: false,
      label: ''
    }
  },
  getInitialState() {
    return {
      checked : false,
      value: undefined
    }
  },
  _onCheck(e) {
    this.setState({checked: e.target.checked })
  },
  _handleChange(e, k, value) {
    this.setState({ value })
  },
  render() {
    let checkbox,
      select;

    let items = this.props.fields.map( (item, i) =>
      <MenuItem
        key={i}
        value={item}
        primaryText={item}
      />
    )

    if (this.props.optional) {
      checkbox = (<Checkbox
        label={this.props.label}
        onCheck={this._onCheck}
        checked={this.state.checked}
      />)
    }

    if (!this.props.optional || this.state.checked) {
      select = (<SelectField
        id={this.props.id}
        value={this.state.value}
        floatingLabelText={this.label}
        onChange={this._handleChange}
      >
        {items}
      </SelectField>)
    }

    return (
      <div>
        {checkbox}
        {select}
      </div>
    )
  }
})

export default ImportFieldSelector
