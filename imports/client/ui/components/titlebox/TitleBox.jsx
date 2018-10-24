import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import FocusIcon from 'material-ui/svg-icons/image/center-focus-strong'

import SelectionChips from '../selectionItem/SelectionChips.jsx'
import SelectedItem from '../selectionItem/SelectedItem.jsx'
import SvgIcon from 'material-ui/SvgIcon'
import Modal from './Modal';
import './TitleBox.css'

@ui()
export default class TitleBox extends React.Component {

static propTypes = {
    topogramTitle : PropTypes.string,

  }




  constructor(props) {
    super(props)

    this.state = { isOpen: false };
  }
  toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
//
//    TitleForBox =(this.props.topogramTitle)=>{
//     return(
//       this.props.topogramTitle.split("/B")[0]
// )
//     }

render(){

const {
  cy,
  topogramTitle,

  selectedElements,
  unselectElement,
  unselectAllElements,

  isolateMode,
  handleEnterIsolateMode,
  handleEnterExtractMode,
  handleExitIsolateMode,
  handleSaveSelection,
  handleLoadSelection,
  handleSaveSVGs,
  handleFilterByWeight,
  focusElement,
  onFocusElement,
  onUnfocusElement
} = this.props

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 5,
  maxWidth: 500,
  minHeight: 300,
  margin: '0 auto',
  padding: 30
};

if (this.props.topogramTitle){

var   TitleForBox =this.props.topogramTitle.split("\n")[0]
var   Title2ForBox =this.props.topogramTitle.split("\n")[1]
 var   Title3ForBox =this.props.topogramTitle.split("\n")[2]
 var   Title4ForBox =this.props.topogramTitle.split("\n")[3]
 var   Title5ForBox =this.props.topogramTitle.split("\n")[4]
//


return(
  <Card
    style={{
      //bottom: 5,
      maxWidth : '20%',
      minWidth : '15%',
      float : 'left',
      borderBottomRightRadius:"20px",
      borderTopRightRadius:"5px",
      borderBottomLeftRadius:"5px",
      boxShadow: '1px 1px 8px  #000',
      border: '1px solid #222',
      backgroundColor: 'rgba(69,90,100,0.9)',

    }}
  >
  <div>
    <CardTitle
      title={
        <div style={{fontSize:"8pt", color: '#D3E8E6',fontWeight:  'bold'}}>BandsTour v.2 GPLv3 by <a  href="mailto:greg@grrrndzero.org">Gregory Bahde</a>@UJM-ENSSIB--GZ</div>}
      titleStyle={{ fontSize : '8pt', lineHeight : '1em',padding:"0px 2px 5px 2px",fontColor: "#D3E8E6  !important"}}
      subtitle={TitleForBox}
        subtitleStyle={{ fontSize : '12pt', color: '#aa8dc6', lineHeight : '1.3em',fontWeight:  'bold' }}
    />
{this.state.isOpen?
  null:
<RaisedButton style={{fontSize: "8pt" ,Width : "15px",height:"15px",backgroundColor:"#aa8dc6 !important",fontWeight:  'bold'}} onClick={this.toggleModal}>DATAS...</RaisedButton>
}
              <Modal style={{fontSize:"8pt"}}show={this.state.isOpen}
                onClose={this.toggleModal}>
<span style={{fontSize:"10pt"}}>
                {Title2ForBox}<br/>
                {Title3ForBox}<br/>
                {Title4ForBox}<br/>
                <a style={{fontWeight:"bold"}}>{Title5ForBox}</a>
</span>
              </Modal>
    </div>
    {
      !!selectedElements.length ?
      <SelectionChips
        cy={cy}
        selectedElements={selectedElements}
        unselectElement={unselectElement}
        onFocusElement={onFocusElement}
        variant="outlined"
        className="ChipSelect"
        />
        :
        null
    }
    {
      !! selectedElements.length ?
      <CardActions >
        {
          isolateMode ?
          <div>
            <FlatButton
              label="Clear"
              labelPosition="before"
              icon={<ClearIcon />}
              onClick={handleExitIsolateMode}
              />
            {/*
              <RaisedButton style={{fontSize: "6pt" ,Width : "15px",height:"15px"}}
                label="Save selection"
                labelPosition="before"
              //  icon={<FocusIcon />}
                onClick={handleSaveSelection}
                />
              <RaisedButton style={{fontSize: "6pt" ,Width : "15px",height:"15px"}}
                className= "Titbox"
                label="SaveSVGs"
                labelPosition="before"
                //icon={<FocusIcon />}
                onClick={handleSaveSVGs}
                />
                */}
          </div>
            :
            <div>
            <RaisedButton style={{fontSize: "6pt" ,Width : "15px",height:"15px"}}
              label="Focus and rearrange"

              width="50%"
              labelPosition="before"
              //icon={<FocusIcon />}
              onClick={handleEnterIsolateMode}

              />

              <RaisedButton style={{fontSize: "6pt" ,Width : "15px",height:"15px"}}
                label="Focus only"
                labelPosition="before"
                //icon={<FocusIcon />}
                onClick={handleEnterExtractMode}
                />
                {/* <RaisedButton style={{fontSize: "6pt" ,Width : "15px",height:"15px"}}
                  label="Save selection"
                  labelPosition="before"
                //  icon={<FocusIcon />}
                  onClick={handleSaveSelection}
                  />
                  <RaisedButton style={{fontSize: "6pt" ,Width : "15px",height:"15px"}}
                    className= "Titbox"
                    label="Load Selection"
                    labelPosition="before"
                    //icon={<FocusIcon />}
                    onClick={handleLoadSelection}
                    />

                    <RaisedButton style={{fontSize: "6pt" ,Width : "15px",height:"15px"}}
                      className= "Titbox"
                      label="SaveSVGs"
                      labelPosition="before"
                      //icon={<FocusIcon />}
                      onClick={handleSaveSVGs}
                      />
                       */}
              </div>



          }
      </CardActions>
      :
      null
    }
    {
      !!focusElement ?
      <SelectedItem
        key={focusElement.data.id}
        el={focusElement}
        cy={cy}
        onUnfocusElement={onUnfocusElement}
      />
      :
      null
    }

  </Card>
)
}
else {return(
  null)
}
}
}
