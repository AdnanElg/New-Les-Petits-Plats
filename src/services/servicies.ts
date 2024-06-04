// Importer les recettes depuis le fichier de données
import { recipes } from "../data/recipes";
// CardType est importé depuis le fichier cards.types situé dans le dossier types
import { CardType } from "../types/cards.types";

export const services = {
  // Récupérer toutes les recettes
  getAllRecipes(): CardType[] {
    try {
      return recipes as CardType[];
    } catch (error) {
      throw new Error(`Error retrieving recipes : ${error}`);
    }
  },

  // Récupérer tous les ingrédients
  getAllIngredients() {
    try {
      // Extraire tous les ingrédients des recettes
      const ingredientsArrays = recipes
        .map((recipe) => recipe.ingredients)
        .flat()
        .map((ingredient) => ingredient.ingredient.toLowerCase());

      // Convertir les ingrédients en minuscules et éliminer les doublons
      const allIngredientsSet = new Set(ingredientsArrays);
      const allIngredients = Array.from(allIngredientsSet);
      console.log(allIngredients);
      return allIngredients;
    } catch (error) {
      throw new Error(`Error retrieving ingredients : ${error}`);
    }
  },

  // Récupérer tous les appareils
  getAllAppliances() {
    try {
      // Extraire tous les appareils des recettes
      const applianceArrays = recipes.map((recipe) =>
        recipe.appliance.toLowerCase()
      );

      // Convertir les appareils en minuscules et éliminer les doublons
      const allApplianceSet = new Set(applianceArrays);
      const allAppliance = Array.from(allApplianceSet);
      console.log(allAppliance);
      return allAppliance;
    } catch (error) {
      throw new Error(`Error recovering appliance : ${error}`);
    }
  },

  // Récupérer tous les ustensiles
  getAllUstensils() {
    try {
      // Extraire tous les ustensiles des recettes
      const ustensilsArrays = recipes
        .map((recipe) => recipe.ustensils)
        .flat()
        .map((ustensil: string) => ustensil.toLowerCase());

      // Convertir les ustensiles en minuscules et éliminer les doublons
      const allUstensilsSet = new Set(ustensilsArrays);
      const allUstensils = Array.from(allUstensilsSet);
      console.log(allUstensils);
      return allUstensils;
    } catch (error) {
      throw new Error(`Error retrieving utensils : ${error}`);
    }
  },
};
