// build.js
import { execSync } from "child_process";

execSync("npm install --prefix front_end", { stdio: "inherit" });
execSync("npm run build --prefix front_end", { stdio: "inherit" });
