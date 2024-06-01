// Import des modules
import { recipes } from "../data/recipes.ts";
import { cards } from "../components/cards.ts";

export const launchSearch = () => {
  // Récupération des tags sélectionnés de la section :
  const tagsList = document.querySelectorAll("#lists-tag");
  const selectedTagsList = Array.from(tagsList, (tag) => tag.textContent);

  // Récupération de la valeur saisie dans l'input de recherche
  var searchInput = document.querySelector("#search-input") as HTMLInputElement;
  if (searchInput) {
    var searchTerm = searchInput.value.toLowerCase();
    console.log(searchTerm);
  }

  // Tableau pour stocker les recettes trouvées
  var foundRecipes = [];

  // Parcours des recettes pour filtrer en fonction des critères sélectionnés
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Récupération des ingrédients de la recette
    const recipeIngredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i];
      if (ingredient && ingredient.ingredient) {
        recipeIngredients.push(ingredient.ingredient.toLowerCase());
      }
    }

    // Récupération des ustensiles de la recette
    const recipeUstensils = [];
    for (let i = 0; i < recipe.ustensils.length; i++) {
      const ustensil = recipe.ustensils[i];
      if (ustensil) {
        recipeUstensils.push(ustensil.toLowerCase());
      }
    }

    // Variables pour les contrôles des critères de filtrage
    let checkUstensil = true;
    let checkDevice = true;
    let checkIngredient = true;
    let checkSearch = true;

    // Vérification des tags d'ingrédients sélectionnés
    if (selectedTagsList.length > 0) {
      let i = 0;
      while (i < selectedTagsList.length) {
        let tag = selectedTagsList[i].trim();
        if (!recipeIngredients.includes(tag.toLowerCase())) {
          checkIngredient = false;
        }
        i++;
      }
    }

    // //? Vérification des tags d'appareils sélectionnés
    if (selectedTagsList.length > 0) {
      let i = 0;
      while (i < selectedTagsList.length) {
        let tag = selectedTagsList[i].trim();
        if (!recipe.appliance.toLowerCase().includes(tag.toLowerCase())) {
          checkDevice = false;
        }
        i++;
      }
    }

    //? Vérification des tags d'ustensiles sélectionnés
    if (selectedTagsList.length > 0) {
      let i = 0;
      while (i < selectedTagsList.length) {
        let tag = selectedTagsList[i].trim();
        if (!recipeUstensils.includes(tag.toLowerCase())) {
          checkUstensil = false;
        }
        i++;
      }
    }

    //? Vérification du critère de recherche textuelle
    if (searchTerm.length >= 3) {
      if (
        !recipe.name.toLowerCase().includes(searchTerm) &&
        !recipeIngredients.includes(searchTerm) &&
        !recipe.description.toLowerCase().includes(searchTerm)
      ) {
        checkSearch = false;
      }
    }

    //? Ajout de la recette au tableau des recettes trouvées
    if (checkUstensil && checkDevice && checkIngredient && checkSearch) {
      foundRecipes.push(recipe);
    }
  }
};
