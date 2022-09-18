import css from "./buttons.module.scss";

/**
 * Main button component.
 * Provides a styled yellow button.
 * @param props.type button's type
 * @param props.className classes of the button
 * @param props.style the style of the button
 * @param props.onClick callback for handling clicks
 * @param props.children children elements
 * @returns the button
 */
export const Button = ({
    type = "button",
    className = "",
    style = {},
    onClick = () => {},
    disabled = false,
    children
}) => {
    return (
        <button
            type={type}
            className={`${css.button} ${className}`}
            disabled={disabled}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
}