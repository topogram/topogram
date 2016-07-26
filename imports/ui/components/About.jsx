import React from 'react'
import Dialog from 'material-ui/Dialog'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

import Version from './Version.jsx'

class About extends React.Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
      />
    ]
    return (
      <div>
        <MenuItem primaryText="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="About Topogram"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Topogram is a free and open-source software. </p>

          <p>
            Read more on <a href="http://topogram.io">the official website</a>.
          </p>

          <p>
            Please feel free to get in touch with us at <a href="mailto:hi@topogram.io">hi@topogram.io</a> or via <a href="http://twitter.com/topoviz">Twitter</a>.
          </p>

          <Version />
        </Dialog>
      </div>
    )
  }
}

export default About
