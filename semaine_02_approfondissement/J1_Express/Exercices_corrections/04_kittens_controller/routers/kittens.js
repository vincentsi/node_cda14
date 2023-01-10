import { Router } from "express";

// Import des contrôleurs
import { getKitten, getKittens } from "../controllers/kittens.js";

// Création du routeur
const kittensRouter = Router();

// Déclaration des routes
kittensRouter.get("/", getKittens);
kittensRouter.get("/kitten/:id", getKitten);

export default kittensRouter;
