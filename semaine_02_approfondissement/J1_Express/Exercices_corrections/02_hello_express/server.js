import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome !</h1>
    <p>Quelques routes :</p>
    <code>
      <ul>
        <li><a href="/search/?term=Texte&filterBy=date">/search/?term=Texte&filterBy=date</a></li>
        <li><a href="/users/Dave/stats">/users/Dave/stats</a></li>
        <li><a href="/dont-exists">/dont-exists</a>
      </ul>
    </code>
    <p>Et une image statique :</p>
    <img src="/images/banner.jpg" alt="Makati Skyline">
  `);
});

app.get("/search", (req, res) => {
  const { term, filterBy } = req.query;
  if(term == "Image"){
    res.send(`
    <h1>Recherche filtré par "${filterBy}"</h1>
    <p><a href="/">« Retour</a></p>
  `);
  }
  else{
    res.send(`
    <h1>Recherche de "${term}" filtré par "${filterBy}"</h1>
    <p><a href="/">« Retour</a></p>
  `);
  }
  }
 
);

app.get("/users/:name/stats", (req, res) => {
  const { name } = req.params;
  res.send(`
    <h1>Stats de ${name}</h1>
    <p><a href="/">« Retour</a></p>
  `);
});

app.get("/unauthorised", (req, res) => {
  res.status(401).send(`
    <h1>Route non accessible</h1>
    <p><a href="/">« Retour</a></p>
  `)
});
// Route finale, pour gérer les 404 manuellement
app.get("*", (req, res) => {
  res.status(404).send(`
    <h1>Route introuvable</h1>
    <p><a href="/">« Retour</a></p>
  `)
});

app.listen(port, () => console.log(`App démarrée sur http://localhost:${port}`));