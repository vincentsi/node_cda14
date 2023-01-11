import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const { APP_LOCALHOST_B: hostname, APP_PORT_B: port } = process.env;
const app = express();

app.use(cors());

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
