import React from 'react'

import TopBar from '../components/topBar/TopBar.jsx'

const TopogramPage = ({ topogramId }) => (
  <p>
    <TopBar />
    Hello { topogramId }
  </p>
)

export default TopogramPage
