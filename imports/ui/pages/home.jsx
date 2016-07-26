import React from 'react'
import { composeWithTracker } from 'react-komposer'
import { Topograms } from '../../api/collections.js'
import { Meteor } from 'meteor/meteor'

import TopogramList from '../components/topograms/TopogramList.jsx'
import TopogramAddForm from '../components/topograms/TopogramAddForm.jsx'

const headerStyle = {
  textAlign : 'center',
  marginTop : '2em'
}

const HomeHeader = () => (
  <section
    className="home-header"
    style={headerStyle}
  >
    <h1>Topogram</h1>
    <h4>Social network analysis for Humans</h4>
    <p>An open-source toolkit to process, visualize and analyze networks.</p>
  </section>
)

function composer(props, onData) {
  const handle = Meteor.subscribe('topograms.public')
  if (handle.ready()) {
    const topograms = Topograms.find({ 'sharedPublic': true }, { 'sort': {  'createdAt': 1 } }).fetch()
    onData(null, { topograms })
  }
}

const TopogramPublicList = composeWithTracker(composer)(TopogramList)

// define and export our Welcome component
const Welcome = () => (
    <div>
      <HomeHeader />
      <hr />
      <TopogramAddForm />
      <hr />
      <h5 className="grey-text text-lighten-2 center">Browse existing topograms</h5>
      <TopogramPublicList editable={false} />
    </div>
)

export default Welcome
