import React from 'react';
import ReactDOM from 'react-dom';

import "./css/topogram.scss";
import { TopogramViewComponent } from "./ui/TopogramViewComponent.jsx"

ReactDOM.render(
  <TopogramViewComponent />,
  document.getElementById('app')
);

module.hot.accept();
