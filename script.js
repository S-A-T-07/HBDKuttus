/* ========================================
   HBD KUTTUSSEE — NEVIN'S 24TH BIRTHDAY
   24 candles, birthday music, virtual cake,
   gift box and 26-photo memory film
======================================== */

/* ELEMENTS */
const candlesContainer = document.getElementById("candles");
const remaining = document.getElementById("remaining");
const cutCake = document.getElementById("cutCake");
const cakeMessage = document.getElementById("cakeMessage");
const blowAll = document.getElementById("blowAll");

const virtualCake = document.getElementById("virtualCake");
const sliceMessage = document.getElementById("sliceMessage");

const giftButton = document.getElementById("giftButton");
const giftLabel = document.getElementById("giftLabel");
const gallery = document.getElementById("gallery");

const photoGrid = document.getElementById("photoGrid");

const lightbox = document.getElementById("lightbox");
const largePhoto = document.getElementById("largePhoto");
const photoNumber = document.getElementById("photoNumber");

/* SETTINGS */
const BIRTHDAY_AGE = 24;
const PHOTO_COUNT = 26;

/* BIRTHDAY MUSIC */
let birthdaySong = document.getElementById("birthdaySong");

if (!birthdaySong) {
  birthdaySong = document.createElement("audio");
  birthdaySong.id = "birthdaySong";
  birthdaySong.preload = "auto";
  birthdaySong.src = "Images/birthday-song.mp3";
  document.body.appendChild(birthdaySong);
}

birthdaySong.loop = true;
birthdaySong.volume = 0.65;

let candlesBlown = 0;
let cakeHasBeenCut = false;
let songStarted = false;

/* CREATE 24 CANDLES */
for (let i = 1; i <= BIRTHDAY_AGE; i++) {
  const candle = document.createElement("button");

  candle.type = "button";
  candle.className = "candle";
  candle.setAttribute("aria-label", `Blow out candle ${i}`);
  candle.innerHTML = '<span class="flame"></span>';

  candle.addEventListener("click", () => {
    if (candle.classList.contains("out")) return;

    candle.classList.add("out");
    candle.setAttribute("aria-label", `Candle ${i} blown out`);

    candlesBlown++;
    updateCandleStatus();

    if (candlesBlown === BIRTHDAY_AGE) {
      startBirthdaySong();
      celebrate();
    }
  });

  candlesContainer.appendChild(candle);
}

/* UPDATE CANDLE COUNTER */
function updateCandleStatus() {
  remaining.textContent = BIRTHDAY_AGE - candlesBlown;

  if (candlesBlown === BIRTHDAY_AGE) {
    cutCake.disabled = false;
    blowAll.disabled = true;
    blowAll.textContent = "✨ All wishes sent!";

    cakeMessage.textContent =
      "All 24 candles are out! Make a beautiful wish, Nevin! ♡";
  } else {
    cakeMessage.textContent = `${candlesBlown} candles blown out. Keep going, Kuttussee! ♡`;
  }
}

/* BLOW ALL CANDLES */
blowAll.addEventListener("click", () => {
  if (candlesBlown === BIRTHDAY_AGE) return;

  document.querySelectorAll(".candle").forEach((candle) => {
    candle.classList.add("out");
    candle.setAttribute("aria-label", "Candle blown out");
  });

  candlesBlown = BIRTHDAY_AGE;
  updateCandleStatus();

  cakeMessage.textContent =
    "🌬️ Whoosh! All 24 candles are out! Make a beautiful wish, Kuttussee! ♡";

  startBirthdaySong();
  celebrate();
});

/* START BIRTHDAY MUSIC */
function startBirthdaySong() {
  if (songStarted) return;

  songStarted = true;
  birthdaySong.currentTime = 0;

  birthdaySong.play().catch(() => {
    songStarted = false;

    cakeMessage.textContent =
      "All candles are out! Check your birthday song file and try again. ♡";
  });
}

