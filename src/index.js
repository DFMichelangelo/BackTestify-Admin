import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "./sassStyles/main.scss";
import './tailwind/output.css';


ReactDOM.render(
  <App />
  ,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
