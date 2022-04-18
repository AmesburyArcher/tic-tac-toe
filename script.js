// global object
const MyApp = {
    gameModeHuman: {

    }
}

// Handles selections made by the user on the DOM
const gameSelections = (() => {
    const human = document.querySelector('.human-human');
    const computer = document.querySelector('.human-ai');
    const resetBtn = document.querySelector('.reset-game');

    resetBtn.addEventListener('click', () => window.location.reload());

    human.addEventListener('click', humanSelection);
    computer.addEventListener('click', computerSelection);

    function humanSelection() {
        human.classList.add('selected');
        computer.classList.remove('selected');
        computer.style.display = 'none';
        resetBtn.style.display = 'block';
        MyApp.gameModeHuman = true;
        gameBoard();
    }

    function computerSelection() {
        computer.classList.add('selected');
        human.classList.remove('selected');
        human.style.display = 'none';
        resetBtn.style.display = 'block';
        MyApp.gameModeHuman = false;
        gameBoard();
    }

})();

// Handles game winning/drawing conditions
const gameLogic = (() => {
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const cellBlocks = document.querySelectorAll('.game-cell');

    function checkWin(currentClass) {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return cellBlocks[index].classList.contains(currentClass)
            })
        })
    }

    function isDraw() {
        return [...cellBlocks].every(cell => {
            return cell.classList.contains('x') || 
            cell.classList.contains('circle');
        })
    }

    return {
        checkWin,
        isDraw
    }

})();

// Handles the game grid
const gameBoard = () => {
    let circleTurn;
    const cellBlocks = document.querySelectorAll('.game-cell');
    const circleClass = 'circle';
    const xClass = 'x';
    const gameGrid = document.querySelector('#game-grid');
    const roundMessage = document.querySelector('.round-update');
    const xScore = document.querySelector('.x-tally');
    const oScore = document.querySelector('.o-tally');

    if(MyApp.gameModeHuman === true) {
        const humanGameBoard = () => {
            let currentClass;
            gameGrid.classList.add(xClass);

            const handleClick = (e) => {
                const cell = e.target;
                currentClass = circleTurn ? circleClass : xClass;

                placeMarker(cell, currentClass);
                if(gameLogic.checkWin(currentClass)) {
                    roundOver(false);
                } else if(gameLogic.isDraw()) {
                    roundOver(true);
                    console.log('tie');
                } else {
                switchTurns();
                boardHoverClass();
                }
            };

            cellBlocks.forEach(cell => {
                cell.classList.remove(xClass);
                cell.classList.remove(circleClass);
                cell.removeEventListener('click', handleClick, { once: true });
                cell.addEventListener('click', handleClick, { once: true });
            });

            function placeMarker(cell, currentClass) {
                cell.classList.add(currentClass);
            };

            function switchTurns() {
                circleTurn = !circleTurn;
            };

            function boardHoverClass() {
                gameGrid.classList.remove(xClass);
                gameGrid.classList.remove(circleClass);
                if(circleTurn) {
                    gameGrid.classList.add(circleClass);
                } else {
                    gameGrid.classList.add(xClass);
                };
            }
            
            function roundOver(draw) {
                if(draw) {
                    roundMessage.textContent = 'Draw!';
                    humanGameBoard();

                } else {
                    roundMessage.textContent = `${circleTurn ? 'Circle\'s win this round!' : 'X\'s win this round!'}`;
                    circleTurn ? oScore.textContent++ : xScore.textContent++;
                    humanGameBoard();
                }
            }
        }
    humanGameBoard();
    } 

    if(MyApp.gameModeHuman === false) {
        gameGrid.classList.add(xClass);
        let currentClass;

        const handleHumanClick = (e) => {
            const cell = e.target;
            currentClass = circleTurn ? circleClass : xClass;

            if(cell.classList.contains(xClass) ||
            cell.classList.contains(circleClass)){
                return
            } else {
                placeMarker(cell, currentClass)
                switchTurn();
                computerTurn();
            }
        
        }

        cellBlocks.forEach(cell => {
            cell.classList.remove(xClass);
            cell.classList.remove(circleClass);
            cell.removeEventListener('click', handleHumanClick);
            cell.addEventListener('click', handleHumanClick,);
        });

        function placeMarker(cell, currentClass) {
            cell.classList.add(currentClass);
        };

        function switchTurn() {
            circleTurn = !circleTurn;
        }

        function computerTurn() {
            let emptyCells = [];
            let random;

            cellBlocks.forEach(cell => {
                if(!cell.classList.contains(xClass || circleClass)) {
                    emptyCells.push(cell)
                }
            })

            random = Math.ceil(Math.random() * emptyCells.length) -1;
            emptyCells[random].classList.add(circleClass);
            switchTurn();
        }
       
        
    
};
}
