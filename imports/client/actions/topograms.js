import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';
import { Topograms } from '/imports/api/collections';

export const TOPOGRAMS_SUBSCRIPTION_READY = 'TOPOGRAMS_SUBSCRIPTION_READY';
export const TOPOGRAMS_SUBSCRIPTION_CHANGED = 'TOPOGRAMS_SUBSCRIPTION_CHANGED';
export const TOPOGRAMS_SUB = 'topograms.public';

export const loadHomeTopograms = () =>
  startSubscription({
    key: TOPOGRAMS_SUB,
    subscribe: () => Meteor.subscribe(TOPOGRAMS_SUB),
    get: () => Topograms.find().fetch(),
  });
