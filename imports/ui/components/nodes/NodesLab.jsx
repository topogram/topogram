import React from 'react'

class NodesLab extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const nodesCount = this.props.nodes.length
    return (
      <p> {nodesCount} nodes </p>
    )
  }
}

NodesLab.propTypes = {
  nodes: React.PropTypes.array
}

NodesLab.defaultProps = {
  nodes : []
}

export default NodesLab
