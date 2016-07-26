import React from 'react'

import TopBar from '../components/topBar/TopBar.jsx'
import SideNav from '../components/sideNav/SideNav.jsx'

const TopogramPage = ({ topogramId }) => (
  <div>
    <TopBar />
    <SideNav />
    <p>
      Hello { topogramId }
    </p>
  </div>
)

export default TopogramPage
