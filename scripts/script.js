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
 * Fonction qui va prendre le nom à tester en paramètre et valider qu'il est au bon format.
 * @param {string} nom : le nom à tester
 * @throws {Error}
 */
function validerNom(nom) {
  let regex = new RegExp("^[A-Za-z]{2,}$");
  if (!regex.test(nom)) {
    throw new Error(`Votre nom "${nom}" ne correspond pas au critère.`);
  }
}

/**
 * Fonction qui va prendre l'e-mail à tester en paramètre et valider qu'il est au bon format.
 * @param {string} email : l'e-mail à tester
 * @throws {Error}
 */
function validerEmail(email) {
  let regex = new RegExp(
    '^(?=.{1,254}$)(?=.{1,64}@)[^\\s"(),:;<>@\\[\\\\\\]]+(?:\\.[^\\s"(),:;<>@\\[\\\\\\]]+)*@[^\\s"(),:;<>@\\[\\\\\\]]+\\.[^\\s"(),:;<>@\\[\\\\\\]]{2,}$',
    "u"
  );
  if (!regex.test(email)) {
    throw new Error(
      `Votre adresse mail "${email}" ne correspond pas au critère.`
    );
  }
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier les messages d'erreurs.
 * @param {string} message
 */
function afficherMessageErreur(message) {
  let spanErreurMessage = document.getElementById("erreur-message");

  if (!spanErreurMessage) {
    let popup = document.querySelector(".popup");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreur-message";
    popup.append(spanErreurMessage);
  }

  spanErreurMessage.innerText = message;
}

/**
 * Fonction qui prend en paramètre le score à envoyer.
 * Récupère les informations dans le formulaire et appelle l'affichage de l'email avec les bon paramètres.
 * @param {string} scoreEmail : le score
 */
function gererFormulaire(scoreEmail) {
  try {
    let inputNom = document.getElementById("nom");
    let nom = inputNom.value;
    validerNom(nom);

    let inputEmail = document.getElementById("email");
    let email = inputEmail.value;
    validerEmail(email);

    afficherMessageErreur("");
    afficherEmail(nom, email, scoreEmail);
  } catch (erreur) {
    // Gérer l'erreur
    afficherMessageErreur(erreur.message);
  }
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

  // Gestion de l'événement submit sur le formulaire de partage
  // Récupérer la balise form
  let baliseForm = document.querySelector("form");
  // Récupérer les valeurs de nom, email et appeler la fonction afficherEmail
  baliseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Composer le score
    let scoreEmail = `${score}/${i}`;
    gererFormulaire(scoreEmail);
  });

  // Affichage du score au début
  afficherResultat(score, i);
}
