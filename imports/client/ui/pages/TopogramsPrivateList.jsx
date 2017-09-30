import React from 'react'

import TopogramList from '/imports/client/ui/components/topograms/TopogramList.jsx'
import TopogramAddForm from '/imports/client/ui/components/topograms/TopogramAddForm.jsx'

// define and export our Welcome component
export default class TopogramsPrivateList extends React.Component {

  componentDidMount() {
    this.props.loadPrivateTopograms()
  }

  componentWillUnmount() {
    this.props.stopTopogramsSubscription()
  }

  render() {
    return (
      <div>
        <TopogramAddForm
          promptSnackbar={this.promptSnackbar}
          router={this.props.router}
          />
        <TopogramList
          topograms={this.props.topograms}
          router={this.props.router}
          title="My Topograms"
          showFilters={false}
          />
      </div>
    )
  }
}
