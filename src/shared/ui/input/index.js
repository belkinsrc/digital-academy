export default ({
    type = "text",
    name = "",
    value = ""
}) => {
    return `
        <input type="${type}" name="${name}" value="${value}">
    `;
}