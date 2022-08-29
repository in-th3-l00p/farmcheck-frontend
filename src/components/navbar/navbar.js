import React, { useState, useEffect } from 'react';
import { Navbar as NavBar, NavbarBrand, Container } from "react-bootstrap";
import { UnauthenticatedNavs, AuthenticatedNavs } from './navs';

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
                        className={collapse.behind}
                        onClick={() => setOpen(false)}
                    />

                    <div className={`${collapse.collapse} px-3 d-flex flex-column ms-4 text-right py-2`}>
                        {children}
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
                    {sessionStorage.getItem("authenticated") === "true" ? (
                        <AuthenticatedNavs />
                    ): (
                        <UnauthenticatedNavs />
                    )}
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