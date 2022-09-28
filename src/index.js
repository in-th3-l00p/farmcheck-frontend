import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import axios from "axios";

// proxy the axios
axios.defaults.baseURL = "https://farmcheck-test.herokuapp.com";

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/api' ], { target: 'https://farmcheck-test.herokuapp.com' }));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);