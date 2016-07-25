import React from 'react'
import TopogramListItem from './TopogramListItem.jsx'

const renderIfData = ( topograms ) => {
  if ( topograms && topograms.length > 0 ) {
    return topograms.map( ( topogram ) => {
      return <TopogramListItem
        key={ topogram._id }
        title={ topogram.name }
        _id={ topogram._id }
        date={ topogram.createdAt }
        classNames="col-1-4"
        />
    });
  } else {
    return <p>No topograms yet!</p>;
  }
};

const TopogramList = ({topograms}) => (
  <div className="grid-pad">
    { renderIfData( topograms ) }
  </div>
);

export default TopogramList
