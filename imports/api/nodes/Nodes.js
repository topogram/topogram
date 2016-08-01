import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Factory } from 'meteor/dburles:factory'
import faker from 'faker'

import { Topograms } from '../topograms/Topograms.js'

class NodesCollection extends Mongo.Collection {


}

export const Nodes = new NodesCollection('nodes')

// Deny all client-side updates since we will be using methods to manage this collection
Nodes.deny({
  insert() { return true },
  update() { return true },
  remove() { return true }
})

Nodes.schema = new SimpleSchema({
  _id : {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  topogramId : {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    label : 'The ID of the topogram the node belongs to'
  },
  'data.id': {
    type: String,
    label : 'id used by cytoscape',
  },
  'data.name': {
    type: String,
    label: 'a name for the node',
    optional : true
  },
  'data.starred' : {
    type : Boolean,
    label : 'check is the node if starred',
    optional : true
  },
  'data.start' : {
    type : Date,
    label : 'Date when the node started existing',
    optional : true
  },
  'data.end' : {
    type : Date,
    label : 'Date when the node stopped existing',
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
    label : 'Weight of the node in the graph',
    optional : true
  },
  'data.color' : {
    type : String,
    label : 'Color associated to the node',
    optional : true
  },
  'data.group' : {
    type : String, // [String],
    label : 'Types or groups of the node',
    optional : true
  },
  'data.additionalInfo' : {
    type : [Object],
    label : 'An additional array of objects to store some more info about the node',
    blackbox: true,
    optional : true
  },
  group : {
    type: String,
    defaultValue : 'nodes'
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
    label: 'Time when the node was created'
  }
})

Nodes.attachSchema(Nodes.schema)

Factory.define('node', Nodes, {
  createdAt: () => new Date(),
  topogramId: Factory.get('topogram'),
  data : {
    id : () => faker.random.uuid(),
    name: () => faker.lorem.sentence(),
    lat : () => faker.address.latitude(),
    lon : () => faker.address.longitude(),
    start : () => faker.date.past(),
    end : () => faker.date.future(),
    group : () => faker.hacker.noun(),
    weight : () => faker.random.number()
  }
})

Nodes.helpers({
  topogram() {
    return Topograms.findOne(this.topogramId)
  }
})
