import React from 'react'
import Snackbar from 'material-ui/Snackbar'

import { FormattedMessage, defineMessages } from 'react-intl'

import TopogramsLayout from './TopogramsLayout.jsx'

import TopogramList from '/imports/client/ui/components/topograms/TopogramList.jsx'
import CardText from 'material-ui/Card'

import '../../../css/video-react.css'

import { Player } from 'video-react';


const messages = defineMessages({
  tagline : {
    'id': 'home.tagline',
    'defaultMessage': 'Let\'s Visualize How Bands Tour! (ßversion)',
    'message': 'Let\'s Visualize How Bands Tour!(ßversion)'
  },
  subtitle : {
    'id': 'home.subtitle',
    'defaultMessage': 'An open-source dataviz project by Gregory Bahde',
    'message': 'An open-source toolkit to process, visualize and analyze the music networks by Gregory Bahde (GPL licence applies, research use only), explanations about the project below'
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
      <h1>Bands Tour</h1>

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

    const {
      user,
      router,
      topograms
    } = this.props

    return (
      <TopogramsLayout
        user={user}
        router={router}
        >
        <HomeHeader />

        {/* <TopogramAddForm
          promptSnackbar={this.promptSnackbar}

          /> */}

          <section
            className="home-maplist"
          >
        <TopogramList
          topograms={topograms}
          // title={<FormattedMessage {...messages.browseTopograms} />}
          title="Browse publics topograms"
          showFilters={false}
          router={router}

        />

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
    </section>
    <section
      className="home-explainer"
    >



  <p style={{ color: '#aa8dc6',fontSize : '12pt',fontWeight: 'bold', lineHeight : '1em' }}>
    How to use Bandstour?</p>
  <p style={{ color: '#aa8dc6',fontSize : '8pt', lineHeight : '1em' }}>
      SidePanels:</p>

  <p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>
    Network and Map embed controls allo for finer tuning of the views than mouse controls, try it and you will see for yourself!.</p>

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
<p style={{ color: '#aa8dc6',fontSize : '12pt', lineHeight : '1em' }}>
    Main panels:</p>
<p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>
Under Title, Datas shows calculated optimisation of tour.
Title box also get selected nodes/edges chips. Clicking on them reveals their datas.
When some are selected, Focu and rearrange redraws a subGraph, ordered, whereas focus only just removes the other nodes/edges from the view.

On timeline, pressing Stop set timedelta to 1 year. Pressing next button iterates 1 year slices. Otherwise play/pause button can allow animation.

Charts has console output stats too, so use the inspector to reveal various Stats if need be.
</p>
  <p style={{ color: '#aa8dc6',fontSize : '12pt',fontWeight: 'bold', lineHeight : '1em' }}>
    The How and the Why of Bandstour?</p>
<p style={{ color: '#F2EFE9',fontSize : '8pt', lineHeight : '1em' }}>
Music is an ensemble, there are more than one aspects to it. There is an entertainement part to it, and a "troubadour/minstrel" part to it.
When touring, bands show which side they serve. Of course it is tendencial.
After having toured for ten years, I got this idea that there where better ways of touring than others, more respectful toward the environnement than others, less money driven than others.
I wanted to illustrate the discrepancies in terms of tours.
Basically , the best way to tour is by instinct, not money driven. It relates to the Salesman problem and Djikstra mathemathically, but any human being can actually do better than computers regarding this.
This is and example of when our intelligence is superior to machines. AI might turn it on par to humans, but really why would we run machines that consume lots of energy to instead of just relying on our brains is a question that makes me wonder every days regarding those problems.
Video below shows the evolution of the sector over the 10 years between 2007 and 2017.
</p>


    </section>
<div>
<p style={{ color: '#aa8dc6',fontSize : '38pt', lineHeight : '1em' }}>
   Evolution of the music tours sold on internet between 2007 and 2017</p>
    <link rel="stylesheet" href="/css/video-react.css" />
    <Player
      playsInline
      poster="evolution_poster.png"
      src="DaybyDayALLBANDS.mp4"
    />
</div>



<div>
<p style={{ color: '#aa8dc6',fontSize : '38pt', lineHeight : '1em' }}>
   Clustered tour profiles</p>
   <p style={{ color: '#aa8dc6',fontSize : '8pt', lineHeight : '1em' }}>
   Shows clusters of tours that are similar according to 15 centroids using UMAP.
   </p>
    <link rel="stylesheet" href="/css/video-react.css" />
    <Player
      playsInline
      poster="cluster_poster.png"
      src="CLSTD_MAPS_4500_Wmap_35clstrs_WMKD.mp4"
    />
</div>

      </TopogramsLayout>
    )





  }
}
