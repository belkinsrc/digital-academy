export const getPage = ({ body = ``, title = ``, meta = [] }) => {
    return `
        <!doctype html>
        <html lang="en">
          <head>
            ${meta.join("\n")}
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <title>${title}</title>
            <script src="/src/app/main.js" defer type="module"></script>
          </head>
          <body>
            ${body}
          </body>
        </html>
    `;
}

export const meta = ({
    charset = "",
    content = "",
    httpEquiv = "",
    name = ""
}) => {
    return `
      <meta charset="${charset}" 
            content="${content}" 
            http-equiv="${httpEquiv}" 
            name="${name}" />  
    `;
}