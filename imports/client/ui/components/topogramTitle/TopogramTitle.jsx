import React from 'react'
import ui from 'redux-ui'
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styleCard = {
  maxWidth: '30%',
  margin : '1em',
  position: 'absolute',
  right : '0'
}

@ui()
class TopogramTitle extends React.Component {
  static propTypes = {
    topogramName : React.PropTypes.string,
    ui: React.PropTypes.object,
    updateUI: React.PropTypes.func
  }

  constructor(props) {
    super(props)
  }

  onFilterButtonClick() {
    this.props.updateUI('filterPanelIsOpen', !this.props.ui.filterPanelIsOpen)
  }

  render() {
    return (
      <Card style={styleCard}>
        <CardTitle
          title={this.props.topogramName}
          subtitle="Credits (cc)"
        />
        <CardActions>
          <FlatButton
            label="Filters"
            onClick={() => this.onFilterButtonClick()}
          />
        </CardActions>
      </Card>
    )
  }
}

export default TopogramTitle
