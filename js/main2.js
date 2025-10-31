import { images } from "./data2.js";
import { melanger } from "./function.js";

const imagesMelangees = melanger(images);
const grille = document.getElementById("grille");

let cartesRetournees = [];

imagesMelangees.forEach(src => {
  const carte = document.createElement("div");
  carte.classList.add("carte");

  const front = document.createElement("div");
  front.classList.add("front");
  front.innerHTML = `<img src="./assets/versoRose.png" alt="versorose">`;

  const back = document.createElement("div");
  back.classList.add("back");
  back.innerHTML = `<img src="${src}" alt="recto">`;

  carte.appendChild(front);
  carte.appendChild(back);
  grille.appendChild(carte);

  carte.addEventListener("click", () => {
    if (cartesRetournees.length === 2 || carte.classList.contains("flipped")) return;

    carte.classList.add("flipped");
    cartesRetournees.push(carte);

    if (cartesRetournees.length === 2) {
      const [carte1, carte2] = cartesRetournees;

      if (carte1.querySelector(".back img").src === carte2.querySelector(".back img").src) {
        cartesRetournees = [];
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
