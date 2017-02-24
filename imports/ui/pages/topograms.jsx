import React from 'react'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import { Topograms } from '../api/collections.js'
import TopogramList from '../client/components/topograms/TopogramList.jsx'
import TopogramAddForm from '../client/components/topograms/TopogramAddForm.jsx'


function composer(props, onData) {
  const handle = Meteor.subscribe('topograms.private')
  if (handle.ready()) {
    const topograms = Topograms.find({ }, { 'sort': {  'createdAt': -1 } }).fetch()
    onData(null, { topograms }) // args: err, topograms, editable
  }
}

const TopogramPrivateList = composeWithTracker(composer)(TopogramList)

// define and export our Welcome component
const TopogramsPage = () => (
    <div>
      <TopogramAddForm />
      <h5 className="grey-text text-lighten-2 center">Browse your topograms</h5>
      <TopogramPrivateList editable={true} />
    </div>
)

export default TopogramsPage
