import React from 'react';
import ReactDOM from 'react-dom';

const title = 'Topogram React Webpack Babel Setup... ok';

import "./css/topogram.scss";

ReactDOM.render(
  <div>
    <h2>{title}</h2>
  </div>,
  document.getElementById('app')
);

module.hot.accept();
