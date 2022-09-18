import {Container} from "react-bootstrap";

/**
 * Used while waiting for the farm data to be fetched.
 * @return {JSX.Element} placeholder component
 */
const UsersTabPlaceholder = () => {
    return (
        <Container>

        </Container>
    );
}

/**
 * Tab for supporting CRUD operations on farm's users.
 * @param farm farm object
 * @param users farm's users
 * @return {JSX.Element} the tab component
 */
const UsersTab = ({ farm, users }) => {
    if (
        typeof farm === "undefined" ||
        typeof users === "undefined"
    )
        return <UsersTabPlaceholder />
    return (
        <Container>
            <p>user tab</p>
        </Container>
    )
}

export default UsersTab;