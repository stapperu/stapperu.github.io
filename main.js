const squares = document.querySelectorAll(".square");
const levelLabel = document.querySelector(".levelLabel");
const message = document.querySelector(".message");
const startButton = document.querySelector(".startButton");

let temporaryArray = [];
let memorizedArray = [];
let levelNumber=1;

function addToMemorized() {
  const randomSquareSelect = Math.floor(Math.random() * 4 + 1);
  squares[randomSquareSelect - 1].style.border = "5px solid black";
  setTimeout(() => {
    squares[randomSquareSelect - 1].style.border = "none";
  }, 2000);
  memorizedArray.push(randomSquareSelect);

}

function clearMemorized() {
  memorizedArray = [];
}

function clearTemporary() {
  temporaryArray = [];
}

function checkArrays(temporaryArray, memorizedArray) {
  // Check elements up to temporaryArray's length
  for (let i = 0; i < temporaryArray.length; i++) {
    if (temporaryArray[i] !== memorizedArray[i]) {
      return false; // Mismatch found
    }
  }
  // If no mismatch, return true only if lengths match
  return temporaryArray.length === memorizedArray.length;
}

squares.forEach((square) =>
  square.addEventListener("click", () => {
    temporaryArray.push(parseInt(square.id));
   

    const isMatch = checkArrays(temporaryArray, memorizedArray);
    
    if (isMatch) {
      // Full match: Success
      message.textContent = "Success";
      levelNumber++;
      levelLabel.textContent="Level " + levelNumber;
      setTimeout(() => {
        message.textContent = "";}, 2000);
        addToMemorized();
        clearTemporary();
       
      
    } else if (temporaryArray.length <= memorizedArray.length) {
      // Check for mismatch only within temporaryArray's length
      for (let i = 0; i < temporaryArray.length; i++) {
        if (temporaryArray[i] !== memorizedArray[i]) {
          message.textContent = "Fail";
          setTimeout(() => {
            message.textContent = "";}, 2000);
            clearMemorized();
            clearTemporary();
          
          
          break; // Exit after failing
        }
      }
    }
    // If no mismatch and length < memorizedArray, wait for next click
  })
);

startButton.addEventListener("click", () => {
  clearTemporary();
  clearMemorized();
  addToMemorized();
});