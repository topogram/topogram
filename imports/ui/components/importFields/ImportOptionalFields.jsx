import React from 'react'

import ImportFieldSelector from './ImportFieldSelector.jsx'

const ImportOptionalFields = React.createClass({
  render() {
    return (
      <div>
        <ImportFieldSelector
          fields={this.props.fields}
          label="Label"
          ref="label"
          optional={true}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Type/Group"
          ref="type"
          optional={true}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Time (start)"
          ref="start"
          optional={true}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Time (end)"
          ref="end"
          optional={true}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Color (html code)"
          ref="color"
          optional={true}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Weight (number)"
          ref="weight"
          optional={true}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Additional Data"
          ref="additionalInfo"
          optional={true}
        />
      </div>
    )
  }

})

export default ImportOptionalFields
