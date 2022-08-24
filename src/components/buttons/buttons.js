import css from "./buttons.module.scss";

/**
 * Main button component.
 * Provides a styled yellow button.
 * @param props.className classes of the button
 * @param props.style the style of the button
 * @param props.onClick callback for handling clicks
 * @param props.children children elements
 * @returns the button
 */
export const Button = ({
    className = "",
    style = {},
    onClick = () => {},
    children
}) => {
    return (
        <button 
            className={`${css.button} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
}