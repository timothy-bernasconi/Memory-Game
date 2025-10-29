const cartes = document.querySelectorAll(".carte");

cartes.forEach((carte) => {
  carte.addEventListener("click", () => {
    const verso = "./assets/verso.png";
    const recto = carte.dataset.image;

   
    if (carte.src.includes("verso.png")) {
      carte.src = recto;
    } else {
    carte.src = verso;
    }
  });
});
