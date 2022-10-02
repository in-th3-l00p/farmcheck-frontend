import { Container, Placeholder } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { base64ToBlob } from "../../../lib/algorithms";

import style from "./../styles/tabs.module.scss";

/**
 * Used while waiting for the farm data to be fetched.
 * @return {JSX.Element} placeholder component
 */
const PlaceholderInfoTab = () => {
    return (
        <Container className="d-flex gap-3">
            <Placeholder
                as="img"
                style={{
                    width: "200px",
                    height: "200px",
                }}
            />

            <Placeholder xs={6} size="sm" />
        </Container>
    );
};

/**
 * Tab used by the farm panel that displays information about the farm.
 * @param farm the farm object
 * @param users the users of the farm
 * @return {JSX.Element} the tab component
 */
const InfoTab = ({ farm, users }) => {
    const imageRef = useRef(null);
    useEffect(() => {
        // loading the image
        if (imageRef.current === null || typeof farm === "undefined") return;
        const url = URL.createObjectURL(base64ToBlob(farm.image));
        imageRef.current.src = url;
        imageRef.current.onload = URL.revokeObjectURL(url);
    }, [imageRef, farm]);

    if (typeof farm === "undefined" || typeof users === "undefined")
        return <PlaceholderInfoTab />;
    return (
        <Container className={`${style.profile} d-flex gap-3`}>
            <img
                src={
                    farm.image === ""
                        ? "/images/default-farm-picture.png"
                        : farm.image
                }
                width={200}
                height={200}
                alt="profile"
            />
            <div className={style.text}>
                <h3 className={style.name}>{farm.name}</h3>
                <p className={style.description}>Description</p>
            </div>
        </Container>
    );
};

export default InfoTab;
