// 개발중인 페이지...
// 개발중인 페이지...
// 개발중인 페이지...
// 개발중인 페이지...
// 개발중인 페이지...
// 개발중인 페이지...

import sanitize from "sanitize-html";

const options = {
  allowedTags: ["h1", "h2", "h3", "strong", "p", "em", "br", "span"],
  allowedAttributes: {
    "*": ["style"],
    a: ["href"],
  },
  allowedStyles: {
    "*": {
      // Match HEX and RGB
      color: [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      "background-color": [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      // "text-align": [/^left$/, /^right$/, /^center$/],
      // Match any number with px, em, or %
      // "font-size": [/^\d+(?:px|em|%)$/],
    },
  },
};

export const sanitizeAndShorten = (message) => {
  const filtered = sanitize(message, options);
  const sliced = filtered.slice(0, 5);
  console.log(sliced);
  // return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const sanitizeHtml = (message) => {
  const filtered = sanitize(message, options);
  return filtered;
};

export const sanitizeAll = (message) => {
  const filtered = sanitize(message, { allowedTags: [] });
  return filtered;
};
