import React from 'react'
import TextField from 'material-ui/TextField'
import grey400 from 'material-ui/styles/colors'

import Markdown from 'react-remarkable'
import 'github-markdown-css'
import './inlineEdit.scss'

const styles = {
  helpBlock : {
    color : grey400,
    fontSize: '.6em'
  }
}

/**
 * Inline editable text component
 * support Mardown
 */
class InlineEditField extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      text : this.props.defaultValue // initial text
    }
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleEditToggle() {
    if (!this.props.allowEmpty && this.state.text == '') {
      this.props.promptSnackbar( 'This field should not be empty' )
    }
    else this.setState({ editing: !this.state.editing })
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSave(e) {
    const type = this.props.type || 'input'
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
      this.setState({ editing : false })
    }
  }

  render() {
    let fieldId = 'field'+~~(Math.random()*1000000)
    console.log(this.props.style)

    if ( this.state.editing ) {
      return (
        <span>
          {this.props.type === 'input' ?
            <TextField
              hintText={this.props.placeholder}
              value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSave}
              onBlur={this.handleEditToggle}
              name={fieldId}
              ref="textField"
              style={this.props.style}
              fullWidth={true}
            />
          : null}
          {this.props.type === 'textarea' ?
            <span style={this.props.style}>
              <TextField
                multiLine={true}
                hintText={this.props.placeholder}
                value={this.state.text}
                onChange={this.handleChange}
                onKeyDown={this.handleSave}
                onBlur={this.handleEditToggle}
                name={fieldId}
                ref="textField"
                style={this.props.style}
              />
              <p style={styles.helpBlock}>
                Format with Markdown. Ctrl + enter to validate.
              </p>
            </span>
          : null}
        </span>
      )
    }
    else {
      let text = (this.state.text == '') ? this.props.placeholder : this.state.text
      let className = 'editable'
      if (this.props.type === 'textarea') {
        text =  <Markdown>{this.state.text}</Markdown>
        className += ' markdown-body'
      }
      if (this.state.text == '') className +=' emptyfield'
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

InlineEditField.propTypes = {
  /**
  * Select if you want a simple input/text or a multiline markdown/textara field
  */
  type: React.PropTypes.oneOf(['input', 'textarea']),
  /**
  * Default text to be passed at initialization
  */
  defaultValue : React.PropTypes.string,
  /**
  * What is displayed when the text box is empty
  */
  placeholder: React.PropTypes.string,
  _id : React.PropTypes.string.isRequired,
  collection : React.PropTypes.string.isRequired,
  field : React.PropTypes.string.isRequired,
  allowEmpty: React.PropTypes.bool,
  promptSnackbar: React.PropTypes.func
}


InlineEditField.defaultProps = {
  allowEmpty: false,
  placeholder : 'Click to edit',
  type : 'input'
}


export default InlineEditField