/* CUT THE VIRTUAL CAKE */
cutCake.addEventListener("click", () => {
  if (candlesBlown !== BIRTHDAY_AGE || cakeHasBeenCut) return;

  cakeHasBeenCut = true;

  cutCake.disabled = true;
  cutCake.textContent = "🍰 Cake cut with love!";

  cakeMessage.textContent =
    "Happy 24th birthday, Nevin! Your virtual cake is ready! ♡";

  virtualCake.classList.remove("sliced");
  virtualCake.classList.add("show");

  virtualCake.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  setTimeout(() => {
    virtualCake.classList.add("sliced");
    sliceMessage.textContent = "🍰 Your first virtual slice, Kuttussee! ♡";
  }, 1000);

  celebrate();
});

/* CONFETTI AND HEARTS */
function celebrate() {
  const symbols = ["♡", "♥", "✦", "✨", "🎉", "💕"];

  for (let i = 0; i < 45; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.fontSize = 16 + Math.random() * 18 + "px";

    piece.style.color = ["#800020", "#D45060", "#F3D49A"][
      Math.floor(Math.random() * 3)
    ];

    document.body.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

/* OPEN THE GIFT */
giftButton.addEventListener("click", () => {
  giftButton.classList.add("open");

  giftLabel.textContent = "A LITTLE GIFT, WITH ALL MY LOVE ♡";

  gallery.classList.add("show-gallery");

  gallery.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

/* LOAD 26 PHOTOS */
const photos = Array.from(
  { length: PHOTO_COUNT },
  (_, i) => `Images/photo${i + 1}.jpg`,
);

let currentPhoto = 0;

/* CREATE PHOTO CARDS */
function createPhotoCard(src, index, isDuplicate = false) {
  const card = document.createElement("button");

  card.type = "button";
  card.className = "photo-card";
  card.setAttribute("aria-label", `View memory ${index + 1}`);

  const img = document.createElement("img");

  img.src = src;
  img.alt = isDuplicate ? "" : `Birthday memory ${index + 1}`;
  img.loading = "eager";
  img.decoding = "async";

  img.addEventListener("error", () => {
    img.alt = "";
    img.style.display = "none";

    card.style.display = "flex";
    card.style.alignItems = "center";
    card.style.justifyContent = "center";
    card.style.color = "#800020";
    card.style.fontSize = "12px";

    card.textContent = `Check photo${index + 1}.jpg`;
  });

  card.appendChild(img);

  if (isDuplicate) {
    card.setAttribute("aria-hidden", "true");
    card.tabIndex = -1;
  } else {
    card.addEventListener("click", () => {
      openPhoto(index);
    });
  }

  photoGrid.appendChild(card);
}

/* DUPLICATE PHOTOS FOR CONTINUOUS SLIDER */
photos.forEach((src, index) => {
  createPhotoCard(src, index);
});

photos.forEach((src, index) => {
  createPhotoCard(src, index, true);
});

/* PHOTO VIEWER */
function openPhoto(index) {
  currentPhoto = index;

  updatePhoto();

  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

function updatePhoto() {
  largePhoto.src = photos[currentPhoto];

  photoNumber.textContent = `${currentPhoto + 1} of ${photos.length} memories`;
}

function closePhoto() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "";
}

function movePhoto(direction) {
  currentPhoto = (currentPhoto + direction + photos.length) % photos.length;

  updatePhoto();
}

/* PHOTO VIEWER BUTTONS */
document.getElementById("closeLightbox").addEventListener("click", closePhoto);

document
  .getElementById("previousPhoto")
  .addEventListener("click", () => movePhoto(-1));

document
  .getElementById("nextPhoto")
  .addEventListener("click", () => movePhoto(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

/* KEYBOARD CONTROLS */
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") {
    closePhoto();
  }

  if (event.key === "ArrowLeft") {
    movePhoto(-1);
  }

  if (event.key === "ArrowRight") {
    movePhoto(1);
  }
});
