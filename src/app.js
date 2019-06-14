import React from 'react';
import ReactDOM from 'react-dom';

import "./css/topogram.scss";
import HomeComponent from "./ui/pages/HomeComponent.jsx"


ReactDOM.render(
  <HomeComponent />,
  document.getElementById('app')
);

module.hot.accept();
