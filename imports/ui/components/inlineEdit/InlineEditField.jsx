import React from 'react'
import TextField from 'material-ui/TextField'
import grey400 from 'material-ui/styles/colors'

import Markdown from 'react-remarkable'
import './markdown.scss'

const styles = {
  helpBlock : {
    color : grey400,
    fontSize: '.6em'
  }
}

class InlineEditField extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      editing: null,
      text : this.props.defaultValue // initial text
    }
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleEditToggle() {
    this.setState({ editing: !this.state.editing })
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSave(e) {
    let type = this.props.type || 'input'
    if ( type === 'input' && e.key === 'Enter' || type === 'textarea' && e.key === 'Enter' && e.ctrlKey == true ) {
      if (!this.props.allowEmpty && this.state.text == '') {
        this.props.promptSnackbar( 'This field should not be empty' )
      }
      else {
        Meteor.call('updateField',
          this.props.collection,
          this.props._id,
          this.props.field,
          this.state.text, (error, success) => {
            if (error)  this.props.promptSnackbar( 'Error while saving' )
            else if (success)  this.props.promptSnackbar( 'Value updated !' )
            this.setState({ editing: false })
          }
        )
      }
    }
    else if (e.key === 'Escape') { // esc
      this.setState({ editing : false, text: this.props.defaultValue })
    }
  }

  render() {
    let fieldId = 'field'+~~(Math.random()*1000000)
    let placeholder = this.props.stateholder || 'Click to edit'
    let type = this.props.type || 'input'

    if ( this.state.editing ) {
      return (
        <div style={this.props.style}>
          {type === 'input' ?
            <TextField
              hintText={placeholder}
              value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSave}
              onBlur={this.handleEditToggle}
              name={fieldId}
            />
          : null}
          {type === 'textarea' ?
            <span>
              <TextField
                multiLine={true}
                hintText={placeholder}
                value={this.state.text}
                onChange={this.handleChange}
                onKeyDown={this.handleSave}
                onBlur={this.handleEditToggle}
                name={fieldId}
              />
              <p style={styles.helpBlock}>
                Format with Markdown. Ctrl + enter to validate.
              </p>
            </span>
          : null}
        </div>
      )
    }
    else {
      let text = this.state.text || this.props.placeholder
      let className = 'editable'
      if (this.props.type === 'textarea') {
        text =  <Markdown>{this.state.text}</Markdown>
        className = 'reset-this'
      }

      console.log(text)
      return (
        <span
          className={className}
          onClick={ this.handleEditToggle }
          style={this.props.style}
        >
          {text}
        </span>
      )
    }
  }

}

InlineEditField.PropTypes = {
  type: React.PropTypes.oneOf(['input', 'textarea']),
  defaultValue : React.PropTypes.string, // when the textbox is empty
  placeholder: React.PropTypes.string,
  _id : React.PropTypes.string.isRequired,
  collection : React.PropTypes.string.isRequired,
  field : React.PropTypes.string.isRequired,
  allowEmpty: React.PropTypes.bool,
  promptSnackbar: React.PropTypes.func
}



export default InlineEditField
