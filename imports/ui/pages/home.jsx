import Meteor from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom';
import { Topograms } from '../../api/collections.js'

import TopogramAddForm from './topograms/topograms-add.jsx'
import TopogramPublicList from './home/TopogramPublicList.jsx'
import HomeHeader from './home/HomeHeader.jsx'

// define and export our Welcome component
export const Welcome = ({name}) => (
    <div>
      <HomeHeader />
      <TopogramAddForm />
      <h5 className='gray-text'>Browse existing topograms</h5> 
      <TopogramPublicList />
    </div>
)
