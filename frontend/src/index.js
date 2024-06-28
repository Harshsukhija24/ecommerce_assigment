// index.js or entry point of your React application
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./tailwind.css";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "./Redux/Provider"; // Adjust the path as per your file structure

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
