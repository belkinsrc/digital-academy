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
            <div class="${commonComponentProps.getCN("page")}">
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
    button: "button",
    totalPrice: "total-price"
  },
  extraAttrs: {},
  getCN: (block = "", elem = "", mod = {}) => {
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
  Object.entries(attrs).forEach(([key, value]) => {
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

export const createUrlBuilder = (baseURL = "") => {
  const url = new URL(baseURL, "http://localhost:5173");

  const addPath = (path) => {
    url.pathname += path;
    return builder;
  };

  const addQueryParam = (key, value) => {
    url.searchParams.set(key, value);
    return builder;
  };

  const build = () => {
    return url.toString();
  };

  const builder = {
    addPath,
    addQueryParam,
    build,
  };

  return builder;
}