
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
    //console.log(`Current number selected: ${currentNumber}`);
  return currentNumber = input;
}


//CLEAR CURRENT NUMBER SELECTION
document.querySelector('.clear-button').addEventListener('click', () => {
  currentNumber = null;
  console.log('Current number cleared');
});

//SHOW CURRENT NUMBER ON HOVER
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('mouseenter', () => {
    if (currentNumber) {
      console.log(`Hovering over cell with current number: ${currentNumber}`);
      cell.textContent = currentNumber;
      cell.style.color = 'green';
    }
  });
  cell.addEventListener('mouseleave', () => {
    if (currentNumber) {
      cell.textContent = '';
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









//show a valid puzzle on page load
const showValidPuzzle = () => {
 
};

showValidPuzzle();

//Input handling for number entry
function inputValue() {

}


//Game state management (keeping track of the current board state, validating moves, etc.)
  //check every row
  function checkRows() {
    for(let i = 0; i < 9; i++) {
    }
  }
  //check every column
  //check every 3x3 subgrid



//Handling for pencil marks (small numbers in corners of cells)