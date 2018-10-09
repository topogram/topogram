import React, { PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
//import { topogramTogglePublic } from '../../../../api/topograms/topogramsMethods.js'
//import WorldIcon from 'material-ui/svg-icons/social/public'
import CheckedIcon from 'material-ui/svg-icons/navigation/check'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField';
import ui from 'redux-ui'
import Checkbox from 'material-ui/Checkbox'


@ui()

export default class GraphicalTweaks extends React.Component {

  constructor(props) {
   super(props)

this.state = {
  fontSizeNetwork : 11,
  //SaveNodeMovesToDB : false

}
}




  handleChangefontSizeNetwork = (e) => {
    const fontSizeNetwork = e.target.value
    //console.log(fontSizeNetwork);
    this.setState({ fontSizeNetwork })
//console.log(this.state)
//console.log(this.props)

    this.props.updateUI({fontSizeNetwork :  this.state.fontSizeNetwork })

    const {cy} = this.props.ui


    cy.nodes().style({'font-size': this.props.ui.fontSizeNetwork})

    //this.props.ui.fontSizeNetwork=this.state.fontSizeNetwork

  }
  toggleChangeSaveNodeMovesToDB () {

 //console.log(this.props.ui.SaveNodeMovesToDB);
 //this.setState({ SaveNodeMovesToDB })
 this.props.updateUI( 'SaveNodeMovesToDB', !this.props.ui.SaveNodeMovesToDB)
  }






  render() {
    const {fontSizeNetwork}=this.props.ui

    return (
      <div>
      <Subheader>
      Font Size settings
        </Subheader>
        <table>
          <tbody>
            <tr>
        <td>
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
      </td>

      <td>
        <Checkbox
          label={'Save\nGraph\nNodes\nMove\nToDB'}

          checked={this.props.ui.SaveNodeMovesToDB}
          //disabled={!SaveNodeMovesToDB}
          onClick={ () => this.toggleChangeSaveNodeMovesToDB()}
          />

      </td>
      </tr>
      </tbody>
</table>


      </div>
    )
  }
}
