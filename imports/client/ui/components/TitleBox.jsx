import React, { PropTypes } from 'react'

import { Card, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import SelectionChips from './selectionItem/SelectionChips.jsx'
import SelectedItem from './selectionItem/SelectedItem.jsx'


const TitleBox = ({
  cy,
  topogramTitle,

  selectedElements,
  unselectElement,
  unselectAllElements,

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
        <FlatButton
          label="Clear All"
          labelPosition="before"
          icon={<ClearIcon />}
          onClick={unselectAllElements}
          />
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
