import { Topograms } from '/imports/api/collections.js'
import {
  topogramCreate,
  topogramDelete,
  topogramTogglePublic
} from '/imports/api/topograms/topogramsMethods.js'

export const getTopograms = () =>
  Topograms.find().fetch()

export const createTopogram = (name) =>
  topogramCreate.call({ name })

export const togglePublicTopogram = (name) =>
  topogramCreate.call({ name })
