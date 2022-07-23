import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./domain/home/home";
import Navbar from "./components/navbar/navbar";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";

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
                    <Route route="/">
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;