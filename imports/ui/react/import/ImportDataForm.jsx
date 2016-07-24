import React from 'react'
import { Card, CardHeader, CardText, TextArea, RaisedButton, FlatButton } from 'material-ui'

import ImportDataFile from './ImportDataFile.jsx'

const ImportDataForm = React.createClass({
  render() {
    return (
      <form id="importForm">
        <Card>
          <CardHeader
            title="Upload Data File"
          />
          <CardText>
            <ImportDataFile onDataChange={this.props.onDataChange}/>
          </CardText>
        </Card>
      </form>
    )
  }
})

export default ImportDataForm
