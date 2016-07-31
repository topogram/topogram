import React from 'react'

import ImportFieldSelector from './ImportFieldSelector.jsx'
import ImportOptionalFields from './ImportOptionalFields.jsx'

const ImportEdgesFields = React.createClass({
  render() {
    return (
      <div>
        <ImportFieldSelector
          fields={this.props.fields}
          label="Source"
          ref="source"
          optional={false}
        />
        <ImportFieldSelector
          fields={this.props.fields}
          label="Target"
          ref="target"
          optional={false}
        />
        <hr />
        <ImportOptionalFields
          fields={this.props.fields}
          ref="optionalFields"
        />
      </div>
    )
  }

})

export default ImportEdgesFields
