import express from "express";
import dotenv from "dotenv";
import session from "express-session";

const app = express();

dotenv.config();
const {
  APP_LOCALHOST: hostname,
  APP_PORT: port
} = process.env;

app.use(express.json());
app.use(
  session({
    name: "simple",
    secret: "simple",
    resave: false,
    saveUninitialized: true,
  })
);

const register = (req, res, next) => {
  console.log(req.session);
  next();
}

app.use(register);

app.get("/", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  if (req.session.count && req.session.count >= 10) {
    res.redirect("/check");

    return;
  }

  res.json({ message: "Hello World", count: req.session.count });
});

app.get("/check", (req, res) => {
  res.json({ message: "Redirection", count: req.session.count });
});

app.get("/delete", (req, res) => {
  req.session.count = 0;
  res.redirect('/');
});

app.listen(port, () => {

  console.log(`Example app listening at http://${hostname}:${port}`);
});