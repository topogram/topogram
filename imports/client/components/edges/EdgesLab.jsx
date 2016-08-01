import React from 'react'

class EdgesLab extends React.Component  {
  constructor(props) {
    super(props)
  }

  render() {
    const edgesCount = this.props.edges.length
    return (
      <span>
        <p> {edgesCount} Edges </p>
      </span>
    )
  }
}


EdgesLab.propTypes = {
  edges: React.PropTypes.array
}

EdgesLab.defaultProps = {
  edges : []
}
export default EdgesLab
