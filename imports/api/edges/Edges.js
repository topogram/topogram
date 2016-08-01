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
  'data.id': {
    type: String,
    label : 'an id for the edge',
  },
  'data.source': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The source of the edge',
    optional : true
  },
  'data.target': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'The target of the edge',
    optional : true
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
  'data.lat' : {
    type : Number,
    decimal: true,
    label : 'latitude',
    optional : true
  },
  'data.lng' : {
    type : Number,
    decimal: true,
    label : 'longitude',
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
  'data.additionalInfo' : {
    type : [Object],
    label : 'An additional array of objects to store some more info about the edge',
    blackbox: true,
    optional : true
  },
  group : {
    type: String,
    defaultValue : 'edges'
  },
  'position.x' :  {
    type : Number
  },
  'position.y' : {
    type : Number
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  createdAt: {
    type: Date,
    label: 'Time when the edge was created'
  }
})

Edges.attachSchema(Edges.schema)

Edges.helpers({
  topogram() {
    return Topograms.findOne(this.topogramId)
  }
})
