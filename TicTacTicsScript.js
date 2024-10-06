

const solution = {
  id: 1,
  commonWord: "rock",
  commonWordFirst: ["rock bottom", "rock bands"],
  commonWordSecond: ["the rock", "plymouth rock"],
};

function updateStorage (position, word) {
  localStorage.setItem(`${solution.id}_${position}`, word);
}

function checkPuzzle () {
  const west = localStorage.getItem(`${solution.id}_west`);
  const north = localStorage.getItem(`${solution.id}_north`);
  const east = localStorage.getItem(`${solution.id}_east`);
  const south = localStorage.getItem(`${solution.id}_south`);
  const center = localStorage.getItem(`${solution.id}_center`);

  const checkCenter = center === solution.commonWord;
  const checkWestAndNorth = areArraysEqual(
    [west, north],
    solution.commonWordSecond.map(phrase => phrase.split(" ")[0])
  );
  const checkEastAndSouth = areArraysEqual(
    [east, south],
    solution.commonWordFirst.map(phrase => phrase.split(" ")[1])
  );

  const isSolved = checkCenter && checkWestAndNorth && checkEastAndSouth;

  if (isSolved) {
    setTimeout(() => {alert("Congrats TikTacTician! You've solved today's puzzle!")}, 250)
  }

  return checkCenter && checkWestAndNorth && checkEastAndSouth;
}

function areArraysEqual(arr1, arr2) {
  // First, check if both arrays have exactly two elements
  if (arr1.length !== 2 || arr2.length !== 2) {
    return false;
  }

  // Sort both arrays to ensure the order doesn't matter
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // Compare the sorted arrays
  return sortedArr1[0] === sortedArr2[0] && sortedArr1[1] === sortedArr2[1];
}

function main() {
  // on page load, if starting puzzle anew, reset local storage
  ["west", "north", "east", "south", "center"].forEach(position => localStorage.removeItem(`${solution.id}_${position}`))

  const inputElements = document.querySelectorAll('input');

  inputElements.forEach(input => {
    input.addEventListener('input', function(event) {
      const position = event.target.id;
      const word = (event.target.value).toLowerCase();
      // Call your custom function here
      updateStorage(position, word);
      const isSolved = checkPuzzle();

      if (isSolved) {
        inputElements.forEach(input => {input.style.border = "2px solid green"; input.disabled = true;})
      }
    });
  })


}

main();
