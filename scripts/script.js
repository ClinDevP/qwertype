/*
Ce fichier contient toutes les fonctions nécessaires au fonctionnement du lancerJeu.
 */

/*
 *La fonction qui demande à l'utilisateur de choisir une liste de mots ou de phrases
 */
/* function choisirPhrasesOuMots(liste) {
  let optionSource = document.querySelectorAll("input[type='radio']");
  let valeurChoix = "";
  for (i = 0; i < optionSource.length; i++) {
    if (optionSource[i].checked) {
      valeurChoix = optionSource[i].value;
      break;
    }
  }

  if (valeurChoix === "1") {
    liste = listeMots;
  } else {
    liste = listePhrases;
  }

  return liste;
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
  let listeProposition = listeMots;

  // Récupération des éléments "input radio mots", "bouton de validation" et "champ de saisie" depuis le DOM
  let btnValiderMot = document.getElementById("btnValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");

  // Afficher le premier texte dès le début
  afficherProposition(listeProposition[i]);

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

  // Écouter le choix de l'utilisateur (mots/phrases)
  let listeBtnRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      // Si c'est le premier élément qui a été modifié, alors nous voulons
      // jouer avec la listeMots.
      if (event.target.value === "1") {
        listeProposition = listeMots;
      } else {
        // Sinon nous voulons jouer avec la liste des phrases
        listeProposition = listePhrases;
      }
      // Afficher le texte selon le choix de l'utilisateur
      afficherProposition(listeProposition[i]);
    });
  }

  // Affichage du score au début
  afficherResultat(score, i);
}
