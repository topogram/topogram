import {composeWithTracker} from 'react-komposer'
import TopogramList from './TopogramList.jsx'
import { Topograms } from '../../../api/collections.js'

function composer(props, onData) {
  const handle = Meteor.subscribe('topograms.public')
  if (handle.ready()) {
    const topograms = Topograms.find({ 'sharedPublic': 1 }, { 'sort': {  'createdAt': 1 } }).fetch()
    console.log(topograms)
    onData(null, {topograms})
  }
}


export default composeWithTracker(composer)(TopogramList)
