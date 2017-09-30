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

        <section className="home-private-list">
          {/* <h5 className="grey-text text-lighten-2 center">
            <FormattedMessage {...messages.browseTopograms} />
          </h5> */}
          <TopogramList
            topograms={this.props.topograms}
            editable={false} />
        </section>
      </div>
    )
  }
}
