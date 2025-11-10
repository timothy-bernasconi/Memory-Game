// on importe nos function et nos images //

import { images } from "./data1.js";
import { melanger } from "./function.js";

// on sélectionne un élément, en l'occurence la grille, le timer et le bouton replay //

const grille = document.getElementById("grille");
const timerDisplay = document.getElementById("timer");
const btnRejouer = document.getElementById("rejouer");

// on crée un tableau, et 4 variables, celle du timer, des secondes, des minutes et un boolén pour savoir si le jeu à commencer ou pas


let cartesRetournees = [];
let timer;
let seconds = 0;
let minutes = 0;
let gameStarted = false;

// cette fonction démarre un timer, si on atteint 60, cela ajoute une minute //

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }, 1000);
}

// pour stoper notre timer //

function stopTimer() {
  clearInterval(timer);
}

// pour réseter timer //

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  gameStarted = false;
  timerDisplay.textContent = "0:00";
}

// cette fct va mélanger nos cartes recto, tout en affichant le verso //

function creerCartes() {
  grille.innerHTML = ""; 
  const imagesMelangees = melanger(images);

  imagesMelangees.forEach(src => {
    const carte = document.createElement("div");
    carte.classList.add("carte");

    const front = document.createElement("div");
    front.classList.add("front");
    front.innerHTML = `<img src="./assets/versoRouge.png" alt="verso">`;

    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = `<img src="${src}" alt="recto">`;

    carte.appendChild(front);
    carte.appendChild(back);
    grille.appendChild(carte);

    // si on click sur une carte, on démarre le jeu, donc le timer se lance //

    carte.addEventListener("click", () => {
      if (!gameStarted) {
        startTimer();
        gameStarted = true;
      }

     // la condition qui permet de passer du recto au verso //

      if (cartesRetournees.length === 2 || carte.classList.contains("flipped")) return;

      carte.classList.add("flipped");
      cartesRetournees.push(carte);

      // une fois les deux cartes retournées, si elles correspondent, les cartes ne bougent plus //

      if (cartesRetournees.length === 2) {
        const [carte1, carte2] = cartesRetournees;

        if (carte1.querySelector(".back img").src === carte2.querySelector(".back img").src) {
          cartesRetournees = [];

         
          const toutesCartes = document.querySelectorAll(".carte");
          const toutesFlipped = Array.from(toutesCartes).every(c => c.classList.contains("flipped"));
          if (toutesFlipped) stopTimer();

        } else {
          setTimeout(() => {
            carte1.classList.remove("flipped");
            carte2.classList.remove("flipped");
            cartesRetournees = [];
          }, 1000);
        }
      }
    });
  });
}

// le click permet de reseter le jeu // 

btnRejouer.addEventListener("click", () => {
  cartesRetournees = [];
  resetTimer();
  creerCartes();
});


creerCartes();
