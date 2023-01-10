import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getKittens(req, res) {


  // Construit le chemin absolu vers "kittens.json"
  const fileToRead = path.join(__dirname, "..", "data_kittens", "kittens.json");

  // Lecture du contenu de "kittens.json" de façon synchrone (pour simplifier)
  const kittens = JSON.parse(fs.readFileSync(fileToRead, "utf-8"));

  // Construction de la liste des chats en HTML
  let kittensHTML = "";
  for (const { id, name, image } of kittens) {
    kittensHTML += `<div class="kitten">
                          <a href="/kitten/${id}">${name}</a>
                          <img src="/images/${image}" alt="Photo de ${name}" />
                        </div>`;
  }

  // Envoi de la page complète au client
  res.send(
    `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <title>Kittens - Liste des chatons</title>
          <link rel="stylesheet" href="/css/styles.css" type="text/css" />
        </head>
        <body>
          <div class="container">
            <nav>
              <ul>
                <li>Kittens</li>
                <li><a class="active">Home</a></li>
              </ul>
            </nav>
          </div>
          <div class="container">${kittensHTML}</div>
        </body>
      </html>`
  );
}

export function getKitten(req, res) {
  const { id } = req.params;

  // Construit le chemin absolu vers "<id>.json"
  const fileToRead = path.join(__dirname, "..", "data_kittens", `${id}.json`);

  // On vérifie que l'ID est bien numérique, et que le fichier à lire existe bel et bien !
  if (isNaN(Number(id)) || !fs.existsSync(fileToRead)) {
    res.status(404).send("La ressource demandée n'existe pas");
    return;
  }

  // Lecture du contenu de "<id>.json" de façon synchrone (pour simplifier)
  const kitten = JSON.parse(fs.readFileSync(fileToRead, "utf-8"));

  const { name, image, age, description } = kitten;

  res.send(
    `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8" />
            <title>Kittens - ${name}</title>
            <link rel="stylesheet" href="/css/styles.css" type="text/css" />
          </head>
          <body>
            <div class="container">
              <nav>
                <ul>
                  <li>Kittens</li>
                  <li><a href="/">Home</a></li>
                </ul>
              </nav>
            </div>
            <div class="container">
              <div>
                <h2>${name}</h2>
                <p>Age : ${age}</p>
                <p>${description}</p>
                <img src="/images/${image}" />
              </div>
            </div>
          </body>
        </html>`
  );
}
