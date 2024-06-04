// Import modules
import { recipes } from "../data/recipes";
import { ItemsType } from "../types/dropdowns.types";

// Fonction pour créer un dropdown
const createDropdown = (items: ItemsType, name: string, id: string) => {
  return `
    <div class="w-auto col-lg-2 col-md-4 mb-3">
      <div id="select-${id}" class="wrapper">
        <div class="select-btn bg-white">
          <span>${name}</span>
          <img class="rotate-up rotate-down" src="./src/assets/svg/arrow-bottom.svg" alt="icône arrow-bottom" />
        </div>
        <div class="content bg-white content--active-${id}">
          <div class="search">
            <input class="border border-secondary" type="text" />
            <img class="close-search close-search--active" src="./src/assets/svg/close-tag.svg" alt="icône close" />
            <img src="./src/assets/svg/search-grey.svg" alt="icône search" />
          </div>
          <ul class="options">
          ${Object.values(items)
            .map(
              (item: string) => `
          <li>
            ${item}
            <img class="tag-active" src="./src/assets/svg/close-item.svg" alt="icône close" />
          </li>
        `
            )
            .join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
};

// Exportation de la fonction dropdowns qui prend trois objets en paramètre : ingredients, appliances et ustensils
export const dropdowns = (
  ingredients: ItemsType,
  appliances: ItemsType,
  ustensils: ItemsType
) => {
  // Création d'un élément div et assignation à la variable dropdownsContainer
  const dropdownsContainer = document.createElement("div");

  // Ajout de la classe "container-fluid" à l'élément div créé
  dropdownsContainer.classList.add("container-fluid");

  // Définition d'un modèle (template) pour le contenu HTML des dropdowns
  const dropdownsTemplate = `
    <div class="row">
      <div class="z-2 gap-md-5 col-lg-6 col-md-12 d-flex flex-column flex-md-row">
        ${createDropdown(ingredients, "Ingrédients", "ingredients")}
        ${createDropdown(appliances, "Appareils", "appliances")}
        ${createDropdown(ustensils, "Ustensils", "ustensils")}
      </div>
      <div class="z-1 col-lg-6 col-md-4 custom-flex-recipes">
        <span id="total-recipes" class="fs-4 fw-bold font-anton">${
          recipes.length
        } recettes</span>
      </div>
    </div>
  `;

  // Assignation du modèle HTML à l'intérieur de l'élément div
  dropdownsContainer.innerHTML = dropdownsTemplate;

  // Retourne l'élément div contenant les dropdowns
  return dropdownsContainer;
};
