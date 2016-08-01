import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Factory } from 'meteor/dburles:factory'
import faker from 'faker'

import { Nodes } from '../nodes/Nodes.js'

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
  name : {
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
    optional: true
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

Factory.define('topogram', Topograms, {
  createdAt: () => new Date(),
  name: () => "New Topogram",
  slug : () => faker.helpers.slugify("New Topogram"),
  description : () => faker.lorem.paragraph()
})

Topograms.helpers({
  nodes() {
    return Nodes.find({ topogramId : this._id }).fetch()
  },
  isPrivate() {
    return !!this.userId || !!this.sharedPublic
  },
  editableBy(userId) {
    if (!this.userId) return true
    return this.userId === userId;
  }
})
