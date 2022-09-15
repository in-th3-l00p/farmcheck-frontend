import { Alert } from "react-bootstrap";

/**
 * Alert that is displayed only if an error occured.
 * @param props.error the error message
 * @param props.setError error's reducer
 * @returns the alert if the error message is not an empty string
 */
const ErrorAlert = ({ error, setError }) => {
    if (error)
        return (
            <Alert 
                variant="danger" 
                onClose={() => setError("")} 
                dismissible
            >
                {error}
            </Alert>
        );
    return <></>;
}

export default ErrorAlert;