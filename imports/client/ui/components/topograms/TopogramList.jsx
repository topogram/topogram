import React from 'react'
import TopogramListItem from '/imports/client/ui/components/topograms/TopogramListItem.jsx'

const renderIfData = ( props ) => {
  if ( props.topograms && props.topograms.length > 0 ) {
    return props.topograms
      .sort( (a, b) => b.createdAt - a.createdAt)
      .map( ( topogram ) =>
        (
          <TopogramListItem
            key={ topogram._id }
            title={ topogram.name }
            _id={ topogram._id }
            date={ topogram.createdAt }
            classNames="col-1-4"
            editable={ props.editable }
          />
        )
      )
  }
  else {
    return <p>No topograms yet!</p>
  }
}

class TopogramList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="grid-pad">
        { renderIfData( this.props ) }
      </div>
    )
  }
}

export default TopogramList
