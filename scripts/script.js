/*
Ce fichier contient toutes les fonctions nécessaires au fonctionnement du lancerJeu.
 */

// La fonction qui demande à l'utilisateur de choisir une liste de mots ou de phrases
/* function choisirPhrasesOuMots() {
  let choix = prompt(
    "Veuillez choisir la liste: mots ou phrases. Pour choisir, tapez 'mots' ou 'phrases'."
  );
  while (choix !== "mots" && choix !== "phrases") {
    choix = prompt("Erreur de saisie. Tapez 'mots' ou 'phrases'.");
  }
  return choix;
} */

/*
 * Fonction qui insère le résultat à l’endroit prévu dans la page HTML
 */
function afficherResultat(scoreObtenu, nbMotProposes) {
  let spanScore = document.querySelector(".zoneScore span");
  let affichageScore = `${scoreObtenu} / ${nbMotProposes}`;
  spanScore.innerHTML = affichageScore;
}

/*
 * Fonction qui affiche à chaque fois un mot de la liste dans l’ordre défini
 */
function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerText = proposition;
}

/*
 * Fonction qui lance le jeu
 */
function lancerJeu() {
  // Initialisation
  let score = 0;
  let i = 0;
  // Récupération des éléments "bouton de validation" et "champ de saisie" depuis le DOM
  let btnValiderMot = document.getElementById("btnValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");
  // Affichage du premier mot dès le début
  afficherProposition(listeMots[i]);
  // Instructions exécutées lorsque l'utilisateur clique sur le bouton
  btnValiderMot.addEventListener("click", () => {
    //Si le texte saisi par l'utilisateur correspond au mot proposé, on augmente le score
    if (inputEcriture.value === listeMots[i]) {
      score++;
    }
    // Incrémentation du compteur
    i++;
    // Appel de la fonction pour afficher le score
    afficherResultat(score, i);
    // Vider le champ de saisie
    inputEcriture.value = "";
    // Si l'on dépasse le nombre maximal de mots, le jeu est terminé. Sinon on continue.
    if (listeMots[i] === undefined) {
      afficherProposition("Le jeu est fini");
      btnValiderMot.disabled = true;
    } else {
      afficherProposition(listeMots[i]);
    }
  });
  // Affichage du score au début
  afficherResultat(score, i);
}
