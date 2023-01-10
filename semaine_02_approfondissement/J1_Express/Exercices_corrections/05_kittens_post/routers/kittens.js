import { Router } from "express";

// Import des contrôleurs
import { getFormKitten, getKitten, getKittens, postKitten } from "../controllers/kittens.js";

// Création du routeur
const kittensRouter = Router();

// Déclaration des routes
kittensRouter.get("/", getKittens);
kittensRouter.get("/kitten/:id", getKitten);
kittensRouter.get("/add", getFormKitten);
kittensRouter.post("/add", postKitten);

export default kittensRouter;
