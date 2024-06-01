// Importe le module services
import { services } from "./services/servicies";
// Importe le module dropdowns
import { dropdowns } from "./components/dropdowns";
// Importe le module tags
import { tags } from "./components/tags";
// Importe le module cards
import { cards } from "./components/cards";

// Déclare une fonction nommée "index"
const index = () => {
  try {
    // Récupère toutes les recettes, ingrédients, appareils et ustensiles
    const recipesAll = services.getAllRecipes();
    const ingredientsAll = services.getAllIngredients();
    const appliancesAll = services.getAllAppliances();
    const ustensilsAll = services.getAllUstensils();

    // Sélectionne les éléments du DOM où les dropdowns et les tags seront ajoutés
    const dropdownsSection = document.querySelector("#section-1");
    const tagsListElement = document.querySelector("#section-2");
    const cardsSection = document.querySelector("#section-3 .row");

    if (dropdownsSection && tagsListElement !== null) {
      // Ajoute les dropdowns et les tags aux sectiopàns correspondantes
      dropdownsSection.append(
        dropdowns(ingredientsAll, appliancesAll, ustensilsAll)
      );
      tagsListElement.append(tags());
    }

    if (cardsSection) {
      // Ajoute chaque recette à la section des cartes
      recipesAll.forEach((recipe) => {
        cardsSection.append(cards(recipe));
      });
    }
  } catch (error) {
    console.error("Error loading recipes :", error);
  }
};

// Exécute la fonction index
index();
