import React from 'react'
import InlineEditField from '../inlineEdit/InlineEditField.jsx'

const styles = {
  toolBarTitle : {
    lineHeight : '1em',
    fontSize: '1.4em',
    paddingTop : '.5em',
    overflow : 'ellipsis',
    position : 'fixed',
    bottom : '1em',
    right : '2em',
    whiteSpace: 'nowrap'
  }
}

class TopogramTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1 style={styles.toolBarTitle}>
        <InlineEditField
          defaultValue={this.props.topogram.name}
          _id={this.props.topogram._id}
          collection="topograms"
          field="name"
          promptSnackbar={this.props.promptSnackbar}
        />
      </h1>
    )
  }
}

TopogramTitle.propTypes = {
  topogram : React.PropTypes.object,
  promptSnackbar : React.PropTypes.func
}

TopogramTitle.defaultProps = {
  topogram : {}
}

export default TopogramTitle
