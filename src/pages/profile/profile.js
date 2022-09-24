import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TextBox from "../../components/textbox/textbox";
import {Col, Placeholder, Row} from "react-bootstrap";
import userService from "../../lib/services/userService";
import {NotAuthenticatedError} from "../../lib/constants";

/**
 * Animated placeholder used when the profile is loading.
 * @returns the placeholder component
 */
const LoadingPlaceholders = () => {
    return (
        <TextBox style={{ marginTop: "100px" }}>
            <Row sm={5}>
                <Col>
                    <div style={{ 
                        width: "200px", 
                        height: "200px" 
                    }}>
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
    )
}

/**
 * Profile component used at "/profile/:username".
 * Shows information about the user with ":username" username.
 * @returns the component
 */
const Profile = () => {
    const [userDetails, setUserDetails] = useState(undefined);
    const [error, setError] = useState(undefined);
    const params = useParams();

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

        userService.getUserDetails(params.username)
            .then(details => setUserDetails(details))
            .catch(err => setError(err));
    }, []);

    if (error)
        return (
            <TextBox style={{ marginTop: "100px" }}>
                <h3 className="text-center">User {params.username} not found.</h3>
            </TextBox>
        );

    if (!userDetails)
        return <LoadingPlaceholders />

    return (
        <TextBox style={{ marginTop: "100px" }}>
            <Row>
                <Col>
                    <img 
                        src="/images/default-profile-picture.png" 
                        alt="profile"
                        className="img-thumbnail"
                        style={{ width: "200px" }}
                    />
                </Col>
                <Col sm="10">
                    <h4 
                        className="text-left text-decoration-underline"
                    >
                        {userDetails.login}
                    </h4>
                    <p>First name: {userDetails.firstName}</p>
                    <p>Last name: {userDetails.lastName}</p>
                </Col>
            </Row>
        </TextBox>
    );
}

export default Profile;