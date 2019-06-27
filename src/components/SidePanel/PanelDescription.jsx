import React, {PropTypes} from 'react'
import { CardTitle, CardText } from 'material-ui/Card'

const PanelDescription = ({
  topogram,
  nodesCount,
  edgesCount
}) => (
  <span>
    <CardTitle
      title={topogram.title}
      titleStyle={{ fontSize : '14pt', lineHeight : '1em' }}
      subtitle={`${nodesCount} nodes, ${edgesCount} edges`}
      />
    <CardText>
      {topogram.description}
    </CardText>

  </span>
)

export default PanelDescription
