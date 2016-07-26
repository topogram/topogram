import React from 'react'

import TopogramAddForm from '../components/topograms/TopogramAddForm.jsx'
import TopogramPrivateList from '../components/topograms/TopogramPrivateList.jsx'

// define and export our Welcome component
const TopogramsPage = () => (
    <div>
      <TopogramAddForm />
      <h5 className="grey-text text-lighten-2 center">Browse your topograms</h5>
      <TopogramPrivateList editable={true} />
    </div>
)

export default TopogramsPage
