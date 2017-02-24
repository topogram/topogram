import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';
import { Topograms } from '/imports/api/collections';

export const TOPOGRAMS_PUBLIC_SUBSCRIPTION_READY = 'TOPOGRAMS_PUBLIC_SUBSCRIPTION_READY';
export const TOPOGRAMS_PUBLIC_SUBSCRIPTION_CHANGED = 'TOPOGRAMS_PUBLIC_SUBSCRIPTION_CHANGED';
export const TOPOGRAMS_PUBLIC_SUB = 'topograms.public';

export const loadHomeTopograms = () =>
  startSubscription({
    key: TOPOGRAMS_PUBLIC_SUB,
    subscribe: () => Meteor.subscribe(TOPOGRAMS_PUBLIC_SUB),
    get: () => Topograms.find().fetch(),
  });
