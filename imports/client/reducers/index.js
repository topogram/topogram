import { combineReducers } from 'redux';

import { topograms } from './topograms';
import { nodes } from './nodes';
import { edges } from './edges';

const rootReducer = combineReducers({
  topograms,
  nodes,
  edges
});

export default rootReducer;
