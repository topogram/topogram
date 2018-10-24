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
        subtitleStyle={{ color: '#aa8dc6', fontSize : '9pt',fontWeight: 'bold', lineHeight : '1em' }}
      />

    <Divider />
    <CardText style={{ color: '#F2EFE9',fontSize : '8pt',lineHeight : '1em' }}>
      {topogram.description}

      <p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>Last modified {moment(topogram.lastModified).fromNow()}</p>
      <p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>Created {moment(topogram.createdAt).fromNow()}</p>
<Divider />
<br/>

  <p style={{ color: '#aa8dc6',fontSize : '9pt',fontWeight: 'bold', lineHeight : '1em' }}>
    How to use Bandstour?</p>
  <p style={{ color: '#aa8dc6',fontSize : '8pt', lineHeight : '1em' }}>
      SidePanels:</p>

  <p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>
    Network and Map embed controls allow for finer tuning of the views than mouse controls, try it and you will see for yourself!.</p>

  <p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>

The wheel allows different changes of configuration: Display/Hide legend, Charts, Network, Geo Map,Time. Map background allows changing Geo Map background.

 Network layout allows different network rendering.

 Node radius can be set depending on weight (as provided), or degree of connectivity. Settings Allow different modifications of the graph, including delete (BEWARE).

 Font Size and DB Settings are quick-and-dirty hacks that allow Network font restyling for optimal viewing and saving, Save Graph Nodes move to DB allows to force saving node moved to DB.

</p>
<br/>
<p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>

The Home button allows searching for Nodes (here venues).

</p>
<p style={{ color: '#aa8dc6',fontSize : '8pt', lineHeight : '1em' }}>
    Main panels:</p>
<p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>
Under Title, Datas shows calculated optimisation of tour.
Title box also get selected nodes/edges chips. Clicking on them reveals their datas.
When some are selected, Focu and rearrange redraws a subGraph, ordered, whereas focus only just removes the other nodes/edges from the view.

On timeline, pressing Stop set timedelta to 1 year. Pressing next button iterates 1 year slices. Otherwise play/pause button can allow animation.

Charts has console output stats too, so use the inspector to reveal various Stats if need be.
</p>


    </CardText>

  </span>
)

export default PanelDescription
