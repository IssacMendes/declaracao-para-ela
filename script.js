const chapters = [...document.querySelectorAll(".chapter")];
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const petalLayer = document.getElementById("petalLayer");
let currentChapter = 0;
let isAnimating = false;

function updateProgress() {
  const current = currentChapter + 1;
  progressFill.style.width = `${(current / chapters.length) * 100}%`;
  progressText.textContent = `${String(current).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;
}

function createPetals(amount = 24) {
  const colors = ["#c98291", "#843e52", "#e8b9c1", "#a9c2a9", "#f1d9dc", "#61283b"];
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--petal-color", colors[Math.floor(Math.random() * colors.length)]);
    petal.style.setProperty("--duration", `${2.2 + Math.random() * 2.3}s`);
    petal.style.setProperty("--drift", `${Math.random() * 150 - 75}px`);
    petal.style.animationDelay = `${Math.random() * .55}s`;
    petal.style.width = `${8 + Math.random() * 9}px`;
    petal.style.height = `${12 + Math.random() * 10}px`;
    petalLayer.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove());
  }
}

function showChapter(nextIndex) {
  if (isAnimating || nextIndex < 0 || nextIndex >= chapters.length) return;
  isAnimating = true;
  createPetals(30);
  chapters[currentChapter].classList.remove("active");
  currentChapter = nextIndex;
  window.setTimeout(() => {
    chapters.forEach((chapter, index) => chapter.classList.toggle("active", index === currentChapter));
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
    isAnimating = false;
  }, 260);
}

document.querySelectorAll(".next-btn").forEach(button => {
  button.addEventListener("click", () => showChapter(currentChapter + 1));
});

document.getElementById("homeLink").addEventListener("click", event => {
  event.preventDefault();
  showChapter(0);
});

document.getElementById("restartBtn").addEventListener("click", () => {
  const song = document.getElementById("ourSong");
  song.pause();
  song.currentTime = 0;
  document.getElementById("playIcon").textContent = "▶";
  document.getElementById("playLabel").textContent = "Tocar nossa música";
  document.getElementById("songReveal").classList.remove("visible");
  showChapter(0);
});

const song = document.getElementById("ourSong");
const playButton = document.getElementById("playSong");
const playIcon = document.getElementById("playIcon");
const playLabel = document.getElementById("playLabel");
const songReveal = document.getElementById("songReveal");
const musicHint = document.getElementById("musicHint");

playButton.addEventListener("click", async () => {
  if (song.paused) {
    try {
      await song.play();
      playIcon.textContent = "Ⅱ";
      playLabel.textContent = "Pausar nossa música";
      songReveal.classList.add("visible");
      musicHint.textContent = "Que essa música acompanhe esse momento. ♥";
      createPetals(38);
    } catch (error) {
      musicHint.textContent = "Não encontrei o áudio. Coloque sua cópia autorizada da música na pasta do site com o nome musica.mp3 e tente novamente.";
    }
  } else {
    song.pause();
    playIcon.textContent = "▶";
    playLabel.textContent = "Continuar nossa música";
  }
});

song.addEventListener("ended", () => {
  playIcon.textContent = "▶";
  playLabel.textContent = "Tocar novamente";
});

// Mostra um espaço elegante quando a foto ainda não foi adicionada.
document.querySelectorAll(".memory-photo").forEach(img => {
  const card = img.closest(".photo-card");
  const markLoaded = () => card.classList.add("has-image");
  if (img.complete && img.naturalWidth > 0) markLoaded();
  img.addEventListener("load", markLoaded);
});

updateProgress();
