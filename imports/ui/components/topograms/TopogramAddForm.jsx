import React from 'react'
import { TextField, RaisedButton } from 'material-ui'
import { defineMessages, injectIntl } from 'react-intl'

import { topogramCreate } from '../../../api/topograms/topogramsMethods.js'

let formStyle = { padding : '150px' }
let buttonStyle = { marginLeft : 12 }

const messages = defineMessages({
  label :{
    'id': 'topogram.addForm.label',
    'defaultMessage': 'Create a new Topogram',
    'message': ''
  },
  hint : {
    'id': 'topogram.addForm.hint',
    'defaultMessage': 'Input a name',
    'message': ''
  }
})

class TopogramAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const topogramName = this.refs.topogramName.getValue()

    if ( topogramName != '' ) {
      topogramCreate.call( {
        name : topogramName
      }, (err, topogram) => {
        console.log(err, topogram)
        if (err) this.props.promptSnackbar(err)
        else if (topogram.status == 'error') this.props.promptSnackbar( topogram.message )
        else console.log("go( '/topograms/' + topogram )")
      })
    }
    else {
      this.props.promptSnackbar( 'TopogramName should not be empty' )
    }
  }

  render() {
    const { formatMessage } = this.props.intl
    return (
      <section className="home-create-section">
        <form
          onSubmit={this.handleSubmit}
          style={formStyle}
        >
          <TextField
            name="topogramName"
            ref="topogramName"
            floatingLabelText={formatMessage(messages.label)}
            hintText={formatMessage(messages.hint)}
          />

          <RaisedButton
            type="submit"
            label="Create"
            primary={true}
            style={buttonStyle}
          />
        </form>
      </section>
    )
  }
}

TopogramAddForm.propTypes = {
  promptSnackbar: React.PropTypes.func
}

export default injectIntl(TopogramAddForm)
