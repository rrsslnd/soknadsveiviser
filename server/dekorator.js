require("dotenv").config();
const jsdom = require("jsdom");
const request = require("request");
const fs = require("file-system");

const { JSDOM } = jsdom;

const requestDecorator = callback =>
  request(
    `${fs.readFileSync(
      "/var/run/secrets/nais.io/vault/appres.cms.url",
      "utf8"
    )}/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true`,
    callback
  );

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 400) {
        const { document } = new JSDOM(body).window;
        const prop = "innerHTML";

        const data = {
          NAV_SKIPLINKS: document.getElementById("skiplinks")[prop],
          NAV_SCRIPTS: document.getElementById("scripts")[prop],
          NAV_STYLES: document.getElementById("styles")[prop],
          NAV_HEADING: document.getElementById("header-withmenu")[prop],
          NAV_FOOTER: document.getElementById("footer-withmenu")[prop],
          MEGAMENU_RESOURCES: document.getElementById("megamenu-resources")[
            prop
          ]
        };
        resolve(data);
      } else {
        reject(new Error(error));
      }
    };

    requestDecorator(callback);
  });

module.exports = getDecorator;
