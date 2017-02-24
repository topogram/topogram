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
      <Card
        initiallyExpanded={this.props.initiallyExpanded}
        >
        <CardHeader
          title={this.props.title}
          subtitle={this.props.subtitle}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardBody
          expandable={true}
          >
          {this.props.children}
        </CardBody>
      </Card>
    )
  }
}

SideNavItem.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  initiallyExpanded: React.PropTypes.bool
}

SideNavItem.defaultProps = {
  title: 'Title',
  subtitle: '',
  initiallyExpanded: false
}


export default SideNavItem
