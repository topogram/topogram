import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares'

import {
  TOPOGRAMS_PUBLIC_SUBSCRIPTION_READY,
  TOPOGRAMS_PUBLIC_SUBSCRIPTION_CHANGED,
  TOPOGRAMS_PUBLIC_SUB,
} from '/imports/client/actions/topograms'

const initialState = {
  ready: false,
  topograms: [],
  topogramsSubscriptionStopped: false,
}


export function topogramsPublic(state = initialState, action) {
  switch (action.type) {
  case TOPOGRAMS_PUBLIC_SUBSCRIPTION_READY:
    return {
      ...state,
      ready: action.payload.ready,
      topogramsSubscriptionStopped: false,
    }
  case TOPOGRAMS_PUBLIC_SUBSCRIPTION_CHANGED:
    return {
      ...state,
      topograms: action.payload,
    }
  case STOP_SUBSCRIPTION:
    return action.payload === TOPOGRAMS_PUBLIC_SUB
      ? { ...state, topogramsSubscriptionStopped: true }
      : state
  default:
    return state
  }
}
