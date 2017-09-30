import React from 'react'


import Toggle from 'material-ui/Toggle';
import SubHeader from 'material-ui/Subheader';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import TopogramListItem from './TopogramListItem.jsx'

export default class TopogramList extends React.Component {

  constructor(props) {
    super(props)
    this.state = { anonymousOnly : false }
  }

  handleOnToggle = () => {
    this.setState({anonymousOnly : !this.state.anonymousOnly})
  }

  render() {

    const {anonymousOnly} = this.state
    const {showFilters, title, topograms} = this.props

    const topogramItems = topograms
      .filter(d => anonymousOnly ? d.userId === null : true)
      .sort( (a, b) => b.createdAt - a.createdAt)
      .map( ( topogram, i ) => (
        <TopogramListItem
          key={ topogram._id }
          title={ topogram.name }
          topogramId={ topogram._id }
          lastModified={ topogram.createdAt }
        />
      ))

    return (
      <section
        className="home-public-list"
        style={{width : '80vw', margin : '0 auto 1em auto'}}
        >
        <SubHeader>{title}</SubHeader>
        {
          showFilters ?
          <div style={{maxWidth: 250, paddingBottom : '1em'}}>
            <Toggle
              label="Show only anonymous"
              toggled={anonymousOnly}
              onToggle={this.handleOnToggle}
            />
          </div>
          :
          null
        }
        {
          topogramItems.length ?
          <GridList
            cellHeight={180}
            cols={3}
            >
            {topogramItems}
          </GridList>
          :
          <p>No topograms yet!</p>
        }
      </section>
    )
  }
}
