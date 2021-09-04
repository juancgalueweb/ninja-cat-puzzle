// Shuffle the pictures when the page loads
$("document").ready(function () {
  shuffleImages();
  // This check if in the generated shuffle images is one or more image in the correct order (the user won't know)
  for (let i = 0; i < picturesAttrInOrder.length; i++) {
    checkPuzzle(i);
  }
});

// Generating a random number between 0 and 9
function randomNumberInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create array of objects with all the pictures
const picturesAttrInOrder = [
  { src: "img/cat0.png", alt: "Cat-0" },
  { src: "img/cat1.png", alt: "Cat-1" },
  { src: "img/cat2.png", alt: "Cat-2" },
  { src: "img/cat3.png", alt: "Cat-3" },
  { src: "img/cat4.png", alt: "Cat-4" },
  { src: "img/ninja0.png", alt: "Ninja-0" },
  { src: "img/ninja1.png", alt: "Ninja-1" },
  { src: "img/ninja2.png", alt: "Ninja-2" },
  { src: "img/ninja3.png", alt: "Ninja-3" },
  { src: "img/ninja4.png", alt: "Ninja-4" },
];

// Generate a unique shuffle array
function shuffleArray() {
  const shuffleSet = new Set();
  while (shuffleSet.size <= 9) {
    shuffleSet.add(randomNumberInclusive(0, 9));
  }
  return Array.from(shuffleSet);
}

// Generate a function to shuffle all the images
function shuffleImages() {
  const shuffleArr = shuffleArray();
  for (let i = 0; i < shuffleArr.length; i++) {
    $(`#img-${i}`).attr(picturesAttrInOrder[shuffleArr[i]]);
  }
}

// Give the player a hint
$("#hint").one("click", function () {
  $(this).before(
    "<p class='m-2 p-2 fw-bold' id='bye'>The cat should be at the top... there are no more hints!</p>"
  );
  setTimeout(function () {
    $("#bye").hide();
  }, 4000);
});

// Check if puzzle is correct
const result = new Set();
function checkPuzzle(index) {
  if (picturesAttrInOrder[index].alt === $(`img#img-${index}`).attr("alt")) {
    result.add(index);
  }
  return result;
}

// Clicking every picture to shuffle it
$("img").click(function () {
  $(this).attr(picturesAttrInOrder[randomNumberInclusive(0, 9)]);
  const index = $(this).attr("data-alt-src");
  if (checkPuzzle(index).size === 10) {
    $("#win").show();
  }
});
