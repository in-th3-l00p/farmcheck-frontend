import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./domain/home/home";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Entry point of the application.
 * It provides the routing of the application using the
 * "react-router-dom" library.
 * @returns the main component
 */
const App = () => {
    return (
        <Router>
            <Routes>
                <Route route="/">
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;