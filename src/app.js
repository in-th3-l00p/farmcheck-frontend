import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useUserDetailsUpdater} from "./lib/services/userService";

import {Spinner} from "react-bootstrap";
import Navbar from "./components/navbar/navbar";

import Home from "./pages/home/home";
import Shop from "./pages/shop/shop";
import About from "./pages/about/about";
import {Login, Register} from "./pages/auth/auth";
import Profile from "./pages/profile/profile";
import CreateFarm from "./pages/farms/create";
import ShowFarms from "./pages/farms/show";
import FarmPanel from "./pages/farms/panel/panel";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.scss";
import "./app.scss";

/**
 * Loading component showed when initial requests to the server are made.
 * @return {JSX.Element} the loading component
 */
const Loading = () => {
    return (
        <div className="loading">
            <h1>Loading...</h1>
            <Spinner 
                animation="border" 
                variant="success" 
                className="spinner"
            />
        </div>
    )
}

/**
 * Entry point of the application.
 * It provides the routing of the application using the
 * "react-router-dom" library and the main layout.
 * @returns the main component
 */
const App = () => {
    const [loaded, error] = useUserDetailsUpdater();

    // server error
    if (error) {
        return (
            <div
                className="d-flex align-items-center justify-content-center"
                style={{width: "100vw", height: "100vh"}}
            >
                <h1>server error: {error.message}</h1>
            </div>
        );
    }

    if (!loaded)
        return <Loading />

    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/farms">
                        <Route index element={<ShowFarms />} />
                        <Route path="/farms/create" element={<CreateFarm />} />
                        <Route path="/farms/panel/:farm_name" element={<FarmPanel />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
