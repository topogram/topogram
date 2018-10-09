import React, {PropTypes} from 'react'
import { CardTitle, CardText } from 'material-ui/Card'
import moment from 'moment'
import Divider from 'material-ui/Divider'

const PanelDescription = ({
  topogram,
  nodesCount,
  edgesCount
}) => (
  <span>
    <CardTitle
      title={topogram.title}
      titleStyle={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em',padding:"2px 2px 10px 2px" }}

      subtitle={`${nodesCount} nodes, ${edgesCount} edges`}
        subtitleStyle={{ color: '#F2EFE9', fontSize : '8pt', lineHeight : '1em' }}
      />

    <Divider />
    <CardText style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>
      {topogram.description}

      <p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>Last modified {moment(topogram.lastModified).fromNow()}</p>
      <p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>Created {moment(topogram.createdAt).fromNow()}</p>
    </CardText>

  </span>
)

export default PanelDescription
