import { useEffect, useState } from "react";
import _ from "lodash";

import { Button } from "../../components/buttons/buttons";
import ErrorAlert from "../../components/alerts/error";

import style from "./styles/farms.module.scss";
import { Alert, Placeholder } from "react-bootstrap";
import farmService from "../../lib/services/farmService";
import { useLocation } from "react-router-dom";

/**
 * Farm display component.
 * @param farm the farm object
 * @return {JSX.Element} the display of the farm object
 */
const Farm = ({ farm }) => {
    return (
        <span
            className={`${style.farmDisplay} p-2 mt-2`}
            onClick={() => (window.location.href = "/farms/panel/" + farm.id)}
        >
            <img
                src={
                    farm.image === ""
                        ? "/images/default-farm-picture.png"
                        : farm.image
                }
            />
            <div className={style.text}>
                <h4>{farm.name}</h4>
                <p>Your farm</p>
            </div>
        </span>
    );
};

const FarmPlaceholder = ({ times = 1 }) => {
    const sizeRange = [2, 6];
    const keys = _.map(new Array(times), (value, key) => key);

    return (
        <>
            {keys.map((key) => (
                <span
                    key={key}
                    className={`
                        ${style.farmDisplay} 
                        ${style.placeholder} 
                        p-3
                    `}
                >
                    <Placeholder
                        as="h4"
                        xs={Math.floor(
                            sizeRange[0] +
                                Math.random() * (sizeRange[1] - sizeRange[0])
                        )}
                    />
                </span>
            ))}
        </>
    );
};

// used for not repeating
const QueryAlert = ({ children }) => {
    const [show, setShow] = useState(true);
    if (show)
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                {children}
            </Alert>
        );
    return <></>;
};

/**
 * Page located at "/farms".
 * @return {JSX.Element} the page component
 */
const ShowFarms = () => {
    const location = useLocation();
    const [farms, setFarms] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        farmService
            .getAuthenticatedUserFarms()
            .then((farms) => {
                setFarms(farms);
                setLoading(false);
            })
            .catch((err) => setError(err));
    }, []);

    return (
        <div className={`form-container ${style.textBox}`}>
            {error && <ErrorAlert error={error} setError={setError} />}
            <div className="d-flex m-3">
                <h3 className="me-auto">Your farms</h3>
                <Button
                    onClick={() => (window.location.href = "/farms/create")}
                    className={style.createButton}
                >
                    <span className={style.buttonText}>+</span>
                </Button>
            </div>

            {location.search === "?created" && (
                <QueryAlert>Farm created successfully</QueryAlert>
            )}
            {location.search === "?exited" && (
                <QueryAlert>You left the farm</QueryAlert>
            )}

            <div
                className={`
                d-flex flex-column gap-3
                ${style.farmContainer}
            `}
            >
                {loading && <FarmPlaceholder times={4} />}
                {farms.map((farm, index) => (
                    <Farm farm={farm} key={index} />
                ))}
            </div>
        </div>
    );
};

export default ShowFarms;
