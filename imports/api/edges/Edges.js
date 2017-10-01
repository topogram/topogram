import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Topograms } from '../topograms/Topograms.js'

class EdgesCollection extends Mongo.Collection {

}

export const Edges = new EdgesCollection('edges')

// Deny all client-side updates since we will be using methods to manage this collection
Edges.deny({
  insert() { return true },
  update() { return true },
  remove() { return true }
})

Edges.schema = new SimpleSchema({
  _id : {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  topogramId : {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    label : 'The ID of the topogram the edge belongs to'
  },
  data: {
    type: Object,
    optional : true
  },
  'data.id': {
    type: String,
    label : 'The user-defined ID of the edge',
    optional: true,
    denyUpdate: true,
    autoValue() {
      return this.isInsert && !this.value ?  'edge-' + Math.round( Math.random() * 1000000 ) : this.value
    }
  },
  'data.source': {
    type: String,
    label: 'The source of the edge',
    // TODO validate the fact that the node exists in the db
  },
  'data.target': {
    type: String,
    label: 'The target of the edge',
    // TODO validate the fact that the node exists in the db
  },
  'data.name': {
    type: String,
    label: 'a name for the edge',
    optional : true
  },
  'data.starred' : {
    type : Boolean,
    label : 'check is the edge if starred',
    optional : true
  },
  'data.start' : {
    type : Date,
    label : 'Date when the edge started existing',
    optional : true
  },
  'data.end' : {
    type : Date,
    label : 'Date when the edge stopped existing',
    optional : true
  },
  'data.weight' : {
    type : Number,
    decimal: true,
    label : 'Weight of the edge in the graph',
    optional : true
  },
  'data.color' : {
    type : String,
    label : 'Color associated to the edge',
    optional : true
  },
  'data.group' : {
    type : String, // [String],
    label : 'Type or group of the edge',
    optional : true
  },
  'data.notes' : {
    type : String,
    label : 'An additional array of objects to store some more info about the edge',
    blackbox: true,
    optional : true
  },
  group : {
    type: String,
    defaultValue : 'edges'
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  updatedAt: {
    type: Date,
    label: 'Last time the node was updated',
    autoValue() { return new Date() }
  },
  createdAt: {
    type: Date,
    label: 'Time when the node was created',
    autoValue() {
      return this.isInsert ? new Date() : this.value
    }
  }
})

Edges.attachSchema(Edges.schema)

Edges.helpers({
  topogram() {
    return Topograms.findOne(this.topogramId)
  }
})
