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

/**
 * Fonction qui insère le résultat à l’endroit prévu dans la page HTML
 * @param {number} scoreObtenu : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(scoreObtenu, nbMotsProposes) {
  let spanScore = document.querySelector(".zoneScore span");
  let affichageScore = `${scoreObtenu} / ${nbMotsProposes}`;
  spanScore.innerHTML = affichageScore;
}

/**
 * Fonction qui affiche à chaque fois un mot de la liste dans l’ordre défini
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerText = proposition;
}

/**
 * Cette fonction construit et affiche l'email.
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score
 */
function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score QwerType&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site de QwerType !`;
  location.href = mailto;
}

/**
 * Fonction qui va prendre le nom à tester en paramètre et retourner true si le nom est valide, false sinon
 * @param {string} nom : le nom à tester
 */
function validerNom(nom) {
  let regex = new RegExp("^[A-Za-z]{2,}$");
  let isValid = regex.test(nom);
  return isValid;
}

/**
 * Fonction qui va prendre l'e-mail à tester en paramètre et retourner true si l'e-mail est valide, false sinon
 * @param {string} email : l'e-mail à tester
 */
function validerEmail(email) {
  let regex = new RegExp(
    '^(?=.{1,254}$)(?=.{1,64}@)[^\\s"(),:;<>@\\[\\\\\\]]+(?:\\.[^\\s"(),:;<>@\\[\\\\\\]]+)*@[^\\s"(),:;<>@\\[\\\\\\]]+\\.[^\\s"(),:;<>@\\[\\\\\\]]{2,}$',
    "u"
  );
  let isValid = regex.test(email);
  return isValid;
}

/*
 * Fonction qui lance le jeu
 */
function lancerJeu() {
  // Initialisation
  initAddEventListenerPopup();
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

  // Récupérer la balise form
  let baliseForm = document.querySelector("form");
  // Récupérer les valeurs de nom, email et appeler la fonction afficherEmail
  baliseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputNom = document.getElementById("nom");
    let nom = inputNom.value;

    let inputEmail = document.getElementById("email");
    let email = inputEmail.value;

    let isNomValid = validerNom(nom);
    let isEmailValid = validerEmail(email);

    
    // Rédiger et envoyer le mail
    if (isNomValid && isEmailValid) {
      // Composer le score
      let scoreEmail = `${score}/${i}`;
      afficherEmail(nom, email, scoreEmail);
    } else {
      console.log("Les champs ne sont pas valides, veuillez les remplir correctement !");
    }
  });

  // Affichage du score au début
  afficherResultat(score, i);
}
