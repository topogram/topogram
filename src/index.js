import React from 'react';
import ReactDOM from 'react-dom';

// main component
import Topograph from './Topograph.jsx'

import csv from 'csvtojson';

// load data
// import nodes from '../data/arc5/arc5-nodes.json';
// import edges from '../data/arc5/arc5-edges.json';
// import config from '../data/arc5/arc5-topogram.json';

csv.fromFile('../data/random/nodes.csv')
  .then( data => console.log(data))

csv.fromFile('../data/random/edges.csv')
    .then( data => console.log(data))

// fix dates
const nodesFix = nodes.map(n => ({
  ...n,
  data : {
    ...n.data,
    start : new Date(n.data.start,0,1),
    end: new Date(n.data.end,0,1)
  }
}))

ReactDOM.render(
  <div>
    <Topograph
      nodes={nodesFix}
      edges={edges}
      config={config}
      />
  </div>,
  document.getElementById('app')
);
