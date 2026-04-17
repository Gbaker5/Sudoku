
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

function createPencilButton() {
  const pencilButtonContainer = document.getElementById('pencil-button-ct');
  const pencilButton = document.createElement('div');
  pencilButton.classList.add('pencil-button');
  pencilButton.textContent = 'Pencil';

  pencilButtonContainer.appendChild(pencilButton);
}

createPencilButton();


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

//TOGGLE PENCIL MODE

let pencilMode = false;

document.getElementById('pencil-button-ct').addEventListener('click', () => {
  togglePencil();
});

function togglePencil(){
if(pencilMode === false){
  pencilMode = true;
  document.getElementById('pencil-button-ct').classList.add('pencilSelected');
  console.log('Pencil mode enabled');
}else if(pencilMode === true){
  pencilMode = false;
  document.getElementById('pencil-button-ct').classList.remove('pencilSelected');
  console.log('Pencil mode disabled');  
}
}

//SHOW CURRENT NUMBER ON HOVER
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('mouseenter', () => {
    if (currentNumber) {
      //might want to add if statement to separate  hover for pencil marks vs. actual number placement
      if(pencilMode === true) {
      console.log(`Hovering over cell with current number: ${currentNumber}`);
      cell.style.setProperty('--hover-number', `"${currentNumber}"`);
      cell.classList.add('pencil-hovering');
    }
    
    if(cell.textContext == null && pencilMode === false) { //enter normal hover state for number placement
      console.log(`Hovering over cell with current number: ${currentNumber}`);
      cell.style.setProperty('--hover-number', `"${currentNumber}"`);
      cell.classList.add('normal-hovering');
      //cell.classList.add('hoverShadow');
    }
      }
  });

  //REMOVE HOVER EFFECT WHEN NOT HOVERING
  cell.addEventListener('mouseleave', () => {
    if (currentNumber) {

      if(pencilMode === true) { //for pencil mode
      console.log('Stopped hovering over cell');
      cell.classList.remove('pencil-hovering');
      cell.style.setProperty('--hover-number', '""');

    }
    
      if(cell.textContext == null && pencilMode === false) { //for normal number placement mode
      console.log('Stopped hovering over cell');
      cell.classList.remove('normal-hovering');
      cell.style.removeProperty('--hover-number');
    }
     
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
      if(currentNumber) { //if number is selected

        if(pencilMode === false) { //if pencil mode is not enabled, place current number in cell
          if(cell.textContent == currentNumber) { //if cell is same number then remove number from cell
            cell.textContent = '';
            cell.classList.remove('normalInput');
            console.log(` current number: ${currentNumber} removed from cell ${i}-${j}`);

            checkRows()
            checkColumns()
            checkSubgrids()
          }else if(cell.textContent) { //if cell already has a number, replace with new number
            cell.textContent = currentNumber;
            cell.classList.add('normalInput');
            console.log(` current number: ${currentNumber} entered into cell ${i}-${j}`);

            checkRows()
            checkColumns()
            checkSubgrids()
          } else { //if cell is empty, place number in cell
          cell.textContent = currentNumber;
          cell.classList.add('normalInput');
          console.log(` current number: ${currentNumber} entered into cell ${i}-${j}`);

            checkRows()
            checkColumns()
            checkSubgrids()
          }
      } //end of normal mumber placement logic

      if(pencilMode === true) { //if pencil mode is enabled, add current number as pencil mark in cell
         
       // console.log(`Pencil mark ${currentNumber} added to cell ${i}-${j}`);
       //
       // if() { //if pencil mark already exists, remove it
       //
       // //console.log(`Pencil mark ${currentNumber} removed from cell ${i}-${j}`);
       // } else { //if pencil mark does not exist, add it
       // 
       // //console.log(`Pencil mark ${currentNumber} added to cell ${i}-${j}`);
       // }  
      } //end of pencil mark logic
      }//end of if current number is selected
      if(!currentNumber) { //if no number is selected, clear cell on click
        cell.textContent = '';
        cell.classList.remove('normalInput');
        console.log(` current number cleared from cell ${i}-${j}`);
      }
    });
  }
}
}

gotClicked();




////INPUT NUMBER INTO CELL ON CLICK
//function inputValue() {
//if(currentNumber) {
//  for(let i = 0; i < 9; i++) {
//    for(let j = 0; j < 9; j++) {
//      const cell = document.querySelector(`.cell-${i}-${j}`);
//      cell.addEventListener('click', () => {
//
//        console.log(` current number: ${currentNumber} entered into cell ${i}-${j}`);
//        cell.textContent = currentNumber;
//        cell.style.color = 'black';
//      });
//    }
//  }
//}
//}
//
//inputValue();


let firstRow = []
let secondRow = []
let thirdRow = []
let fourthRow = []
let fifthRow = []
let sixthRow = []
let seventhRow = []
let eighthRow = []
let ninthRow = []

let columnOne = []
let columnTwo = []
let columnThree = []
let columnFour = []
let columnFive = []
let columnSix = []
let columnSeven = []
let columnEight = []
let columnNine = []

let boxOne = []
let boxTwo = []
let boxThree = []
let boxFour = []
let boxFive = []
let boxSix = []
let boxSeven = []
let boxEight = []
let boxNine = []


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

