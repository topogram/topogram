import React, { PropTypes } from 'react'

import MenuItem from 'material-ui/MenuItem'
//import { topogramTogglePublic } from '../../../../api/topograms/topogramsMethods.js'
//import WorldIcon from 'material-ui/svg-icons/social/public'
import CheckedIcon from 'material-ui/svg-icons/navigation/check'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField';
import ui from 'redux-ui'

@ui()
export default class GraphicalTweaks extends React.Component {

  constructor(props) {
   super(props)

var originalfontSizeNetwork = 8
this.fontSizeNetwork = originalfontSizeNetwork



this.state = {
  fontSizeNetwork : 8

}
}





  static propTypes = {
    fontSizeNetwork : PropTypes.number
    //topogramId : PropTypes.string.isRequired,
    //topogramSharedPublic : PropTypes.bool.isRequired
  }

//  handleOnClick = () =>
  //  topogramTogglePublic.call({
  //    topogramId : this.props.topogramId
  //  })
  handleChangefontSizeNetwork = (e) => {
    const fontSizeNetwork = e.target.value
    console.log(this.fontSizeNetwork);
    this.setState({ fontSizeNetwork })
    this.props.updateUI({fontSizeNetwork :  this.state.fontSizeNetwork })

  }

  render() {
    const {fontSizeNetwork}=this.props.ui

    return (
      <span>

      <Subheader>
      Font Size settings
        </Subheader>
      <TextField
        name='CytoscapeJsFontSizeSetter'
        type='number'
        className=''
        min={0.1}
        max={1000}
        step={.5}
        //default={8}
        floatingLabelFixed={true}
        floatingLabelText='Network'
        style={{width : '3em', margin: '0 2em'}}
        value={this.state.fontSizeNetwork}
        // columns={3}
        onChange={ this.handleChangefontSizeNetwork}
          />



      </span>
    )
  }
}
