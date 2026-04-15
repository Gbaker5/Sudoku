
const gameboard = document.getElementById('gameboard');

const createGameboard = () => {
  for (let i = 0; i < 9; i++) {
    const row = document.createElement('div');
    row.classList.add(`row-${i}`);
    row.classList.add('row');


    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('div');
      cell.classList.add(`cell-${i}-${j}`);
      cell.classList.add('cell');
      row.appendChild(cell);
      
    }
    gameboard.appendChild(row);

  }
};

createGameboard();


// Add thick borders to separate 3x3 subgrids
for(let i = 0; i < 9; i++) {
  for(let j = 0; j < 9; j++) {
    const cellLeft = document.querySelector(`.cell-${i}-${3}`);
    cellLeft.classList.add('thickLeft-border');

    const cellRight = document.querySelector(`.cell-${i}-${5}`);
    cellRight.classList.add('thickRight-border');

    const cellTop = document.querySelector(`.cell-${3}-${j}`);
    cellTop.classList.add('thickTop-border');

    const cellBottom = document.querySelector(`.cell-${5}-${j}`);
    cellBottom.classList.add('thickBottom-border');

  }
}

// CREATE NUMBER SELECTION PANEL
function createNumberSelection() {
  for(let i = 1; i < 10; i++){
    const numberSelectContainer = document.getElementById('number-selection');
    const numberOption = document.createElement('div');
    numberOption.classList.add(`number-option-${i}`);
    numberOption.classList.add('number-option');
    numberOption.textContent = i;

    
    numberSelectContainer.appendChild(numberOption);
  }
}

createNumberSelection();

function createClearButton() {
  const clearButtonContainer = document.getElementById('clear-button-ct');
  const clearButton = document.createElement('div');
  clearButton.classList.add('clear-button');
  clearButton.textContent = 'Clear';

  clearButtonContainer.appendChild(clearButton);
}

createClearButton();


//////GAME LOGIC//////


//CHOOSE NUMBER TO PLACE
let currentNumber = null;

document.querySelectorAll('.number-option').forEach(option => {

  option.addEventListener('click', () => chooseNumber(option.textContent));
  });

function chooseNumber(input){
    //let currentNumber = input;
    console.log(`Current number selected: ${currentNumber}`);
  return currentNumber = input;
}


//CLEAR CURRENT NUMBER SELECTION
document.querySelector('.clear-button').addEventListener('click', () => {
  currentNumber = null;
  document.querySelectorAll('.number-option').forEach(option => {
    option.classList.remove('selectedNum');
   })

  console.log('Current number cleared');
});

//SHOW CURRENT NUMBER ON HOVER
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('mouseenter', () => {
    if (currentNumber) {
      console.log(`Hovering over cell with current number: ${currentNumber}`);
      cell.textContent = currentNumber;
      cell.style.color = 'green';
      cell.classList.add('hoverShadow');
    }
  });
  cell.addEventListener('mouseleave', () => {
    if (currentNumber) {
      cell.textContent = '';
      cell.classList.remove('hoverShadow');
    }
  });
});

//ADD EVENT LISTENER TO EACH NUMBER OPTION TO HIGHLIGHT SELECTED NUMBER
document.querySelectorAll('.number-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleNumberOption();
  });
});

//HIGHLIGHT SELECTED NUMBER OPTION
function toggleNumberOption (){
  if(currentNumber) {
    document.querySelectorAll('.number-option').forEach(option => {
      if(option.textContent === currentNumber) {
        option.classList.add('selectedNum');
      } else {
        option.classList.remove('selectedNum');
      }
    });
  }

}
 
// ADD CLICK CONSOLE LOGS TO CELLS
function gotClicked() {
for(let i = 0; i < 9; i++) {
  for(let j = 0; j < 9; j++) {
    const cell = document.querySelector(`.cell-${i}-${j}`);
    cell.addEventListener('click', () => {
      console.log(`Cell ${i}-${j} clicked`);
    });
  }
}
}

gotClicked();


//INPUT NUMBER INTO CELL ON CLICK
function inputValue() {
if(currentNumber) {
  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      const cell = document.querySelector(`.cell-${i}-${j}`);
      cell.addEventListener('click', () => {
        cell.textContent = currentNumber;
        cell.style.color = 'black';
      });
    }
  }
}
}

inputValue();


let firstRow = []
let secondRow = []
let thirdRow = []
let fourthRow = []
let fifthRow = []
let sixthRow = []
let seventhRow = []
let eighthRow = []
let ninthRow = []

let boxOne = []
let boxTwo = []
let boxThree = []
let boxFour = []
let boxFive = []
let boxSix = []
let boxSeven = []
let boxEight = []
let boxNine = []

let columnOne = []
let columnTwo = []
let columnThree = []
let columnFour = []
let columnFive = []
let columnSix = []
let columnSeven = []
let columnEight = []
let columnNine = []

//show a valid puzzle on page load
const showValidPuzzle = () => {
 let firstRow = [4,3,5,2,6,9,7,8,1]
 let secondRow = [6,8,2,5,7,1,4,9,3]
 let thirdRow = [1,9,7,8,3,4,5,6,2]
 let fourthRow = [8,2,6,1,9,5,3,4,7]
 let fifthRow = [3,7,4,6,8,2,9,1,5]
 let sixthRow = [9,5,1,7,4,3,6,2,8]
 let seventhRow = [5,1,9,3,2,6,8,7,4]
 let eighthRow = [2,4,8,9,5,7,1,3,6]
 let ninthRow = [7,6,3,4,1,8,2,5,9]

 //for each row of given puzzle, loop through each cell and add value to corresponding cell on gameboard
 for(let i = 0; i < 9; i++) {
  for(let j = 0; j < 9; j++) {
    const cell = document.querySelector(`.cell-${i}-${j}`);
    if(i === 0) {
      cell.textContent = firstRow[j];
      cell.classList.add('validShadow')
    } else if(i === 1) {
      cell.textContent = secondRow[j];
      cell.classList.add('validShadow')
    } else if(i === 2) {
      cell.textContent = thirdRow[j];
      cell.classList.add('validShadow')
    } else if(i === 3) {
      cell.textContent = fourthRow[j];
      cell.classList.add('validShadow')
    } else if(i === 4) {
      cell.textContent = fifthRow[j];
      cell.classList.add('validShadow')
    } else if(i === 5) {
      cell.textContent = sixthRow[j];
      cell.classList.add('validShadow')
    } else if(i === 6) {
      cell.textContent = seventhRow[j];
      cell.classList.add('validShadow')
    } else if(i === 7) {
      cell.textContent = eighthRow[j];
      cell.classList.add('validShadow')
    } else if(i === 8) {
      cell.textContent = ninthRow[j];
      cell.classList.add('validShadow')
    }
  }
 }
};

showValidPuzzle();




//Game state management (keeping track of the current board state, validating moves, etc.)
  //check every row
  function checkRows() {
    for(let i = 0; i < 9; i++) {
    }
  }
  //check every column
  //check every 3x3 subgrid



//Handling for pencil marks (small numbers in corners of cells)