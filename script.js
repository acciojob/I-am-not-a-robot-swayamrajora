const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");

let selected = [];
let actualImages = [];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load images
function loadImages() {
  let temp = [...images];
  const duplicateIndex = Math.floor(Math.random() * temp.length);
  const duplicateImage = temp[duplicateIndex];

  actualImages = [...temp, duplicateImage];
  actualImages = shuffle(actualImages);

  imageContainer.innerHTML = "";
  para.innerText = "";
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  selected = [];

  actualImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("tile");
    img.setAttribute("data-src", src);
    img.addEventListener("click", () => handleClick(img));
    imageContainer.appendChild(img);
  });
}

// Handle image click
function handleClick(img) {
  if (selected.length >= 2 || img.classList.contains("selected")) return;

  img.classList.add("selected");
  selected.push(img);

  if (selected.length > 0) {
    resetButton.style.display = "inline-block";
  }

  if (selected.length === 2) {
    verifyButton.style.display = "inline-block";
  }
}

// Reset everything
resetButton.addEventListener("click", () => {
  selected.forEach((img) => img.classList.remove("selected"));
  selected = [];
  verifyButton.style.display = "none";
  resetButton.style.display = "none";
  para.innerText = "";
});

// Verify selection
verifyButton.addEventListener("click", () => {
  const src1 = selected[0].getAttribute("data-src");
  const src2 = selected[1].getAttribute("data-src");

  if (src1 === src2) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyButton.style.display = "none";
});

window.onload = loadImages;
