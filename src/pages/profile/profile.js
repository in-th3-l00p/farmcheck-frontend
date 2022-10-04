import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextBox from "../../components/textbox/textbox";
import { Col, Placeholder, Row } from "react-bootstrap";
import userService from "../../lib/services/userService";
import { NotAuthenticatedError } from "../../lib/constants";
import { Button } from "../../components/buttons/buttons";

import style from "./profile.module.scss";

/**
 * Animated placeholder used when the profile is loading.
 * @returns the placeholder component
 */
const LoadingPlaceholders = () => {
    return (
        <TextBox style={{ marginTop: "100px" }}>
            <Row sm={5}>
                <Col>
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                        }}
                    >
                        <Placeholder
                            as="div"
                            animation="glow"
                            className="w-100 h-100"
                        >
                            <Placeholder className="w-100 h-100" />
                        </Placeholder>
                    </div>
                </Col>
                <Col sm="9">
                    <Placeholder as="h4" animation="glow">
                        <Placeholder xs="6" />
                    </Placeholder>

                    <Placeholder as="p" animation="glow">
                        <Placeholder xs="6" />
                    </Placeholder>

                    <Placeholder as="p" animation="glow">
                        <Placeholder xs="6" />
                    </Placeholder>
                </Col>
            </Row>
        </TextBox>
    );
};

/**
 * Profile component used at "/profile/:username".
 * Shows information about the user with ":username" username.
 * @returns the component
 */
const Profile = () => {
    const [userDetails, setUserDetails] = useState(undefined);
    const [error, setError] = useState(undefined);
    const params = useParams();
    const [editProfile, setEditProfile] = useState(true);

    useEffect(() => {
        if (!userService.isAuthenticated()) {
            setError(NotAuthenticatedError);
            return;
        }

        // no need to request the user details of the current user
        if (params.username === userService.getCurrentUsername()) {
            setUserDetails(userService.getCurrentUserDetails());
            return;
        }

        userService
            .getUserDetails(params.username)
            .then((details) => setUserDetails(details))
            .catch((err) => setError(err));
    }, []);

    if (error)
        return (
            <TextBox style={{ marginTop: "100px" }}>
                <h3 className="text-center">
                    User {params.username} not found.
                </h3>
            </TextBox>
        );

    if (!userDetails) return <LoadingPlaceholders />;

    return (
        <div className={style.profile}>
            <div className={style.text}>
                <img
                    src="/images/default-profile-picture.png"
                    alt="profile"
                    className={`${style.image} img-thumbnail`}
                    style={{ width: "200px" }}
                />
                <div>
                    <h4 className={`${style.username} text-left`}>
                        {userDetails.login}
                    </h4>
                    <h5 className={style.email}>{userDetails.email}</h5>
                    <p className={style.name}>
                        {userDetails.firstName} {userDetails.lastName}
                    </p>
                </div>
            </div>
            <div className={style.change}>
                <p>Change</p>
                <a className={style.text}>username</a>
                <p>or</p>
                <a className={style.text}>password</a>
            </div>
            <div className={style.label}>
                <h5 className={style.labelText}>Tasks</h5>
                <div className={style.line}>
                    <div className={style.yellowLine} />
                </div>
            </div>
            <div className={style.tasks}>
            </div>
        </div>
    );
};

export default Profile;
