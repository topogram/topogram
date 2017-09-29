import React from 'react'
import Dialog from 'material-ui/Dialog'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

// import Version from './Version.jsx'

import InfoIcon from 'material-ui/svg-icons/action/info';
console.log(InfoIcon);

class About extends React.Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]
    return (
      <div>
        <MenuItem
          primaryText="About"
          onClick={this.handleOpen}
          leftIcon={<InfoIcon />}
        />
        <Dialog
          title="About Topogram"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>
            Topogram is a free and open-source software. Read more at
            <a href="http://topogram.io">topogram.io</a>.
          </p>


          <p>
            Please feel free to get in touch with us at <a href="mailto:hi@topogram.io">hi@topogram.io</a> or via <a href="http://twitter.com/topoviz">Twitter</a>.
          </p>
          <p><small>
            2015-2017 (cc). Thanks to Clément Renaud, Grégory Bahde and Lionel Radisson.
          </small></p>
          {/* <Version /> */}
        </Dialog>
      </div>
    )
  }
}

export default About
