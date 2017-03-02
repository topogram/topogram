import { Topograms } from '/imports/api/collections.js'
import {
  topogramCreate,
  topogramDelete
} from '/imports/api/topograms/topogramsMethods.js'

export const getTopograms = function() {
  return Topograms.find().fetch()
}

export const createTopogram = function({ name}) {
  return topogramCreate.call({ name })
}
