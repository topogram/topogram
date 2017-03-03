import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';
import { Topograms } from '/imports/api/collections';

export const TOPOGRAM_SUBSCRIPTION_READY = 'TOPOGRAM_SUBSCRIPTION_READY';
export const TOPOGRAM_SUBSCRIPTION_CHANGED = 'TOPOGRAM_SUBSCRIPTION_CHANGED';
export const TOPOGRAM_SUB = 'topogram';

export const loadTopogram = (topogramId) =>
  startSubscription({
    key: TOPOGRAM_SUB,
    subscribe: () => Meteor.subscribe(TOPOGRAM_SUB, topogramId),
    get: () => Topograms.findOne()
  });
