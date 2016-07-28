import React from 'react'
import { TextField, RaisedButton } from 'material-ui'
import { FlowRouter } from 'meteor/kadira:flow-router'

let formStyle = { padding : '150px' }
let buttonStyle = { marginLeft : 12 }

class TopogramAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    console.log(this);
  }

  handleSubmit(e) {
    e.preventDefault()

    const topogramName = this.refs.topogramName.getValue()

    if ( topogramName != '' ) {
      if (Meteor.userId()) {
        Meteor.call( 'createTopogram', Meteor.userId(), topogramName, function (err, topogram) {
          if (err) throw err
          if (topogram.status == 'error') this.props.promptSnackbar( topogram.message )
          else FlowRouter.go( '/topograms/' + topogram )
        })
      }
      else {
        Meteor.call( 'createPublicTopogram', topogramName, function (err, topogram) {
          if (err) throw err
          if (topogram.status == 'error') this.props.promptSnackbar( topogram.message )
          else FlowRouter.go( '/topograms/' + topogram )
        })
      }
    }
    else {
      this.props.promptSnackbar( 'TopogramName should not be empty' )
    }
  }

  render() {
    return (
      <section className="home-create-section">
        <form
          onSubmit={this.handleSubmit}
          style={formStyle}
        >
          <TextField
            name="topogramName"
            ref="topogramName"
            floatingLabelText="Create a new Topogram"
            hintText="Input a name..."
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

export default TopogramAddForm
