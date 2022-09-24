import {isAuthenticated} from "../../lib/auth";

/**
 * Page component showed if the user is unauthorized.
 * @param path the path of the page that the user is trying to access
 * @return {JSX.Element} the page component
 */
const Unauthenticated = ({ path }) => {
    return (
        <div
            className={`
                d-flex flex-column
                justify-content-center align-items-center
                text-center
            `}
            style={{
                width: "100vw",
                height: "100vh"
            }}
        >
            <h1>You need to be authenticated to access this resource.</h1>
            <h2>Page {path} is requiring authorization.</h2>
        </div>
    );
}

/**
 * react-router-dom's like Router component, but checks authorization.
 * @param children child components
 * @return {JSX.Element} the route component
 */
const AuthenticatedRoute = ({ children }) => {
    if (!isAuthenticated())
        return <Unauthenticated />
    return children;
}

export default AuthenticatedRoute;