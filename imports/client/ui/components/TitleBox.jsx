import React, { PropTypes } from 'react'

import { Card, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import FocusIcon from 'material-ui/svg-icons/image/center-focus-strong'

import SelectionChips from './selectionItem/SelectionChips.jsx'
import SelectedItem from './selectionItem/SelectedItem.jsx'


const TitleBox = ({
  cy,
  topogramTitle,

  selectedElements,
  unselectElement,
  unselectAllElements,

  isolateMode,
  handleEnterIsolateMode,
  handleExitIsolateMode,

  focusElement,
  onFocusElement,
  onUnfocusElement
}) => (
  <Card
    style={{
      bottom: 10,
      maxWidth : '30%',
      minWidth : '25%',
      float : 'left'
    }}
  >
    <CardTitle
      title={topogramTitle}
      titleStyle={{ fontSize : '14pt', lineHeight : '1em' }}
    />
    {
      !!selectedElements.length ?
      <SelectionChips
        cy={cy}
        selectedElements={selectedElements}
        unselectElement={unselectElement}
        onFocusElement={onFocusElement}
        />
        :
        null
    }
    {
      !! selectedElements.length ?
      <CardActions>
        {
          isolateMode ?
            <FlatButton
              label="Clear"
              labelPosition="before"
              icon={<ClearIcon />}
              onClick={handleExitIsolateMode}
              />
            :
            <RaisedButton
              label="Focus"
              labelPosition="before"
              icon={<FocusIcon />}
              onClick={handleEnterIsolateMode}
              />
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
