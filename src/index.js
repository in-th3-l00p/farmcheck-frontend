import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import axios from "axios";

// proxy the axios
axios.defaults.baseURL = "https://farmcheck-test.herokuapp.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);