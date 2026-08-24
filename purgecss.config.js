const fs = require("node:fs");
const path = require("node:path");

const cssDir = path.join("_site", "assets", "css");
const skipPurge = new Set(["main.css", "system-fonts.css", "atelier-v2.css", "atelier-v3.css", "atelier-v4.css", "atelier-v5.css"]);
const css = fs.existsSync(cssDir)
  ? fs
      .readdirSync(cssDir)
      .filter((file) => file.endsWith(".css") && !skipPurge.has(file))
      .map((file) => path.join(cssDir, file))
  : [];

module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css,
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: {
    standard: [
      "collapse",
      "collapsing",
      "show",
      "dropdown-menu",
      "dropdown-item",
      "table",
      "table-dark",
      "table-hover",
      "table-responsive",
      "af-tooltip",
      "af-popover",
      "font-weight-bold",
      "font-weight-medium",
      "font-weight-lighter",
      "fixed-top-nav",
    ],
    greedy: [/data-theme/, /navbar/, /profile/, /rounded-circle/, /card/, /footer/, /news/, /post/],
  },
};
