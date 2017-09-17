import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';

import { Nodes, Edges, Topograms } from '/imports/api/collections';

export const TOPOGRAMS_PUBLIC_SUBSCRIPTION_READY = 'TOPOGRAMS_PUBLIC_SUBSCRIPTION_READY';
export const TOPOGRAMS_PUBLIC_SUBSCRIPTION_CHANGED = 'TOPOGRAMS_PUBLIC_SUBSCRIPTION_CHANGED';
export const TOPOGRAMS_PUBLIC_SUB = 'topograms.public';

export const loadHomeTopograms = () =>
  startSubscription({
    key: TOPOGRAMS_PUBLIC_SUB,
    subscribe: () => Meteor.subscribe(TOPOGRAMS_PUBLIC_SUB),
    get: () => {
      let topograms = Topograms.find().fetch()
      let topogramIds = topograms.map( d => d._id)
      return topograms
    },
  });
