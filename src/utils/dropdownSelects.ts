export const dropdownSelects = () => {
  // Sélectionne tous les éléments dont l'id commence par "select-"
  const dropdowns = document.querySelectorAll("[id^='select-']");

  // Pour chaque élément sélectionné
  dropdowns.forEach((dropdown) => {
    // Extrait la partie de l'id après "select-"
    const dropdownId = dropdown.id.split("-")[1];

    // Sélectionne l'élément correspondant avec la classe dynamique
    const dropdownList = document.querySelector(
      `.content--active-${dropdownId}`
    );

    // Sélectionne la flèche à l'intérieur du bouton du dropdown actuel
    const dropdownArrow = dropdown.querySelector(".select-btn img");

    // Sélectionne les input à l'intérieur du bouton du dropdown actuel
    const dropdownSearch = dropdown.querySelector(
      ".search input"
    ) as HTMLInputElement;

    // Sélectionne le bouton de fermeture de la recherche
    const closeSearchButton = dropdown.querySelector(".close-search");

    if (closeSearchButton) {
      // Cache le bouton de fermeture de la recherche au chargement de la page
      closeSearchButton.classList.add("close-search--active");

      // Ajoute un événement "click" au bouton de fermeture de la recherche
      closeSearchButton.addEventListener("click", () => {
        // Efface la valeur de l'input
        dropdownSearch.value = "";
        // Cache le bouton de fermeture
        closeSearchButton.classList.add("close-search--active");
      });
    }

    // Ajoute un événement "click" à l'élément dropdown
    dropdown.addEventListener("click", (e) => {
      // Empêche la propagation de l'événement de clic
      e.stopPropagation();

      // Vérifie si la flèche existe
      if (dropdownArrow) {
        // Si la liste déroulante est affichée, fait pivoter la flèche vers le bas
        if ((dropdownList as HTMLElement).style.display === "block") {
          dropdownArrow.classList.remove("rotate-up");
          dropdownArrow.classList.add("rotate-down");
          // Efface la valeur de l'input de recherche lorsque la liste est fermée
          dropdownSearch.value = "";
          if (closeSearchButton) {
            closeSearchButton.classList.add("close-search--active");
          }
        } else {
          // Sinon, fait pivoter la flèche vers le haut
          dropdownArrow.classList.remove("rotate-down");
          dropdownArrow.classList.add("rotate-up");
        }
      }

      // Ferme toutes les autres listes déroulantes
      const activeDropdownLists = document.querySelectorAll(
        "[class*='content--active-']"
      );
      activeDropdownLists.forEach((list) => {
        // Vérifie que la liste courante n'est pas la même que celle cliquée
        if (list !== dropdownList) {
          (list as HTMLElement).style.display = "none";

          // Réinitialise la flèche de rotation pour les autres dropdowns
          const wrapper = list.closest(".wrapper");
          if (wrapper) {
            const otherArrow = wrapper.querySelector(".select-btn img");
            if (otherArrow) {
              otherArrow.classList.remove("rotate-up");
              otherArrow.classList.add("rotate-down");
            }
            // Efface la valeur de l'input de recherche des autres dropdowns
            const otherSearch = wrapper.querySelector(
              ".search input"
            ) as HTMLInputElement;
            if (otherSearch) {
              otherSearch.value = "";
            }
            const otherCloseButton = wrapper.querySelector(".close-search");
            if (otherCloseButton) {
              otherCloseButton.classList.add("close-search--active");
            }
          }
        }
      });

      // Vérifie si la liste déroulante existe
      if (dropdownList) {
        const dropdownListElement = dropdownList as HTMLElement;

        // Bascule l'affichage entre "block" et "none"
        dropdownListElement.style.display =
          dropdownListElement.style.display === "block" ? "none" : "block";
      }
    });

    // Ajoute un événement "click" à l'élément dropdownList pour empêcher sa fermeture lors d'un clic sur elle
    if (dropdownList) {
      dropdownList.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      // Ajoute un événement "click" à chaque élément li de la liste déroulante pour fermer la liste
      const listItems = dropdownList.querySelectorAll("li");
      listItems.forEach((item) => {
        item.addEventListener("click", () => {
          (dropdownList as HTMLElement).style.display = "none";
          if (dropdownArrow) {
            dropdownArrow.classList.remove("rotate-up");
            dropdownArrow.classList.add("rotate-down");
          }
          // Efface la valeur de l'input de recherche lorsque la liste est fermée
          dropdownSearch.value = "";
          if (closeSearchButton) {
            closeSearchButton.classList.add("close-search--active");
          }
        });
      });
    }

    // Ajoute un événement "input" à l'élément dropdownSearch
    if (dropdownSearch && closeSearchButton) {
      dropdownSearch.addEventListener("input", () => {
        // Si du texte est entré dans le champ de recherche, affiche le bouton de fermeture
        if (dropdownSearch.value.trim().length > 0) {
          closeSearchButton.classList.remove("close-search--active");
        } else {
          // Sinon, cache le bouton de fermeture
          closeSearchButton.classList.add("close-search--active");
        }
      });
    }
  });

  // Ajoute un événement "click" à l'ensemble du document pour fermer les listes déroulantes si un clic se produit en dehors
  document.addEventListener("click", () => {
    const activeDropdownLists = document.querySelectorAll(
      "[class*='content--active-']"
    );

    // Pour chaque liste active, définit son affichage sur "none" pour la fermer
    activeDropdownLists.forEach((list) => {
      (list as HTMLElement).style.display = "none";

      // Réinitialise la flèche de rotation pour tous les dropdowns
      const wrapper = list.closest(".wrapper");
      if (wrapper) {
        const dropdownArrow = wrapper.querySelector(".select-btn img");
        if (dropdownArrow) {
          dropdownArrow.classList.remove("rotate-up");
          dropdownArrow.classList.add("rotate-down");
        }
        // Efface la valeur de l'input de recherche de tous les dropdowns
        const dropdownSearch = wrapper.querySelector(
          ".search input"
        ) as HTMLInputElement;
        if (dropdownSearch) {
          dropdownSearch.value = "";
        }
        const closeSearchButton = wrapper.querySelector(".close-search");
        if (closeSearchButton) {
          closeSearchButton.classList.add("close-search--active");
        }
      }
    });
  });
};
