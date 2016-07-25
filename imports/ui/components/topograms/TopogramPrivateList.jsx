import { composeWithTracker } from 'react-komposer'
import TopogramList from './TopogramList.jsx'
import { Topograms } from '../../../api/collections.js'
import { Meteor } from 'meteor/meteor'

function composer(props, onData) {
  const handle = Meteor.subscribe('topograms.private')
  if (handle.ready()) {
    const topograms = Topograms.find({ }, { 'sort': {  'createdAt': -1 } }).fetch()
    onData(null, { topograms }) // args: err, topograms, editable
  }
}

export default composeWithTracker(composer)(TopogramList)
