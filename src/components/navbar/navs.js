import { Nav } from "react-bootstrap";
import userService from "../../lib/services/userService";
import { Button } from "../buttons/buttons";

import style from "./navbar.module.scss";

/**
 * Link component that is appearing on the navbar.
 * @param props.className additional class names
 * @param props.href the link where it's redirecting
 * @param props.onClick callback for handling clicking
 * @param props.iconSrc the source of the icon (undefined if there shouldn't be an icon)
 * @param props.iconAlt the icon alt
 * @param props.children where the text of the link should be given
 * @returns the link component
 */
const Link = ({
    className = "",
    href = "",
    onClick = undefined,
    iconSrc = undefined,
    iconAlt = "",
    children,
}) => {
    return (
        <div
            href={href}
            className={`${style.link} ${className}`}
            onClick={
                typeof onClick === "undefined"
                    ? () => (window.location.href = href)
                    : onClick
            }
        >
            <span className="me-auto py-2">{children}</span>
            {typeof iconSrc !== "undefined" && (
                <span className={style.icon}>
                    <img src={iconSrc} alt={iconAlt} />
                </span>
            )}
        </div>
    );
};

/**
 * Navs that are being showed if the user isn't authenticated.
 * @returns the Nav components
 */
export const UnauthenticatedNavs = () => {
    return (
        <>
            <Nav className={`${style.menu} mb-auto px-3`}>
                <Link href="/shop">Shop</Link>
                <Link href="/wiki">Crop wiki</Link>
                <Link href="/about">About us</Link>

                <div className={style.line} />

                <Link
                    href="/feedback"
                    iconSrc="/icons/menu-icons/feedback.png"
                    iconAlt="feedback icon"
                >
                    Feedback
                </Link>
                <Link
                    onClick={() => {
                        console.log("yees");
                    }}
                    iconSrc="/icons/menu-icons/dark.png"
                    iconAlt="switch theme"
                >
                    Switch theme
                </Link>
            </Nav>

            <Nav className="d-flex gap-3 mb-3 px-3 justify-content-center">
                <Button
                    className={style.button}
                    onClick={() => (window.location.href = "/login")}
                >
                    Login
                </Button>
                <Button
                    className={style.button}
                    onClick={() => (window.location.href = "/register")}
                >
                    Register
                </Button>
            </Nav>
        </>
    );
};

/**
 * The navs components that are being showed if the client is authenticated.
 * @returns the Nav components
 */
export const AuthenticatedNavs = () => {
    return (
        <>
            <Nav className={style.profile}>
                <button
                    type="button"
                    className={`${style.profileButton} py-3 mb-1`}
                    onClick={() => {
                        window.location.href = `/profile/${userService.getCurrentUsername()}`;
                    }}
                >
                    <img
                        src="/images/default-profile-picture.png"
                        alt="profile"
                        className={style.profilePicture}
                    />
                    <h3 className="ms-3">{userService.getCurrentUsername()}</h3>
                </button>
            </Nav>
            <Nav className={`${style.menu} mb-auto mt-0 px-3`}>
                <Link href="/shop">Shop</Link>
                <Link href="/wiki">Crop wiki</Link>
                <Link href="/about">About us</Link>
                <Link href="/farms">Your farms</Link>

                <div className={style.line} />

                <Link
                    href="/feedback"
                    iconSrc="/icons/menu-icons/feedback.png"
                    iconAlt="feedback icon"
                >
                    Feedback
                </Link>
                <Link
                    onClick={() => {
                        console.log("yees");
                    }}
                    iconSrc="/icons/menu-icons/dark.png"
                    iconAlt="switch theme"
                >
                    Switch theme
                </Link>
            </Nav>
            <Nav className={`${style.menu} mb-3 px-3`}>
                <Button
                    className={style.button}
                    onClick={() => {
                        userService.logout();
                        window.location.href = "/";
                    }}
                >
                    Logout
                </Button>
            </Nav>
        </>
    );
};
