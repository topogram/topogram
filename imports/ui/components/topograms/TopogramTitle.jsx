import React from 'react'
import {composeWithTracker} from 'react-komposer'
import { Topograms } from '../../../api/collections.js'

const TopogramTitle = ({topogramName}) => (
  <h1 className="grid-pad">
    { topogramName }
  </h1>
)

export default TopogramTitle
