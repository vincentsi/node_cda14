import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {incrementCompteur, logger} from "middlewares.js";

const port = 8000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.URL));


app.use(express.urlencoded({extended : false}));
app.use(incrementCompteur);
app.use(logger);