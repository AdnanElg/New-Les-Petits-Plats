export const createTags = () => {
  // Sélectionne tous les éléments dont l'id commence par "select-"
  const dropdowns = document.querySelectorAll("[id^='select-']");

  // Pour chaque élément sélectionné
  dropdowns.forEach((dropdown) => {
    // Sélectionne l'élément ul à l'intérieur du dropdown
    const list = dropdown.querySelector("ul");
    // Sélectionne la liste déroulante par son id dynamique
    const dropdownId = dropdown.id.split("-")[1];
    const dropdownList = document.querySelector(
      `.content--active-${dropdownId}`
    );

    // Tableau pour stocker les tags cliqués
    const clickedTags: string[] = [];
    // Sélectionner la liste des tags
    const tagsList = document.querySelector("#lists-tag") as HTMLElement;
    // Sélectionner la section des tags
    const sectionTags = document.querySelector(".section-tag") as HTMLElement;

    // Fonction pour mettre à jour l'affichage de la section des tags
    const updateSectionTagsDisplay = () => {
      if (tagsList.children.length === 0) {
        sectionTags.style.display = "none";
      } else {
        sectionTags.style.display = "block";
      }
    };

    // Initialiser l'affichage de la section des tags
    updateSectionTagsDisplay();

    // Sélectionner tous les éléments li à l'intérieur du ul
    if (list && tagsList && sectionTags) {
      const listItems = list.querySelectorAll("li");
      listItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          // Vérifiez que e.target est un élément HTML
          const target = e.target as HTMLElement;
          if (target && target.textContent) {
            // Renvoie l'élément cliqué sans les espaces
            const itemText = target.textContent.trim();
            // Vérifier si l'élément a déjà été cliqué
            if (!clickedTags.includes(itemText)) {
              // Ajouter l'élément au tableau des tags cliqués
              clickedTags.push(itemText);
              // Créer un nouvel élément li pour afficher l'élément cliqué
              const newTag = document.createElement("li");
              // Ajouter un id et une classe à l'élément li
              newTag.id = "tag";
              newTag.classList.add(
                "p-3",
                "bg-warning",
                "rounded",
                "d-flex",
                "justify-content-between",
                "align-items-center",
                "fs-6",
                "fw-medium",
                "rounded-3",
                "gap-3"
              );
              newTag.innerHTML = `${itemText} <img src="./src/assets/svg/close-tag.svg" alt="icône close" />`;
              // Ajouter le nouvel élément li à la liste des tags
              tagsList.append(newTag);
              // Mettre à jour l'affichage de la section des tags
              updateSectionTagsDisplay();
              // Fermer la liste déroulante
              (dropdownList as HTMLElement).style.display = "none";

              // Appliquer les styles pour l'élément li cliqué
              const li = item;
              li.style.backgroundColor = "#FFD15B";
              li.style.fontWeight = "bold";

              // Sélectionner et afficher l'élément tag-active
              const tagActive = item.querySelector(".tag-active");
              if (tagActive) {
                (tagActive as HTMLElement).style.display = "block";
              }

              // Attacher un événement click au tag nouvellement créé pour le supprimer
              const tagCloseBtn = newTag.querySelector("img");
              if (tagCloseBtn) {
                tagCloseBtn.addEventListener("click", (e) => {
                  e.preventDefault();
                  newTag.remove();
                  const tagIndex = clickedTags.indexOf(itemText);
                  if (tagIndex !== -1) {
                    clickedTags.splice(tagIndex, 1);
                    li.style.backgroundColor = "#FFF";
                    li.style.fontWeight = "inherit";
                    if (tagActive) {
                      (tagActive as HTMLElement).style.display = "none";
                    }
                    // Mettre à jour l'affichage de la section des tags
                    updateSectionTagsDisplay();
                  }
                });
              }

              // Ajouter un événement click sur tagActive pour supprimer le style
              tagActive?.addEventListener("click", () => {
                li.style.backgroundColor = "#FFF";
                li.style.fontWeight = "inherit";
                (tagActive as HTMLElement).style.display = "none";
                const tagIndex = clickedTags.indexOf(itemText);
                if (tagIndex !== -1) {
                  clickedTags.splice(tagIndex, 1);
                }
                newTag.remove();
                // Mettre à jour l'affichage de la section des tags
                updateSectionTagsDisplay();
              });
            }
          }
        });
      });
    }
  });
};
