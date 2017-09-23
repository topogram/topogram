import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui'

import ImportDataFileField from '../importFields/ImportDataFileField.jsx'

const ImportDataForm = React.createClass({
  render() {
    return (
      <form id="importForm">
        <Card>
          <CardHeader
            title="Upload Data File"
          />
          <CardText>
            <ImportDataFileField onDataChange={this.props.onDataChange}/>
          </CardText>
        </Card>
      </form>
    )
  }
})

export default ImportDataForm
