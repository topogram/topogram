import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares'

import {
  TOPOGRAM_SUBSCRIPTION_READY,
  TOPOGRAM_SUBSCRIPTION_CHANGED,
  TOPOGRAM_SINGLE_SUB,
} from '/imports/client/actions/topogram'

const initialState = {
  ready: false,
  topogram: {},
  topogramSubscriptionStopped: false,
}


export function topogram(state = initialState, action) {
  switch (action.type) {
  case TOPOGRAM_SUBSCRIPTION_READY:
    return {
      ...state,
      ready: action.payload.ready,
      topogramSubscriptionStopped: false,
    }
  case TOPOGRAM_SUBSCRIPTION_CHANGED:
    // let topogram = action.payload.length ? action.payload[0] : {}
    // console.log(topogram);
    return {
      ...state,
      topogram : action.payload,
    }
  case STOP_SUBSCRIPTION:
    return action.payload === TOPOGRAM_SINGLE_SUB
      ? { ...state, topogramSubscriptionStopped: true }
      : state
  default:
    return state
  }
}
