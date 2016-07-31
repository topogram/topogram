import React from 'react'
import { Card, CardTitle, CardText, CardActions, FlatButton } from 'material-ui'


const ImportForm = React.createClass({
  render() {
    return (
      <Card>
        <CardTitle
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
        <form id="dataMappingImport" onSubmit={this.props.handleSubmit}>
        <CardText>
          {this.props.children}
        </CardText>
        <CardActions>
          <FlatButton type="submit" label="Create"/>
        </CardActions>
      </form>
    </Card>
    )
  }
})

export default ImportForm
