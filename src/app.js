import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserDetailsUpdater } from "./lib/services/userService";

import { Spinner } from "react-bootstrap";
import Navbar from "./components/navbar/navbar";

import Home from "./pages/home/home";
import Shop from "./pages/shop/shop";
import About from "./pages/about/about";
import { CreateFarm, Login, Register } from "./pages/auth/auth";
import Profile from "./pages/profile/profile";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import Wiki from "./pages/wiki/wiki";
import Construction from "./pages/construction/construction";

const Loading = () => {
    return (
        <div className="loading">
            <h1>Loading...</h1>
            <Spinner animation="border" variant="success" className="spinner" />
        </div>
    );
};

/**
 * Entry point of the application.
 * It provides the routing of the application using the
 * "react-router-dom" library and the main layout.
 * @returns the main component
 */
const App = () => {
    const [loaded, error] = useUserDetailsUpdater();

    // server error
    if (error)
        return (
            <div className="error">
                <p>server error: {error}</p>
            </div>
        );

    if (!loaded) return <Loading />;

    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/createfarm" element={<CreateFarm />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/wiki" element={<Wiki />} />
                    <Route path="/download" element={<Construction />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
