// Import modules
import { CardType } from "../types/cards.types";

// Définition de la fonction cards
export const cards = (card: CardType) => {
  // Crée un élément de div pour contenir la carte
  const cardElements = document.createElement("div");
  cardElements.classList.add("col-2lg-4", "col-md-6", "mb-5", "pb-3");

  // Fonction pour obtenir les détails d'un ingrédient à un index donné
  const getIngredientDetails = (index: number) => {
    // Vérifie si les ingrédients existent et si l'ingrédient à l'index donné existe
    return card.ingredients && card.ingredients[index]
      ? `
        <div class='d-block mb-3 h-25'>
          <p class="m-0 fw-medium">${card.ingredients[index].ingredient}</p>
          <span class="text-tertiary">${
            card.ingredients[index].quantity || ""
          } ${card.ingredients[index].unit || ""}</span>
        </div>`
      : "";
  };

  // Modèle HTML pour la carte de recette
  const cardTemplate = `
    <article class="card border-0 shadow-lg key-${card.id}" id="card">
      <img class="card-img-top" src="./src/assets/img/${card.image}" alt="${
    card.name
  }" />
      <div class="d-flex justify-content-center align-items-center position-absolute bg-warning rounded-5 px-3 py-1 m-3 end-0">
        <p class="m-0">${card.time} min</p>
      </div>
      <div class="card-body mt-3">
        <h5 class="card-title font-anton">${card.name}</h5>
        <div class="mt-5 recipe-description">
          <h6 class="mb-3 fw-bold">RECETTE</h6>
          <p class="card-text text-start">${card.description}</p>
        </div>
        <div class="mt-5 recipe-ingredient pb-3">
          <h6 class="mb-3 fw-bold">INGRÉDIENTS</h6>
          <div class="d-flex justify-content-between align-items-start w-lg-90">
            <div class="d-flex flex-column justify-content-start align-items-start">
              ${getIngredientDetails(0)}
              ${getIngredientDetails(2)}
              ${getIngredientDetails(4)}
            </div>
            <div class="d-flex flex-column justify-content-start align-items-start">
              ${getIngredientDetails(1)}
              ${getIngredientDetails(3)}
              ${getIngredientDetails(5)}
            </div>
          </div>
        </div>
      </div>
    </article>
  `;

  // Ajoute le modèle HTML à l'élément de carte
  cardElements.innerHTML = cardTemplate;
  return cardElements;
};
