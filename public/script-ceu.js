const sky = document.getElementById("sky");
const totalStars = 70; // Quantidade total de estrelas

function randomizeStar(star) {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);

  if (x > window.innerWidth || y > window.innerHeight) {
    console.log(x, y);
  }

  // Sorteia se esta estrela terá o brilho em cruz (30% de chance)
  const isSpecial = Math.random() > 0.99;

  if (isSpecial) {
    star.classList.add("cross-flare");
    star.style.width = "2.5px";
    star.style.height = "2.5px";
  } else {
    star.classList.remove("cross-flare");
    const size = Math.random() > 0.5 ? "2px" : "1px";
    star.style.width = size;
    star.style.height = size;
  }

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
}

for (let i = 0; i < totalStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  randomizeStar(star);

  // Ritmo do ciclo completo (entre 3s e 6s para sumir e voltar)
  const duration = (Math.random() * 3 + 3).toFixed(2);
  const delay = (Math.random() * 5).toFixed(2);

  // Ritmo da cintilação rápida interna (tremor de 0.15s a 0.3s)
  const scintieSpeed = (Math.random() * 0.15 + 0.15).toFixed(2);

  // Aplicamos as duas animações juntas no CSS inline
  star.style.animation = `
        blink ${duration}s ease-in-out ${delay}s infinite,
        scintillate ${scintieSpeed}s ease-in-out infinite
      `;

  // Altera a posição discretamente no momento do fade out
  star.addEventListener("animationiteration", (e) => {
    // Apenas resorteia quando o ciclo principal 'blink' terminar (evita conflito com o 'scintillate')
    if (e.animationName === "blink") {
      randomizeStar(star);
    }
  });

  sky.appendChild(star);
}
