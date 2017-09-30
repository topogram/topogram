import { Meteor } from 'meteor/meteor';
import { registerReactiveSource } from 'meteor-redux-middlewares';

export const USER_REACTIVE_SOURCE_CHANGED = 'USER_REACTIVE_SOURCE_CHANGED';

export const loadUser = () =>
  registerReactiveSource({
    key: 'user',
    get: () => Meteor.user() || {},
  });
