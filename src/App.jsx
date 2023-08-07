import { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  const [gridArray, setGridArray] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState(true); // true for 'X', false for 'O'
  const [startingPlayer, setStartingPlayer] = useState(true); // true for 'X', false for 'O'
  const [lastGameStartingPlayer, setLastGameStartingPlayer] = useState(true); // true for 'X', false for 'O'
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [p1Wins, setP1Wins] = useState(0);
  const [p2Wins, setP2Wins] = useState(0);
  const shouldAlertShow = useRef(true);

  function hasElementExactlyFiveTimes(arr, element) {
    const occurrences = arr.filter(item => item === element);
    return occurrences.length === 5;
  }
  useEffect(() => {
    if (shouldAlertShow.current) {
      const input = window.prompt('Enter player 1 name:');
      if (input !== null) {
        setP1Name(input);
      }
      const input2 = window.prompt('Enter player 2 name:');
      if (input2 !== null) {
        setP2Name(input2);
      }
      shouldAlertShow.current = false;
      setTurn(startingPlayer); // Set the starting player for the first game
    }
    if(gridArray.every(item => item !== '') && hasElementExactlyFiveTimes(gridArray,"x") || hasElementExactlyFiveTimes(gridArray,"O"))
    {
      resetBoard()
    }
  }, [startingPlayer, gridArray]);

  function checkWinner(gridArray) {
    // Define winning combinations (indices of cells in a line)
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check each winning combination
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gridArray[a] &&
        gridArray[a] === gridArray[b] &&
        gridArray[b] === gridArray[c]
      ) {
        return gridArray[a]; // We have a winner, return the symbol (X or O)
      }
    }

    return null; // No winner
  }
  
  // console.log(hasElementExactlyFiveTimes(gridArray,"x"))
  const handleWin = winner => {
    
    if (winner === 'x') {
      setP1Wins(prevWins => prevWins + 1);
      setLastGameStartingPlayer(true); // Player 'X' won, so 'X' starts the next game
    } else if (winner === 'O') {
      setP2Wins(prevWins => prevWins + 1);
      setLastGameStartingPlayer(false); // Player 'O' won, so 'O' starts the next game
    }
    resetBoard();

  };

  const resetBoard = () => {
    setGridArray(Array(9).fill(''));
    setTurn(!lastGameStartingPlayer); // Toggle the turn based on the last game's starting player
    setStartingPlayer(!lastGameStartingPlayer); // Toggle the starting player for the next game
  };

  const handleClick = e => {
    const squareIndex = e.target.id;
    if (gridArray[squareIndex] === '') {
      const tempArray = [...gridArray];
      tempArray[squareIndex] = turn ? 'x' : 'O';
      setGridArray(tempArray);
      setTurn(!turn);

      const winner = checkWinner(tempArray);
      if (winner) {
        handleWin(winner);
      }
      
    }
  };

  return (
    <div className="app">
      <div className={`player ${turn ? 'true' : 'false'}`}>
        <span>{p1Name ? p1Name : 'Player 1'}</span>
        <span id="wins">wins: {p1Wins}</span>
      </div>
      <div className="tictactoe">
        <div className="box">
          {gridArray.map((cellValue, index) => (
            <div key={index} className="cell" id={index} onClick={handleClick}>
              {cellValue === 'x' ? <>X</> : cellValue === 'O' ? <>O</> : <></>}
            </div>
          ))}
        </div>
      </div>
      <div className={`player ${!turn ? 'true' : 'false'}`}>
        <span>{p2Name ? p2Name : 'Player 2'}</span>{' '}
        <span id="wins">wins: {p2Wins}</span>
      </div>
    </div>
  );
};

export default App;
