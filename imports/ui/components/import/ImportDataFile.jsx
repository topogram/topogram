import React from 'react'
import Papa from 'papaparse'

import { TextField, FlatButton } from 'material-ui'
import FlashMessages from '../flashMessages/FlashMessages.jsx'

const ImportDataFile = React.createClass({

  getInitialState() {
    return {
      fileName : '',
      dataText : '',
      parsingOptions : { // TODO : make UI for those options
        header: true
      }
    }
  },
  _checkData() {
    this._parseCSVData(this.state.dataText)
  },
  _updateDataText(e) {
    this.setState({dataText : e.target.value})
  },
  _parseCSVData(csvData) {

    // if the last line is empty, remove it to avoid parsing errors
    if (csvData.slice(-1) ==  '\n') csvData = csvData.slice(0, - 1)

    const data = Papa.parse( csvData, this.state.parsingOptions )

    if ( data.meta.fields ) {
      // check if there is any points in the fields
      data.meta.fields.forEach(function (fieldName) {
        if (fieldName.split('.').length > 1) {
          data.errors.push({
            'message' : 'the headers\''+ fieldName + '\' contains the forbidden character : \'.\''
          })
        }
      })

      // if single row only, the parser lib throw an error, so catch it and parse single row data
      if ( data.errors.length == '1' && data.errors[0].code == 'UndetectableDelimiter' && data.meta.fields.length == 1) {

        var message =  + data.data.length + ' records'
        this.refs.flash.sendSuccess( 'CSV parsed succesfully', message )

        // keep data
        this.props.onDataChange(true, data.meta.fields, data)

      // check for errors
      } else if (data.errors.length) {
        data.errors.forEach( error => {
          this.props.onDataChange(false)
          let msg = 'CSV Error: '
          if ( error.row ) msg += '[row ' + error.row + '] '
          msg += error.message
          this.refs.flash.sendError( msg )
        })
      } else {
        var message = 'CSV parsed succesfully : ' + data.data.length + ' records'
        this.refs.flash.sendSuccess( message )

          // keep data
        this.props.onDataChange(true, data.meta.fields, data)
      }
    }


  },
  _handleChange(e) {
    e.stopPropagation()

    // display file name
    this.setState({ fileName : e.target.value})
    const file = e.target.files[ 0 ]
    if ( !file ) {
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const contents = e.target.result.split( '\n' ).filter( function ( d ) {
        return d !== ''
      } ).join( '\n' )

      this.setState({dataText : contents}) // add to textarea
      this._parseCSVData(contents)
    }
    reader.readAsText( file )

  },
  _openFileDialog() {
    const fileUploadDom = this.refs.fileUpload;
    fileUploadDom.click();
  },
  render() {
    return (
      <div>
        <FlatButton
          label="Data file"
          labelPosition="before"
          onClick={this._openFileDialog}
        >
          <input
            type="file"
            ref="fileUpload"
            style={{'display' : 'none'}}
            onChange={this._handleChange}
          />
        </FlatButton>
        <p>{this.state.fileName}</p>
        <TextField
          ref='dataText'
          hintText="Raw Data Field"
          floatingLabelText="Data goes here"
          multiLine={true}
          rows={2}
          rowsMax={20}
          fullWidth={true}
          value={this.state.dataText}
          onChange={this._updateDataText}
        />
        <FlatButton
          label="Check Data"
          labelPosition="before"
          onClick={this._checkData}
        />
        <FlashMessages
          ref='flash'
        />
      </div>
    )
  }
})

export default ImportDataFile
