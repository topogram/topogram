import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

import {
  USER_REACTIVE_SOURCE_CHANGED
} from '/imports/client/actions/user';

const initialState = {
  ready: false,
};

export function user(state = initialState, action) {
  switch (action.type) {
    case USER_REACTIVE_SOURCE_CHANGED:
      const isLoggedIn = action.payload._id ? true : false
      return {
        ...action.payload,
        isLoggedIn,
        ready: true
      };
    default:
      return state;
  }
}
