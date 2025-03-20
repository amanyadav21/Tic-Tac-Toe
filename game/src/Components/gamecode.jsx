import { useState } from "react";

export default function TicTacToe() {
  // States to manage All Gaming Condtion States
  const [players, setPlayers] = useState({ X: "", O: "" }); // Player Name State Manage
  const [gameStarted, setGameStarted] = useState(false); // Is game running
  const [board, setBoard] = useState(Array(9).fill(null)); // 9 boxes, all empty at start
  const [currentPlayer, setCurrentPlayer] = useState("X"); // X starts first
  const [winner, setWinner] = useState(null); // Winner or draw

  // Winning patterns
  const winPatterns = [
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

  // // When players enter names and click "Start"
  // const handlePlayerSubmit = (perventreload) => {
  //   perventreload.preventDefault(); // Stops page reload
  //   if (players.X && players.O) {
  //     // Check if both names are entered
  //     setGameStarted(true); // Start the game
  //   }
  // };

  // when players enter names and click for Start the game
  const handlePlayerSubmit = (PerventReload) => {
    PerventReload.preventDefault();
    if (players.X && players.O) {
      setGameStarted(true)
    }
  }

  // When someone clicks a box
  const handleClick = (index) => {
    if (board[index] || winner) return; // If box is filled or game is over, do nothing

    const newBoard = [...board]; // Copy the current board
    newBoard[index] = currentPlayer; // Put X or O in clicked box
    setBoard(newBoard); // Update the board

    checkWinner(newBoard); // Check if someone won
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Switch player
  };

  // Check if someone won or it's a draw
  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(players[board[a]]); // Set winner name
        return;
      }
    }
    if (!board.includes(null)) {
      // If no empty boxes left
      setWinner("draw"); // It's a draw
    }
  };

  // Reset the game to play again
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Clear board
    setCurrentPlayer("X"); // X starts again
    setWinner(null); // No winner yet
  };

  // A single box in the game
  const Square = ({ value, index }) => (
    <button
      className={`w-20 h-20  border-2 text-4xl font-bold
                 ${value === "X" ? "text-blue-500" : "text-red-500"} 
                 bg-white hover:bg-gray-100`}
      onClick={() => handleClick(index)}
      disabled={value || winner} // Disable if filled or game over
    >
      {value} {/* Show X or O */}
    </button>
  );

  // Form to enter player names
  if (!gameStarted) {
    return (
      <div className="w-max h-max rounded-2xl flex items-center justify-center">
        <form
          onSubmit={handlePlayerSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            Tic-Tac-Toe
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-blue-600">Player X Name:</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded bg-gray-50 text-black"
                value={players.X}
                onChange={(e) => setPlayers({ ...players, X: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 text-red-600">Player O Name:</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded bg-gray-50 text-black"
                value={players.O}
                onChange={(e) => setPlayers({ ...players, O: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Start Game🏁
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Game board when playing
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1B4D3E] overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-[#F1E3D3]">
        {winner
          ? winner === "draw"
            ? "It's a Draw!"
            : `${winner} Wins!`
          : `${players[currentPlayer]}'s Turn (${currentPlayer})`}
      </h1>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {board.map((value, index) => (
          <Square key={index} value={value} index={index} />
        ))}
      </div>

      {/* Play Again button shows only if game is over */}
      {winner && (
        <button
          onClick={resetGame}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Play Again👍
        </button>
      )}
    </div>
  );
}
