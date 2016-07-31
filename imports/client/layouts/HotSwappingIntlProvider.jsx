import React from 'react'
import { IntlProvider } from 'react-intl'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { messages } from '../../i18n.js'

const style = {
  maxWidth : '60px',
  position : 'fixed',
  bottom : '3vh',
  left : '3vh'
}

class HotSwappingIntlProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale : this.props.initialLocale,
      messages : this.props.initialMessages
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, index, value) {
    this.setState({ locale : value })
    this.setState({ messages : messages[value] })
  }

  render() {
    const menuItems = Object.keys(messages).map( l => {
      let abbr = l.split('-')[0]
      return (
        <MenuItem
          value={l}
          key={l}
          primaryText={abbr}
        />
      )
    })

    return (
      <div>
        <SelectField
          value={this.state.locale}
          onChange={this.handleChange}
          style={style}
        >
          {menuItems}
        </SelectField>
          <IntlProvider {...this.state}>
              {this.props.children}
          </IntlProvider>
      </div>
      )
  }
}

HotSwappingIntlProvider.propTypes = {
  initalLocale: React.PropTypes.oneOf(Object.keys(messages)),
  initialMessages: React.PropTypes.object
}

HotSwappingIntlProvider.defaultProps = {
  initialLocale: navigator.locale || 'en-US',
  initialMessages : messages['en-US']
}

export default HotSwappingIntlProvider
