import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Import du routeur qui gère les chatons
import kittensRouter from "./routers/kittens.js";

// Création de l'app Express
const app = express();
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware pour gérer les URLs vers les fichiers statiques se trouvants dans /public/
app.use(express.static(path.join(__dirname, "public")));

// Utilisation du routeur chatons comme middleware
app.use(kittensRouter);

// DÉMARRAGE DE L'APP EXPRESS
app.listen(port, () => {
  console.log(`App démarrée sur http://localhost:${port}`);
});
