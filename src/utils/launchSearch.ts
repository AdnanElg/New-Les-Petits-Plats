// Import des modules
import { recipes } from "../data/recipes.ts";
import { cards } from "../components/cards.ts";
import { CardType } from "../types/cards.types.ts";

export const launchSearch = () => {
  // Récupération des tags sélectionnés de la section :
  const tagsList = document.querySelectorAll("#lists-tag");
  const selectedTagsList = Array.from(
    tagsList,
    (tag) => tag.textContent?.trim().toLowerCase() || ""
  );

  // Récupération de la valeur saisie dans l'input de recherche
  const searchInput = document.querySelector(
    "#search-input"
  ) as HTMLInputElement;
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

  // Tableau pour stocker les recettes trouvées
  const foundRecipes = [];

  // Parcours des recettes pour filtrer en fonction des critères sélectionnés
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Récupération des ingrédients de la recette
    const recipeIngredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );

    // Récupération des ustensiles de la recette
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    // Variables pour les contrôles des critères de filtrage
    let checkUstensils = true;
    let checkAppliances = true;
    let checkIngredients = true;
    let checkSearch = true;

    // Vérification des tags d'ingrédients sélectionnés
    for (const tag of selectedTagsList) {
      if (tag && !recipeIngredients.includes(tag)) {
        checkIngredients = false;
        break;
      }
    }

    // Vérification des tags d'appareils sélectionnés
    for (const tag of selectedTagsList) {
      if (tag && !recipe.appliance.toLowerCase().includes(tag)) {
        checkAppliances = false;
        break;
      }
    }

    // Vérification des tags d'ustensiles sélectionnés
    for (const tag of selectedTagsList) {
      if (tag && !recipeUstensils.includes(tag)) {
        checkUstensils = false;
        break;
      }
    }

    // Vérification du critère de recherche textuelle
    if (searchTerm.length >= 3) {
      if (
        !recipe.name.toLowerCase().includes(searchTerm) &&
        !recipeIngredients.includes(searchTerm) &&
        !recipe.description.toLowerCase().includes(searchTerm)
      ) {
        checkSearch = false;
      }
    }

    // Ajout de la recette au tableau des recettes trouvées
    if (checkUstensils && checkAppliances && checkIngredients && checkSearch) {
      foundRecipes.push(recipe as CardType);
    }
  }

  // Récupération de la section des cartes
  const cardsSection = document.querySelector("#section-3 .row");

  // Affichage des résultats ou du message d'aucune recette trouvée
  if (cardsSection) {
    if (foundRecipes.length === 0) {
      cardsSection.innerHTML = `
        <p class="text-center display-6">
          Désolé, aucune recette ne correspond à votre recherche pour <span class='fw-bold'>${searchTerm}</span>. 
          Veuillez essayer avec d'autres mots-clés :(
        </p>`;
    } else {
      cardsSection.innerHTML = "";
      foundRecipes.forEach((recipe) => {
        cardsSection.append(cards(recipe));
      });
    }
  }
};
