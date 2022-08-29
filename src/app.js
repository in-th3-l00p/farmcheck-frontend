import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import Shop from "./pages/shop/shop";
import About from "./pages/about/about";
import { Login, Register } from "./pages/auth/auth";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss"
import { useEffect } from "react";
import { getUserDetails } from "./lib/auth";

/**
 * Entry point of the application.
 * It provides the routing of the application using the
 * "react-router-dom" library and the main layout.
 * @returns the main component
 */
const App = () => {
    // fetching user data on every page if authenticated
    useEffect(() => {
        getUserDetails()
            .then(data => {
                sessionStorage.setItem("authenticated", true);
                sessionStorage.setItem("user", JSON.stringify(data));
            })
            .catch(err => {
                sessionStorage.setItem("authenticated", false);
                sessionStorage.removeItem("user");
            })
    }, [])

    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shop" element={<Shop />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
