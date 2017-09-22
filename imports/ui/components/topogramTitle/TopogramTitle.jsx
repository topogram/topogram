import React from 'react'

import {Card, CardTitle} from 'material-ui/Card';

const styleCard = {
  maxWidth: '30%',
  margin : '1em',
  position: 'absolute',
  right : '0'
}

class TopogramTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card style={styleCard}>
        <CardTitle
          title={this.props.topogramName}
          subtitle="Credits (cc)"
        />
      </Card>
    )
  }
}

TopogramTitle.propTypes = {
  topogramName : React.PropTypes.string
}

TopogramTitle.defaultProps = {
  topogramName : {}
}

export default TopogramTitle
