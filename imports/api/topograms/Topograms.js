import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Nodes } from '../nodes/Nodes.js'
import { Meteor } from 'meteor/meteor'
const Users = Meteor.users  // alias Users : handle by Meteor.users

class TopogramsCollection extends Mongo.Collection {

}

export const Topograms = new TopogramsCollection('topograms')

// Deny all client-side updates since we will be using methods to manage this collection
Topograms.deny({
  insert() { return true },
  update() { return true },
  remove() { return true }
})

Topograms.schema = new SimpleSchema({
  _id : {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  title : {
    type: String,
    label: 'The name of the topogram',
    optional: false
  },
  slug : {
    type: String,
    label: 'Safe name of the topograms without blank spaces and special characters'
  },
  sharedPublic : {
    type: Boolean,
    label : 'Indicates if a topogram is visible by anonymous users',
    defaultValue: false
  },
  description : {
    type: String,
    label: 'A description of what the topogram is about',
    optional: true
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  createdAt: {
    type: Date,
    label: 'Time when the node was created'
  }

})

Topograms.attachSchema(Topograms.schema)

Topograms.helpers({
  nodes() {
    return Nodes.find({ topogramId : this._id }).fetch()
  },
  isPrivate() {
    return !!this.userId || !!this.sharedPublic
  },
  author() {
    return !this.userId ?
      {}
        :
      Users.findOne(
        {_id : this.userId}, { fields: { createdAt :1 } }
      )
  },
  editableBy(userId) {
    if (!this.userId) return true
    return this.userId === userId
  }
})
