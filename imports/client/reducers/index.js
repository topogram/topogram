import { combineReducers } from 'redux';

import { topograms } from './topograms';
import { topogram } from './topogram';
import { nodes } from './nodes';
import { edges } from './edges';

const rootReducer = combineReducers({
  topograms,
  topogram,
  nodes,
  edges
});

export default rootReducer;
