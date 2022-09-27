/**
 * Page showed when the user tries to access a page that doesn't exist.
 * @return {JSX.Element} the page component
 */
const NotFound = () => {
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
            <h1>404 error.</h1>
            <h2>Page {window.location.href} not found.</h2>
        </div>
    );
}

export default NotFound;