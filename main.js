const squares = document.querySelectorAll(".square");
const levelLabel = document.querySelector(".levelLabel");
const message = document.querySelector(".message");
const startButton = document.querySelector(".startButton");
const statusMsg = document.querySelector(".statusMsg");
const harderDiff = document.querySelector(".harder");
const normalDiff = document.querySelector(".normal");
const docBody = document.querySelector("body");
const square1 = document.querySelector(".square1");
const square2 = document.querySelector(".square2");
const square3 = document.querySelector(".square3");
const square4 = document.querySelector(".square4");
const manlyman = document.querySelector(".manlyman");

let temporaryArray = [];
let memorizedArray = [];
let levelNumber = 1;

function addToMemorized() {
	const randomSquareSelect = Math.floor(Math.random() * 4 + 1);
	squares[randomSquareSelect - 1].style.border = "5px solid white";
	setTimeout(() => {
		squares[randomSquareSelect - 1].style.border = "none";
	}, 1500);
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
		square.classList.add("clickedSquare");
    track1.play();
		setTimeout(() => {
			square.classList.remove("clickedSquare");
		}, 100);

		temporaryArray.push(parseInt(square.id));

		const isMatch = checkArrays(temporaryArray, memorizedArray);

		if (isMatch) {
			// Full match: Success
			statusMsg.textContent = "Success";
			levelNumber++;
			levelLabel.textContent = "Level " + levelNumber;
      congratz();
			setTimeout(() => {
				statusMsg.textContent = "";
				addToMemorized();
				clearTemporary();
			}, 1000);
		} else if (temporaryArray.length <= memorizedArray.length) {
			// Check for mismatch only within temporaryArray's length
			for (let i = 0; i < temporaryArray.length; i++) {
				if (temporaryArray[i] !== memorizedArray[i]) {
         
          statusMsg.style.color = "red";
					statusMsg.textContent = "Fail";
					resetLevelCount();
					setTimeout(() => {
						statusMsg.textContent = "";
						statusMsg.style.color = "white";
						clearMemorized();
						clearTemporary();
					}, 1000);

					break; // Exit after failing
				}
			}
		}
		// If no mismatch and length < memorizedArray, wait for next click
	})
);

startButton.addEventListener("click", () => {
	statusMsg.textContent = "Game Started, follow the sequence";
	setTimeout(() => {
		statusMsg.textContent = "";
	}, 1000);

	clearTemporary();
	clearMemorized();
	addToMemorized();
  resetLevelCount()
});

harderDiff.addEventListener("click", () => {
	docBody.style.backgroundColor = "black";
	square1.style.backgroundColor = "silver";
	square2.style.backgroundColor = "gray";
	square3.style.backgroundColor = "lightGray";
	square4.style.backgroundColor = "darkGray";
});

normalDiff.addEventListener("click", () => {
	docBody.style.backgroundColor = "rgb(204, 231, 198)";
	square1.style.backgroundColor = "green";
	square2.style.backgroundColor = "blue";
	square3.style.backgroundColor = "red";
	square4.style.backgroundColor = "yellow";
});

function congratz(){
	if (levelLabel.textContent == "Level 6") {
		manlyman.style.opacity = "1";
    setTimeout(()=>{manlyman.style.opacity="0"},800)
	}
};

function resetLevelCount(){levelLabel.textContent = "Level 1";
  levelNumber=1;}


  const track1= new Audio('trimmedaudio.mp3');
