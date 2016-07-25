import React from 'react'

var headerStyle = {
  textAlign : 'center',
  marginTop : '2em'
}

const HomeHeader = ({name}) => (
  <section className="home-header" style={headerStyle}>
      <h1>Topogram</h1>
      <h4>Social network analysis for Humans</h4>
      <p>An open-source toolkit to process, visualize and analyze networks.</p>
  </section>
)

export default HomeHeader
