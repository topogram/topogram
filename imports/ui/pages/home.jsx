import React from 'react'

import TopogramAddForm from '../components/topograms/TopogramAddForm.jsx'
import TopogramPublicList from '../components/topograms/TopogramPublicList.jsx'

let headerStyle = {
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
