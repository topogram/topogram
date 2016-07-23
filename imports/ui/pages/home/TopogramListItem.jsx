import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { FlowRouter } from 'meteor/kadira:flow-router'

const convertDate = (date) => {
  if( typeof(date) == "string" ) return
}

const TopogramListItem = React.createClass({
  getDefaultProps() {
   return {
    title : "",
    _id : "",
    date: new Date()
   }
  },
  _onClickItem (e) { FlowRouter.go('topograms/'+this.props._id) },
  render() {
    console.log(this)
    console.log("this.props: ", this.props.date)

    let parsedDate = (this.props.date) ?  "this.props.date" : ""

    return (
    <div className="col s3">
     <Card>
      <CardHeader
        title={this.props.title}
        subtitle={parsedDate}
        onClick={this._onClickItem}
      />
     </Card>
    </div>
  )}
})

export default TopogramListItem
