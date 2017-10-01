import React from 'react'
import Snackbar from 'material-ui/Snackbar'

import { FormattedMessage, defineMessages } from 'react-intl'
import TopogramList from '/imports/client/ui/components/topograms/TopogramList.jsx'

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
  }

  static propTypes = {
    topograms: React.PropTypes.array.isRequired,
    loadTopograms: React.PropTypes.func.isRequired,
    stopTopogramsSubscription: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
  }


  promptSnackbar = (msg) => {
    this.setState({
      open: true,
      message: msg
    })
  }

  handleRequestClose = () =>{
    this.setState({
      open: false,
    })
  }

  componentDidMount() {
    this.props.loadTopograms()
  }

  componentWillUnmount() {
    this.props.stopTopogramsSubscription()
  }


  render() {
    return (
      <div>
        <HomeHeader />

        {/* <TopogramAddForm
          promptSnackbar={this.promptSnackbar}

          /> */}


        <TopogramList
          topograms={this.props.topograms}
          // title={<FormattedMessage {...messages.browseTopograms} />}
          title="Browse publics topograms"
          showFilters={false}
          router={this.props.router}
        />

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
