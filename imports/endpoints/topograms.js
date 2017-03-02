import { Topograms } from '/imports/api/collections.js'
import {
  topogramCreate,
  topogramDelete
} from '/imports/api/topograms/topogramsMethods.js'

export const getTopograms = () =>
  Topograms.find().fetch()


export const createTopogram = (name) =>
  topogramCreate.call({ name })
