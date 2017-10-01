import { Topograms } from '/imports/api/collections.js'
import {
  topogramCreate,
  // topogramDelete,
  topogramTogglePublic
} from '/imports/api/topograms/topogramsMethods.js'

export const getTopograms = () =>
  Topograms.find().fetch()

export const createTopogram = (data) =>
  topogramCreate.call(data)

export const togglePublicTopogram = (name) =>
  topogramTogglePublic.call({ name })
