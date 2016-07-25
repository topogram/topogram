import React from 'react'

import TopogramAddForm from '../components/topograms/TopogramAddForm.jsx'
import TopogramPrivateList from '../components/topograms/TopogramPrivateList.jsx'

// define and export our Welcome component
const Topograms = () => (
    <div>
      <TopogramAddForm />
      <h5 className="grey-text text-lighten-2 center">Browse existing topograms</h5>
      <TopogramPrivateList />
    </div>
)

export default Topograms 
