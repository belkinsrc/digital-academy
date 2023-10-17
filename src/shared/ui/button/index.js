export default ({
    type = "button",
    className = "",
    label = ""
}) => {
    return `
        <button class="${className}" type="${type}">
            ${label}
        </button>
    `;
}