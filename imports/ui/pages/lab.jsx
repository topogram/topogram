import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

import TopogramTitle from '../react/topograms/TopogramTitle.jsx'

import DataTable from '../react/dataTable/DataTable.jsx'
import NodesLab from '../react/lab/NodesLab.jsx'

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
            <DataTable table="Edges" class="table table-striped table-bordered table-condensed"/>
          </Tab>
        </Tabs>
      </div>

    )
  }
})

export default LabPage
