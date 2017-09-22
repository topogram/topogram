import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui';
import { topograms } from './topograms';
import { topogram } from './topogram';
import { nodes } from './nodes';
import { edges } from './edges';

const rootReducer = combineReducers({
  topograms,
  topogram,
  nodes,
  edges,
  ui: uiReducer
});

export default rootReducer;
