import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
// import Footer from "./components/footer/footer";
import About from "./pages/about/about";
import { Login, Register } from "./pages/auth/auth";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss"

/**
 * Entry point of the application.
 * It provides the routing of the application using the
 * "react-router-dom" library and the main layout.
 * @returns the main component
 */
const App = () => {
    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
