import {
  CONFIG_LOADING,
  CONFIG_LOADED
} from '../actions'

const initialState = {
  loading: false,
  ready: false,
  config: {}
}

export function config(state = initialState, action) {
  switch (action.type) {
  case CONFIG_LOADING:
    return {
      ...state,
      loading: true
    }
  case CONFIG_LOADED:
    return {
      ...state,
      ...action.payload,
      loading: false,
      ready: true
    }
  default:
    return state
  }
}
