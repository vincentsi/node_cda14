import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";

dotenv.config();
const { APP_LOCALHOST_A: hostname, APP_PORT_A: port } = process.env;
const app = express();

app.use(cors);

app.get("/",  (req, res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const home = fs.readFileSync(path.join(__dirname, "/views/home.html"), "utf-8");
  res.send(home);
});

app.get("/c", (req, res) => {
  const users = [
    { name: "Leanne Graham b" },
    { name: "Ervin Howell b" },
    { name: "Clementine Bauch b" },
    { name: "Patricia Lebsack b" },
  ];
  res.json({ users });
});


app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
