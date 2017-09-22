import React from 'react'

import ImportFieldSelector from '../importFields/ImportFieldSelector.jsx'
import ImportOptionalFields from '../importFields/ImportOptionalFields.jsx'

const ImportNodesFields = React.createClass({
  render() {
    return (
      <div>
        <ImportFieldSelector
          fields={this.props.fields}
          label="Id"
          ref="id"
          optional={false}
        />
        <hr />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Latitude"
          ref="lat"
          optional={true}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Longitude"
          ref="lng"
          optional={true}
        />
        <ImportOptionalFields
          fields={this.props.fields}
          ref="optionalFields"
          />
      </div>
    )
  }
})
export default ImportNodesFields
