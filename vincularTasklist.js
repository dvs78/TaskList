// vincularTasklist.js
import { execSync } from "child_process";
import { existsSync } from "fs";

const isLocal = process.env.NODE_ENV !== "production";
const path = "./front_end";

if (isLocal) {
  console.log("🔗 Vinculando tasklist localmente...");
  if (existsSync(path)) {
    execSync("npm install ../", { cwd: path, stdio: "inherit" });
  }
}
