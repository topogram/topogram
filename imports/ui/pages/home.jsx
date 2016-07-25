import React from 'react'

import TopogramAddForm from '../react/topograms/TopogramAddForm.jsx'
import TopogramPublicList from '../react/topograms/TopogramPublicList.jsx'
import HomeHeader from '../react/home/HomeHeader.jsx'

// define and export our Welcome component
export const Welcome = ({name}) => (
    <div>
      <HomeHeader />
      <TopogramAddForm />
      <h5 className='grey-text text-lighten-2 center'>Browse existing topograms</h5>
      <TopogramPublicList />
    </div>
)
