import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import { defineMessages, injectIntl } from 'react-intl'

import AutoComplete from 'material-ui/AutoComplete'

const messages = defineMessages({
  hint : {
    'id': 'queryBox.hint',
    'defaultMessage': 'Search for a node',
    'message': ''
  },
  label : {
    'id': 'queryBox.label',
    'defaultMessage': 'Nodes search',
    'message': ''
  }
})

@ui()
class QueryBox extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentValue : null
    }
  }

  handleNewRequest = (chosenRequest, index) => {
    console.log(chosenRequest, index)
    // selectElement
  }

  render() {
    const { formatMessage } = this.props.intl

    const dataSource = this.props.nodes.map( n => (
      { value : n.data.id, text : n.data.name }
    ))

    return (
      <AutoComplete
        ref="queryBox"
        filter={AutoComplete.fuzzyFilter}
        dataSource={dataSource}
        maxSearchResults={7}
        fullWidth={true}
        style={this.props.style}
        menuProps={{desktop:true}}
        hintText={formatMessage(messages.hint)}
        floatingLabelText={formatMessage(messages.label)}
        onNewRequest={this.handleNewRequest}
        // onUpdateInput={this.handleUpdateInput}
      />

    )
  }
}

QueryBox.propTypes = {
  // promptSnackbar: PropTypes.func,
  // topogram : PropTypes.object,
  nodes : PropTypes.array,
  // edges : PropTypes.array,
  // style : PropTypes.object,
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
