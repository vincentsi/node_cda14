import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

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

// ==========
// App routes
// ==========

app.get("/", async (req, res) => {
  let response = await axios.get('https://jsonplaceholder.typicode.com/users')
  .then( res => res);
  res.json(response.data);
});

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
