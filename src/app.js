import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./components/authenticated-route/authenticatedRoute";
import { useUserDetailsUpdater } from "./lib/services/userService";
import { Spinner } from "react-bootstrap";
import Navbar from "./components/navbar/navbar";

import Home from "./pages/home/home";
import Shop from "./pages/shop/shop";
import About from "./pages/about/about";
import { Login, Register } from "./pages/auth/auth";
import Profile from "./pages/profile/profile";
import CreateFarm from "./pages/farms/create";
import Wiki from "./pages/wiki/wiki";
import ShowFarms from "./pages/farms/show";
import FarmPanel from "./pages/farms/panel/panel";
import NotFound from "./pages/notFound";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import "./styles/globals.scss";
import { CreateSensor } from "./pages/farms/panel/sensors";
import SensorPage from "./pages/farms/sensor";
import FeedBack from "./pages/feedback/feedback";
import FeedBackShow from "./pages/feedback/feedbackshow";
import Cart from "./pages/shop/cart/cart";
/**
 * Loading component showed when initial requests to the server are made.
 * @return {JSX.Element} the loading component
 */
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
    if (error) {
        return (
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: "100vw", height: "100vh" }}
            >
                <h1>server error: {error.message}</h1>
            </div>
        );
    }

    if (!loaded) return <Loading />;

    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/wiki" element={<Wiki />} />
                    <Route path="/Feedback" element={<FeedBack />} />
                    <Route path="/feedback/show" element={<FeedBackShow />} />
                    <Route path="/shop/cart" element={<Cart />} />
                    <Route path="/farms">
                        <Route
                            index
                            element={
                                <AuthenticatedRoute>
                                    <ShowFarms />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/farms/create"
                            element={
                                <AuthenticatedRoute>
                                    <CreateFarm />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/farms/panel/:farm_id"
                            element={
                                <AuthenticatedRoute>
                                    <FarmPanel />
                                </AuthenticatedRoute>
                            }
                        />
                    </Route>
                    <Route path="/sensors">
                        <Route
                            path="/sensors/:sensor_id"
                            element={
                                <AuthenticatedRoute>
                                    <SensorPage />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/sensors/create/:farm_id"
                            element={
                                <AuthenticatedRoute>
                                    <CreateSensor />
                                </AuthenticatedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
