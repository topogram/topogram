import React from 'react'
import { Card, CardHeader } from 'material-ui/Card'

import CardBody from './CardBody.jsx'


class SideNavItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Without Avatar"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardBody expandable={true}>
          {this.props.children}
        </CardBody>
      </Card>
    )
  }
}

SideNavItem.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node
}


export default SideNavItem
