import { withNaming } from "@bem-react/classname";

export const getPage = ({ content = ``, title = ``, meta = [] }) => {
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
                <div class="${commonComponentProps.getCN("page", "", {})}">
                    ${content}
                </div>                             
            </body>
        </html>
    `;
}

export const commonComponentProps = {
    extraClasses: {
        title: "title",
        container: "container",
        button: "button"
    },
    extraAttrs: {},
    children: ``,
    getCN: (block = "", elem = "", mod = {}) => {
        console.debug(block, elem, mod)
        return withNaming({
            n: "",
            e: "__",
            m: "--",
            v: "-"
        })(block, elem)(mod)
    }
}

export const getAttrs = (attrs) => {
    const result = []
    Object.entries(attrs).forEach(([ key, value ]) => {
        result.push(`${key}=${value}`);
    })
    return result.join(" ")
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

export const filterCardsByCategory = (data, category) => {
    if (category === "all") {
        return data;
    }
    return data.filter((item) => item.category === category);
}