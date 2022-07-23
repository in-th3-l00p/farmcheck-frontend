import React, { useState, useEffect } from 'react';
import { Navbar as NavBar, NavbarBrand, Nav, Container } from "react-bootstrap";

import style from "./navbar.module.scss";

/**
 * Custome Collapse component used for a sidebar insted of a expanding navbar on mobile.
 * @param props.expand the bootstrap expand used for responsivness
 * @param props.isOpen state that is true if the side bar should be opened (only on mobile)
 * @param props.setOpen callback for setting the open state
 * @param props.children the component's children elements
 * @returns 
 */
const Collapse = ({ expand, isOpen, setOpen, children }) => {
    // bootstrap's breakpoints
    const breakpoints = {
        "sm": 576,
        "md": 768,
        "lg": 992,
        "xl": 1200,
        "xxl": 1400
    };

    // viewport's width (used for checking if the collapse is on mobile)
    const [width, setWidth] = useState(window.innerWidth);

    // getting the viewport's width
    useEffect(() => {
        const onWindowResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", onWindowResize);
        return () => { window.removeEventListener("resize", onWindowResize); }
    }, [])

    // on mobile
    if (width < breakpoints[expand]) {
        return (
            <>
                {isOpen && (
                    <div>
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

    // on desktop
    return (
        <div className="d-flex w-100">
            {children}
        </div>
    )
}

/**
 * The main navbar component that should appear on every page.
 * @returns the navbar component
 */
const Navbar = () => {
    const [isCollapseOpen, setCollapseOpen] = useState(false);
    const expand = "lg";

    return (
        <NavBar className={style.navbar} variant="dark" expand={expand} fixed="top">
            <Container>
                <NavbarBrand href="/">FarmCheck</NavbarBrand>
                <NavBar.Toggle onClick={() => { setCollapseOpen(!isCollapseOpen); }} />
                <Collapse 
                    expand={expand} 
                    isOpen={isCollapseOpen} 
                    setOpen={setCollapseOpen}
                >
                    <Nav className="me-auto mb-auto">
                        <Nav.Link href="/shop">Shop</Nav.Link>
                        <Nav.Link href="/download">Download</Nav.Link>
                        <Nav.Link href="/wiki">Crop wiki</Nav.Link>
                        <Nav.Link href="/about">About us</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/Register">Register</Nav.Link>
                    </Nav>
                </Collapse>
            </Container>
        </NavBar>
    );
}

export default Navbar;