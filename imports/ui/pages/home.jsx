import React from 'react'

import HomeHeader from '../components/home/HomeHeader.jsx'
import TopogramAddForm from '../components/topograms/TopogramAddForm.jsx'
import TopogramPublicList from '../components/topograms/TopogramPublicList.jsx'

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
