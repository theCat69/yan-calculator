let currentValue = "";
let storedValue = "";
let storedOperator = "";
let shouldClearAfterFirstDigit = "";

// Affiche la valeur actuel dans l'inputresult
function displayCurrentValue() {
  document.getElementById("inputresult").value = currentValue;
}

// Vide la valeur en cours et affiche un inputresult vide
function clearCurrentValue() {
  currentValue = "";
  displayCurrentValue();
}

// Reset toutes les valeurs par defaut
function clearAllValues() {
  currentValue = "";
  storedValue = "";
  storedOperator = "";
}

// Rajoute un nouveau chiffre a l'inputresult
function storeNewNumber(x) {
  if(shouldClearAfterFirstDigit) {
    currentValue = "";
    shouldClearAfterFirstDigit = false;
  }
  currentValue = currentValue + x;
  displayCurrentValue();
}

// Utilitaire pour ajouter un event listener sur les chiffres pour eviter la repetition
function addEventListenerToDigit(x) {
  document.getElementById(x).addEventListener("click", function() {
    storeNewNumber(x);
  }, false);
}

// Calcul le resultat et affiche 
function compute(x, y, operator) {
  if (operator === "/") {
    currentValue = Number(x) / Number(y);
  } else if (operator === "*") {
    currentValue = Number(x) * Number(y);
  } else if (operator === "-") {
    currentValue = Number(x) - Number(y);
  } else {
    currentValue = Number(x) + Number(y);
  } 
  displayCurrentValue();
}

// Stock l'operateur choisi et calcul si necessaire 
function storeOperator(operator) {
  // On verifie qu'un nombre a ete rentre a priori
  if (currentValue === "") {
    alert("You should enter a number first");
    return;
  }

  // Est ce qu'on doit vider la zone inputresult ? on le fait si c'est le premier operateur
  // Sinon on affichera le resultat de l'operation
  let shouldClear = false;

  // On regarde si la valeur stocke est presente : dans ce cas on fait le calcul
  // sinon on demande de vider la zone inputresult
  if (storedValue !== "") {
    compute(storedValue, currentValue, storedOperator);
  } else {
    shouldClear = true;
  }

  // Passage de la valeur actuel a une valeur stocke pour pouvoir faire l'operation dessus plus tard
  storedValue = currentValue;
  storedOperator = operator;

  // Si on doit vider immediatement on le fait sinon on videra la zone inputresult
  // Apres avoir tape le premier digit pour la prochaine operation
  if (shouldClear) {
    shouldClear = false;
    clearCurrentValue();
  } else {
    shouldClearAfterFirstDigit = true;
  }
}

// Utilitaire pour ajouter un event listener sur les operateurs pour eviter la repetition
function addEventListenerToOperator(operator) {
  document.getElementById(operator).addEventListener("click", function() {
    storeOperator(operator);
  }, false);
}

// On ajoute les event listener sur les chiffres
addEventListenerToDigit("1");
addEventListenerToDigit("2");
addEventListenerToDigit("3");
addEventListenerToDigit("4");
addEventListenerToDigit("5");
addEventListenerToDigit("6");
addEventListenerToDigit("7");
addEventListenerToDigit("8");
addEventListenerToDigit("9");
addEventListenerToDigit("0");

// On ajoute les event listener sur les operateurs 
addEventListenerToOperator("/");
addEventListenerToOperator("*");
addEventListenerToOperator("+");
addEventListenerToOperator("-");

// On ajoute l'event pour le =
document.getElementById("=").addEventListener("click", function() {
  compute(storedValue, currentValue, storedOperator);
  clearAllValues();
}, false);

// On ajoute l'event pour le C
document.getElementById("C").addEventListener("click", function() {
  clearAllValues();
  displayCurrentValue();
}, false);
