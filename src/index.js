import React from 'react';
import ReactDOM from 'react-dom';

// main component
import Topograph from './Topograph.jsx'

// load data
import nodes from '../data/arc5/arc5-nodes.json';
import edges from '../data/arc5/arc5-edges.json';
import config from '../data/arc5/arc5-topogram.json';


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
