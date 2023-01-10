import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { logger, requestCounter } from "./middlewares.js";

// ==========
// App initialization
// ==========

const hostname = 'localhost';
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(requestCounter);
app.use(logger);
