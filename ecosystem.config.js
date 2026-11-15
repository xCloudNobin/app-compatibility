const path = require("path");

// Multi-app PM2 file: one web app and two same-code workers. Every app runs
// env-cmd from the root node_modules with cwd web/ and the site .env.
// Paths are absolute through __dirname, as some customer files do.
// Variants, read from the environment (release mode loads the site .env first):
// MULTI_NO_OVERRIDE=1 adds env-cmd's --no-override; MULTI_ONLY_WEB=1 keeps only multi-web.
const cwd = path.join(__dirname, "web");
const envCmd = (file) => "--no-override " + "-f ../.env node " + file;

const base = {
  cwd,
  script: path.join(__dirname, "node_modules", ".bin", "env-cmd"),
  interpreter: "none",
  instances: 1,
  exec_mode: "fork",
  watch: false,
  autorestart: true,
};

const apps = [
  { ...base, name: "multi-web", script: path.join(__dirname, "web", "main.js"), interpreter: "node", args: [], exec_mode: "cluster", instances: 2, max_memory_restart: "300M" },
  { ...base, name: "multi-queue", args: envCmd("workers/queue-worker.js"), max_memory_restart: "150M" },
  { ...base, name: "multi-cron", args: envCmd("workers/cron-worker.js"), max_memory_restart: "150M" },
];

module.exports = { apps: process.env.MULTI_ONLY_WEB === "1" ? apps.slice(0, 1) : apps };
