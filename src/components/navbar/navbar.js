import React, { useState, useEffect } from 'react';
import { Navbar as NavBar, NavbarBrand, Nav, Container } from "react-bootstrap";

import style from "./navbar.module.scss";
import icon from "./icon.module.scss";

/**
 * Custom collapse component used for a sidebar insted of a expanding navbar on mobile.
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
    else
        setOpen(false);

    // on desktop
    return (
        <div className="d-flex w-100">
            {children}
        </div>
    )
}

/**
 * A link component that has an icon
 * @param props.text the text of the  
 * @param props.onClick callback executed on click
 * @param props.iconSrc icon's image source
 * @returns 
 */
const IconMenuLink = ({
    text = "",
    href = "#",
    iconSrc = ""
}) => {
    return (
        <Nav.Link href={href}>
            <div className={style.menu_button}>
                <p className={style.link}>{text}</p>
                <span className={icon.image}>
                    <img src={iconSrc} alt="button icon" />
                </span>
            </div>
        </Nav.Link>
    );
}

/**
 * Set of links that is begin shown only when the collapse is open
 * @returns the collapses' settings
 */
const CollapseMenuSettings = ({ isCollapseOpen }) => {
    const menuLinks = [
        {text: "Switch theme", iconSrc: "/menu-icons/light.png"},
        {text: "Feedback", iconSrc: "/menu-icons/feedback.png"}
    ];

    if (isCollapseOpen)
        return (
            <div className="menu">
                <div className={style.line} />
                {menuLinks.map((link, index) => (
                    <IconMenuLink 
                        key={index} 
                        text={link.text} 
                        iconSrc={link.iconSrc} 
                    />
                ))}
            </div>
        );
    return <></>
}

/**
 * Login and register links that are integrating the collapse
 * @param props.isCollapseOpen if the component should appear
 * @returns the component
 */
const CollapseMenuButtons = ({ isCollapseOpen }) => {
    if (isCollapseOpen)
        return (
            <div className="d-flex">
                <Nav.Link className={style.button} href="/login">Login</Nav.Link>
                <Nav.Link className={style.button} href="/register">Register</Nav.Link>
            </div>
        );

    return (
        <>
            <Nav.Link className={style.link} href="/login">Login</Nav.Link>
            <Nav.Link className={style.link} href="/register">Register</Nav.Link>
        </>
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
                <NavbarBrand href="/" className={style.brand}>FarmCheck</NavbarBrand>
                <NavBar.Toggle onClick={() => { setCollapseOpen(!isCollapseOpen); }} />
                <Collapse 
                    expand={expand} 
                    isOpen={isCollapseOpen} 
                    setOpen={setCollapseOpen}
                >
                    <Nav className="me-auto mb-auto">
                        <div className={(isCollapseOpen) ? style.menu : "d-flex"}>
                            <Nav.Link className={style.link} href="/shop">Shop</Nav.Link>
                            <Nav.Link className={style.link} href="/download">Download</Nav.Link>
                            <Nav.Link className={style.link} href="/wiki">Crop wiki</Nav.Link>
                            <Nav.Link className={style.link} href="/about">About us</Nav.Link>
                            <CollapseMenuSettings isCollapseOpen={isCollapseOpen} />
                        </div>
                    </Nav>
                    <Nav>
                        <CollapseMenuButtons isCollapseOpen={isCollapseOpen} />
                    </Nav>
                </Collapse>
            </Container>
        </NavBar>
    );
}

export default Navbar;