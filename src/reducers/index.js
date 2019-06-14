import { combineReducers } from 'redux'
import { nodes } from './nodes'
import { edges } from './edges'
import { ui } from './ui'
import { config } from './config'

const rootReducer = combineReducers({
  config,
  nodes,
  edges,
  ui
})

export default rootReducer
