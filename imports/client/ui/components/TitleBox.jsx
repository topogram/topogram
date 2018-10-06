import React, { PropTypes } from 'react'

import { Card, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import FocusIcon from 'material-ui/svg-icons/image/center-focus-strong'

import SelectionChips from './selectionItem/SelectionChips.jsx'
import SelectedItem from './selectionItem/SelectedItem.jsx'
import SvgIcon from 'material-ui/SvgIcon';

import './TitleBox.css';

const TitleBox = ({
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
}) => (
  <Card
    style={{
      //bottom: 5,
      maxWidth : '20%',
      minWidth : '15%',
      float : 'left',
      borderBottomRightRadius:"20px",
      borderTopRightRadius:"5px",
      borderBottomLeftRadius:"5px"

    }}
  >
    <CardTitle
      title={
        <a  href="mailto:greg@grrrndzero.org">BandsTour (Beta.1) GPL V3 by Gregory Bahde /UJM/ENSSIB/RAIL</a>}
      titleStyle={{ fontSize : '8.5pt', lineHeight : '1.2em',fontWeight:  'bold',padding:"0px 2px 5px 2px" }}
      subtitle={
        topogramTitle}
        subtitleStyle={{ fontSize : '8.2pt', lineHeight : '1.3em',fontWeight:  'bold' }}
    />
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
                  /> */}
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

TitleBox.propTypes = {
  topogramTitle : PropTypes.string,
}
export default TitleBox
