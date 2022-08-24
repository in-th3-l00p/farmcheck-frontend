import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./domain/home/home";
import Navbar from "./components/navbar/navbar";
import About from "./domain/about/about";

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
                </Routes>
            </Router>
        </div>
    );
};

export default App;
