import React from 'react'
import { TextField, RaisedButton } from 'material-ui'
import { FlowRouter } from 'meteor/kadira:flow-router'

let formStyle = {
  textAlign : 'center',
  margin : '4em auto',
  width : '50%'
}

let buttonStyle = { margin: 12 }

const TopogramAddForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault()
    console.log(this);
    const topogramName = this.refs.topogramName.getValue()
    if ( topogramName != '' ) {
      Meteor.call( 'createTopogram', Meteor.userId(), topogramName, function (err, topogram) {
        if (err) throw err
        if (topogram.status == 'error') this.refs.flash.sendError(topogram.message)
        else FlowRouter.go( '/topograms/' + topogram + '/import' )
      })
    } else {
      this.refs.flash.sendError( 'TopogramName should not be empty' )
    }
  },
  render() {
    return (
      <form className="form-inline" style={formStyle} onSubmit={this.handleSubmit}>
        <div className="form-group">
          <TextField
            name="topogramName"
            ref="topogramName"
            floatingLabelText="Create a new Topogram"
            hintText="Input a name..."
          />
          <RaisedButton type="submit" label="Create" primary={true} style={buttonStyle} />
        </div>
      </form>
    )
  }
})

export default TopogramAddForm
