// La fonction qui demande à l'utilisateur de choisir une liste de mots ou de phrases
function choisirPhrasesOuMots() {
  let choix = prompt(
    "Veuillez choisir la liste: mots ou phrases. Pour choisir, tapez 'mots' ou 'phrases'."
  );
  while (choix !== "mots" && choix !== "phrases") {
    choix = prompt("Erreur de saisie. Tapez 'mots' ou 'phrases'.");
  }
  return choix;
}

// La fonction qui fait parcourir la liste et qui calcule le score
function lancerBoucleDeJeu(liste) {
  let score = 0;
  for (let i = 0; i < liste.length; i++) {
    let saisie = prompt("Entrez le mot :" + liste[i]);
    if (saisie === liste[i]) {
      score++;
    }
  }
  return score;
}

// La fonction qui génère le résultat sous forme de phrase
function afficherResultat(scoreObtenu, nombreMotProposes) {
  console.log("Votre score est de " + scoreObtenu + " sur " + nombreMotProposes);
}

// La fonction qui lance le jeu
function lancerJeu() {
  const choix = choisirPhrasesOuMots();
  let liste;
  if (choix === "mots") {
    liste = listeMots;
  } else {
    liste = listePhrases;
  }

  const scoreObtenu = lancerBoucleDeJeu(liste);
  afficherResultat(scoreObtenu, liste.length);
}
