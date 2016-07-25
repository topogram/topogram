import React from 'react'

import TopogramAddForm from '../components/topograms/TopogramAddForm.jsx'
import TopogramPublicList from '../components/topograms/TopogramPublicList.jsx'
import HomeHeader from '../components/home/HomeHeader.jsx'

// define and export our Welcome component
export const Welcome = ({name}) => (
    <div>
      <HomeHeader />
      <TopogramAddForm />
      <h5 className='grey-text text-lighten-2 center'>Browse existing topograms</h5>
      <TopogramPublicList />
    </div>
)
