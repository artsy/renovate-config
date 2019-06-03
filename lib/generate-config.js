const fs = require("fs");
let pkg = require("../package.json");
const { configs } = require("./config");

pkg["renovate-config"] = configs;

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
