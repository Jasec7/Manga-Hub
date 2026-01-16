import React from "react";
import App from "./components/App";
import "./index.css";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
     <App />
    </BrowserRouter>,
    document.getElementById("root")
)



