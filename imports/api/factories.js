import faker from 'faker'
import { Factory } from 'meteor/dburles:factory'

import { Topograms } from './topograms/Topograms.js'
import { Nodes } from './nodes/Nodes.js'

Factory.define('topogram', Topograms, {
  createdAt: () => new Date(),
  name: () => 'New Topogram',
  slug : () => faker.helpers.slugify('New Topogram'),
  description : () => faker.lorem.paragraph()
})

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