//showValidPuzzle();
//checkRows()
//checkColumns()




/////////GAME STATE MANAGEMENT/////////// (keeping track of the current board state, validating moves, etc.)

//check for duplicates
//check for 1-9
//am i checking agaisnst vurrent valid puzzle or just against current board state?
//when i enter a number do i want to add to that rows array ie let firstRow = [4,3,5] and then check if current number is in that array before allowing placement? or do i want to loop through each cell in that row and check if any of them have the same number as current number?
  
//validate if array has contains all numbers 1-9, no duplicates, and no empty cells
function isValid(section){
  const valid =
  new Set(section).size === 9 &&
  section.every(num => num >= '1' && num <= '9');

  if(valid) {
    return true;
  }else{
    return false;
  }
}


  //CHECK EVERY ROW
  function checkRows() {

    
   
      //function checkRowOne(){
      //   for(let i = 0; i < 9; i++) {
      //  //collect values of each cell in row into an array and check if current number is already in that array before allowing placement
      //    const rowOne = document.querySelector(`.cell-${0}-${i}`).textContent;
      //    console.log(rowOne)
      //    firstRow[i] = rowOne
      //    console.log(firstRow);
      //   }
      //  //check if current number is already in row array
      //    if(firstRow.includes(currentNumber)) {
      //      console.log(`Current number ${currentNumber} already exists in row ${1}`);
      //      //maybe on hover the color of the current number turns red in that row
//
//
//
      //    } else {
      //      console.log(`Current number ${currentNumber} does not exist in row ${1}`);
      //    }
//
//
      //  //add valid class to row if valid, remove if not valid
      //  let valid = isValid(firstRow);
//
      //  for(let i = 0; i < 9; i++) {
      //     const rowOneDivs = document.querySelector(`.cell-${0}-${i}`)
      //     //console.log(rowOneDivs)
//
      //      if (valid) {
      //        rowOneDivs.classList.add('validRow');
      //        //console.log(`Row 1 is valid`);
      //        //return true;
      //     } else {
      //        rowOneDivs.classList.remove('validRow');
      //        //console.log(`Row 1 is not valid`);
      //     }
      //  }
//
      //  
      //  if(valid) {
      //    return true;
      //  }
      //   
      //}
//
      //checkRowOne()

      //if(checkRowOne() ) {
    // console.log('Row 1 is valid');
    //} else {
    // console.log('Row 1 is not valid');
    //}



    

      /////////smaller/more efficient function to check rows that can be called for each row instead of having a separate function for each row
      function checkRow(rowIndex, rowArray) {
      for (let i = 0; i < 9; i++) {
      rowArray[i] = document.querySelector(`.cell-${rowIndex}-${i}`).textContent;
        }

      let valid = isValid(rowArray);

      for (let i = 0; i < 9; i++) {
        const cell = document.querySelector(`.cell-${rowIndex}-${i}`);
        cell.classList.toggle('validRow', valid);
      }
    }

      checkRow(0, firstRow);
      checkRow(1, secondRow);
      checkRow(2, thirdRow);
      checkRow(3, fourthRow);
      checkRow(4, fifthRow);
      checkRow(5, sixthRow);
      checkRow(6, seventhRow);
      checkRow(7, eighthRow);
      checkRow(8, ninthRow);


}
    

  //CHECK EVERY COLUMN

function checkColumns() {

  function checkColumn(columnIndex, columnArray) {
    for (let i = 0; i < 9; i++) {
      columnArray[i] = document.querySelector(`.cell-${i}-${columnIndex}`).textContent;
    }
    
    let valid = isValid(columnArray);

      for (let i = 0; i < 9; i++) {
        const cell = document.querySelector(`.cell-${i}-${columnIndex}`);
        cell.classList.toggle('validColumn', valid);
      }
}

  checkColumn(0, columnOne);
  checkColumn(1, columnTwo);
  checkColumn(2, columnThree);
  checkColumn(3, columnFour);
  checkColumn(4, columnFive);
  checkColumn(5, columnSix);
  checkColumn(6, columnSeven);
  checkColumn(7, columnEight);
  checkColumn(8, columnNine);
}


  //check every 3x3 subgrid

  function checkSubgrids() {
    function checkBox(boxIndex, boxArray) {
      const boxRowStart = Math.floor(boxIndex / 3) * 3;
      const boxColStart = (boxIndex % 3) * 3;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          boxArray[i * 3 + j] = document.querySelector(`.cell-${boxRowStart + i}-${boxColStart + j}`).textContent;
        }
      }

      let valid = isValid(boxArray);

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cell = document.querySelector(`.cell-${boxRowStart + i}-${boxColStart + j}`);
          cell.classList.toggle('validBox', valid);
        }
      }
  }

    checkBox(0, boxOne);
    checkBox(1, boxTwo);
    checkBox(2, boxThree);
    checkBox(3, boxFour);
    checkBox(4, boxFive);
    checkBox(5, boxSix);
    checkBox(6, boxSeven);
    checkBox(7, boxEight);
    checkBox(8, boxNine);
  }






//Handling for pencil marks (small numbers in corners of cells)