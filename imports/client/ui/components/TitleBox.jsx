import React, { PropTypes } from 'react'

import { Card, CardTitle, CardActions } from 'material-ui/Card'

const TitleBox = ({topogramTitle}) => (
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
  </Card>
)

TitleBox.propTypes = {
  topogramTitle : PropTypes.string,
}
export default TitleBox
