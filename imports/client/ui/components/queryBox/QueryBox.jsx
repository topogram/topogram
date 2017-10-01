import React, { PropTypes } from 'react'
// import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'

import { defineMessages, injectIntl } from 'react-intl'

const messages = defineMessages({
  hint : {
    'id': 'queryBox.hint',
    'defaultMessage': 'Search for a node',
    'message': ''
  },
  label : {
    'id': 'queryBox.label',
    'defaultMessage': 'Topogram query',
    'message': ''
  }
})


class QueryBox extends React.Component {

  constructor(props) {
    super(props)
    const dataSource = this.props.nodes.map( n => ({ value : n._id, text : n.data.name }))
    this.state = {
      dataSource,
      currentValue : null
    }
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
  }

  // handleNewRequest(chosenRequest, index) {
  //   console.log(chosenRequest, index)
  // }
  //
  // handleUpdateInput(searchText, dataSource) {
  //   console.log(this.state.currentValue);
  // }

  render() {
    const { formatMessage } = this.props.intl
    return (
      <AutoComplete
        ref="queryBox"
        filter={AutoComplete.fuzzyFilter}
        dataSource={this.state.dataSource}
        maxSearchResults={7}
        fullWidth={true}
        style={this.props.style}
        hintText={formatMessage(messages.hint)}
        //floatingLabelText={formatMessage(messages.label)}
        // onNewRequest={this.handleNewRequest}
        // onUpdateInput={this.handleUpdateInput}
      />

    )
  }
}

QueryBox.propTypes = {
  promptSnackbar: PropTypes.func,
  topogram : PropTypes.object,
  nodes : PropTypes.array,
  edges : PropTypes.array,
  style : PropTypes.object,
  intl : PropTypes.shape({
    formatMessage : PropTypes.func
  })
}

QueryBox.defaultProps = {
  topogram : {},
  nodes : [],
  edges : []
}

export default injectIntl(QueryBox)
