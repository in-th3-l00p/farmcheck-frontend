import React, { useState, useEffect } from 'react';
import { Navbar as NavBar, NavbarBrand, Nav, Container } from "react-bootstrap";
import { Button } from '../buttons/buttons';


import style from "./navbar.module.scss";
import collapse from "./collapse.module.scss";

/**
 * Custom collapse component used for a sidebar insted of a expanding navbar on mobile.
 * @param props.isOpened state that is true if the side bar should be opened (only on mobile)
 * @param props.setOpen callback for setting the open state
 * @param props.children the component's children elements
 * @returns 
 */
const Collapse = ({ isOpened, setOpen, children }) => {
    return (
        <>
            {isOpened && (
                <div className="position-absolute top-0 start-0 vw-100 vh-100">
                    {/* used for the dark effect on the back of the sidebar */}
                    <span 
                        className={style.sidebarBehind}
                        onClick={() => setOpen(false)}
                    >
                    </span>
                    <div className={`${style.sidebar} px-3`}>
                        <span className="d-flex flex-column ms-4 text-right">{children}</span>
                    </div>
                </div>
            )}
        </>
    );
}

const CollapseToggler = ({isCollapseOpened, setCollapseOpen}) => {
    return (
        <button 
            className={collapse.toggler}
            disabled={isCollapseOpened}
            onClick={() => {
                setCollapseOpen(!isCollapseOpened);
            }}
        >
            <span className={collapse.togglerLine} />
            <span className={collapse.togglerLine} />
            <span className={collapse.togglerLine} />
        </button>
    );
}

const Link = ({
    className="",
    href="",
    onClick=undefined,
    iconSrc=undefined,
    iconAlt="",
    children
}) => {
    return (
        <div
            href={href} 
            className={`${collapse.link} ${className}`}
            onClick={(
                typeof onClick === "undefined" ? 
                () => {window.location.href={href}} : 
                onClick
            )}
        >
            <span className="me-auto">
                {children}
            </span>
            {typeof iconSrc !== "undefined" && (
                <span className={collapse.icon}>
                    <img src={iconSrc} alt={iconAlt} />
                </span>
            )}
        </div>
    ) 
}

/**
 * The main navbar component that should appear on every page.
 * @returns the navbar component
 */
const Navbar = () => {
    const [isCollapseOpened, setCollapseOpen] = useState(false);

    // prevent scrolling
    useEffect(() => {
        document.body.style.overflow = (
            isCollapseOpened ? "hidden" : "unset"
        );
    }, [isCollapseOpened])

    return (
        <NavBar className={style.navbar} variant="dark" fixed="top">
            <Container>
                <NavbarBrand href="/" className={style.brand}>FarmCheck</NavbarBrand>
                <Collapse 
                    isOpened={isCollapseOpened} 
                    setOpen={setCollapseOpen}
                >
                    <Nav className={`${style.menu} mb-auto`}>
                        <Link href="/shop">Shop</Link>
                        <Link href="/download">Download</Link>
                        <Link href="/wiki">Crop wiki</Link>
                        <Link href="/about">About us</Link>

                        <div className={collapse.line} />

                        <Link 
                            href="/feedback"
                            iconSrc="/menu-icons/feedback.png"
                            iconAlt="feedback icon"
                        >
                            Feedback
                        </Link>
                        <Link 
                            onClick={() => {console.log("yees")}}
                            iconSrc="/menu-icons/dark.png"
                            iconAlt="switch theme"
                        >
                            Switch theme
                        </Link>
                    </Nav>

                    <Nav className="d-flex gap-3 mb-3 justify-content-center">
                        <Button 
                            className={collapse.button}
                            onClick={() => window.location.href="/login"}
                        >
                            Login
                        </Button>
                        <Button 
                            className={collapse.button}
                            onClick={() => window.location.href="/register"}
                        >
                            Register
                        </Button>
                    </Nav>
                </Collapse>

                <CollapseToggler 
                    isCollapseOpened={isCollapseOpened} 
                    setCollapseOpen={setCollapseOpen}
                />
            </Container>
        </NavBar>
    );
}

export default Navbar;