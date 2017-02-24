import React from 'react'

import { Meteor } from 'meteor/meteor'
import Snackbar from 'material-ui/Snackbar'

import { FormattedMessage, defineMessages } from 'react-intl'

import TopogramList from '/imports/ui/components/topograms/TopogramList.jsx'
import TopogramAddForm from '/imports/ui/components/topograms/TopogramAddForm.jsx'

const messages = defineMessages({
  tagline : {
    'id': 'home.tagline',
    'defaultMessage': 'Social Network Analysis for humans.',
    'message': 'Social Network Analysis for humans.'
  },
  subtitle : {
    'id': 'home.subtitle',
    'defaultMessage': 'An open-source toolkit to process, visualize and analyze networks.',
    'message': 'An open-source toolkit to process, visualize and analyze networks.'
  },
  browseTopograms: {
    'id': 'home.browseTopograms',
    'defaultMessage': 'Browse publics topograms',
    'message': 'Browse publics topograms'
  }
})

const HomeHeader = () => (
  <section
    className="home-header"
  >
    <div>
      <h1>Topogram</h1>
      <h4>
        <FormattedMessage {...messages.tagline} />
      </h4>
      <p><FormattedMessage {...messages.subtitle} /></p>
    </div>
  </section>
)

// define and export our Welcome component
export class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: ''
    }
    this.promptSnackbar = this.promptSnackbar.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  promptSnackbar(msg) {
    this.setState({
      open: true,
      message: msg
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  componentDidMount() {
    this.props.loadTopograms()
  }

  render() {
    return (
      <div>
        <HomeHeader />

        <TopogramAddForm promptSnackbar={this.promptSnackbar} />

        <section className="home-public-list">
          <h5 className="grey-text text-lighten-2 center">
            <FormattedMessage {...messages.browseTopograms} />
          </h5>
          <TopogramList
            topograms={this.props.topograms}
            editable={false} />
        </section>

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
