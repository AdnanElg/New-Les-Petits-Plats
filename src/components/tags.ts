// Définition de la fonction tags
export const tags = () => {
  // Création d'un nouvel élément div pour contenir la liste de balises
  const tagsListElement = document.createElement("div");

  // Ajout d'une classe container-fluid à l'élément div
  tagsListElement.classList.add("container-fluid");

  // Modèle de balises HTML dans une chaîne de caractères template
  const tagsTemplate = `
    <ul id="lists-tag" class='d-flex justify-content-start align-items-start flex-wrap p-0 gap-4'>
        
    </ul>
  `;

  // Insertion du modèle de balises dans l'élément div
  tagsListElement.innerHTML = tagsTemplate;

  // Retour de l'élément div contenant la liste de balises
  return tagsListElement;
};
