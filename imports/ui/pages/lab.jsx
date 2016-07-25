import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'

import TopogramTitle from '../components/topograms/TopogramTitle.jsx'
import NodesLab from '../components/lab/NodesLab.jsx'
import EdgesLab from '../components/lab/EdgesLab.jsx'

const LabPage = React.createClass({
  render() {
    console.log(this.props)
    console.log(this.props.topogramId)
    return (
      <div>
        <TopogramTitle topogramId={this.props.topogramId} />
        <Tabs>
          <Tab label="Nodes" >
            <NodesLab />
          </Tab>
          <Tab label="Edges" >
            <EdgesLab />
          </Tab>
        </Tabs>
      </div>

    )
  }
})

export default LabPage
