import React from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import ui from 'redux-ui'
import CardBody from './CardBody.jsx'

@ui()
class SideNavItem extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.node,
    initiallyExpanded: React.PropTypes.bool
  }

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

export default SideNavItem
