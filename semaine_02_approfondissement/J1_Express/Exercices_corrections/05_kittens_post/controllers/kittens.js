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
    const kittenImage = image.startsWith("http")
      ? image
      : `/images/${image}`;

    kittensHTML += `<div class="kitten">
                          <a href="/kitten/${id}">${name}</a>
                          <img src="${kittenImage}" alt="Photo de ${name}" />
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
                <li><a href="/add">Add</a></li>
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

  const kittenImage = image.startsWith("http")
    ? image
    : `/images/${image}`;

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
                  <li><a href="/add">Add</a></li>
                </ul>
              </nav>
            </div>
            <div class="container">
              <div>
                <h2>${name}</h2>
                <p>Age : ${age}</p>
                <p>${description}</p>
                <img src="${kittenImage}" />
              </div>
            </div>
          </body>
        </html>`
  );
}

export function getFormKitten(req, res) {
  // Récupération d'une possible erreur dans l'URL
  const { error } = req.query;

  // Envoi du formulaire au client
  res.send(
    `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Kittens - Ajouter un chaton</title>
          <link rel="stylesheet" href="/css/styles.css" type="text/css" />
        </head>
        <body>
          <div class="container">
            <nav>
              <ul>
                <li>Kittens</li>
                <li><a href="/">Home</a></li>
                <li><a class="active">Add</a></li>
              </ul>
            </nav>
          </div>
          ${(error && error.trim() !== "")
          ? `<div class="container error">${decodeURIComponent(error)}</div>`
          : ``}
          <div class="container">
            <form action="/add" method="post">
              Nom : <input type="text" name="name" placeholder="Nyan"><br>
              Age : <input type="number" name="age" placeholder="2" min="0"><br>
              Photo : <input type="text" name="image" placeholder="https://placekitten.com/489/640"><br>
              Description : <input type="text" name="description" placeholder="Super Nyan cat …"><br>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </body>
      </html>`
  );
}

export function postKitten(req, res) {
  // Extraction des données depuis "req.body" (fourni par express.urlencoded() dans server.js)
  const { name, age, image, description } = req.body;

  // Vérification des données envoyées
  if (
    name.trim() === "" ||
    age.trim() === "" ||
    image.trim() === "" ||
    description.trim() === ""
  ) {
    const errorMessage = "Tous les champs sont obligatoires !";
    res.redirect(`/add?error=${encodeURIComponent(errorMessage)}`);
    return;
  }

  if (isNaN(Number(age)) || Number(age) < 0) {
    const errorMessage = "L'age n'est pas valide (entier > 0 uniquement)";
    res.redirect(`/add?error=${encodeURIComponent(errorMessage)}`);
    return;
  }

  if (!image.startsWith("https://placekitten.com")) {
    const errorMessage = "La photo doit provenir du service PlaceKitten";
    res.redirect(`/add?error=${encodeURIComponent(errorMessage)}`);
    return;
  }

  // Si on arrive ici, tout est OK.
  // On va d'abord lire le contenu de "kittens.json" pour en extraire l'ID le plus grand,
  //  et l'incrémenter pour construire le nouvel ID

  const fileToRead = path.join(__dirname, "..", "data_kittens", "kittens.json");
  const kittens = JSON.parse(fs.readFileSync(fileToRead, "utf-8"));

  const lastInsertId = Math.max(...kittens.map((k) => k.id));
  const newId = lastInsertId + 1;

  const newCat = {
    id: newId,
    name,
    image,
    age: Number(age),
    description,
  };

  try {
    // Ajout du nouveau chat dans le tableau et réécriture du fichier "kittens.json"
    kittens.push(newCat);
    fs.writeFileSync(fileToRead, JSON.stringify(kittens, null, 4), "utf8");

    // Création du fichier <id>.json avec le contenu du nouveau chaton
    const fileToCreate = path.join(__dirname, "..", "data_kittens", `${newId}.json`);
    fs.writeFileSync(fileToCreate, JSON.stringify(newCat, null, 4), "utf8");
  } catch (err) {
    res.status(500).send(`Erreur lors de la création du chat : ${err.message}`);
    return;
  }

  // Tout est ok, redirection vers l'accueilff
  res.redirect("/");
}
