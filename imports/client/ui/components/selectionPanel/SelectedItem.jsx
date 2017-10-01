import React from 'react'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Markdown from 'react-remarkable'
import 'github-markdown-css'


const SelectedItem = ({title, group, children, notes}) => (
  <Card>
    <CardTitle
      title={title}
      subtitle={group}
      titleStyle={{fontSize : '1.2em'}}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      {children}
      {
        notes ?
          <Markdown source={notes} />
          :
          null
      }
    </CardText>
  </Card>
)

export default SelectedItem
