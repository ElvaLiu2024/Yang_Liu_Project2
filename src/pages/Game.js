import React, { useContext, useState, useEffect } from "react";
import { useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Board from "../components/Board";
import GameContext from "../context/GameContext";
import { aiAttackPlayer, createEmptyGrid, checkIfGameOver } from "../utils/logic"; 
import "../styles/Game.css";
import Ship from "../components/Ship";

const Game = () => {
   
    const { mode, toggleModeAndReset, gameOver, setGameOver } = useContext(GameContext);

    const [enemyGrid, setEnemyGrid] = useState(createEmptyGrid());
    
    const [playerGrid, setPlayerGrid] = useState(createEmptyGrid());
    
    const [timer, setTimer] = useState(0);
    const [orientation, setOrientation] = useState("horizontal");

    const [ships, setShips] = useState({
        "5x1": 1,
        "4x1": 1,
        "3x1": 2,
        "2x1": 1,
    });

    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
            return () => clearInterval(interval); 
        }
    }, [gameStarted, gameOver]);

    const handleDragStart = (e, length) => {
        e.dataTransfer.setData("length", length);  
        e.dataTransfer.setData("orientation", orientation);
    };

   const handleDrop = (e, row, col) => {
     e.preventDefault();

     const shipLength = parseInt(e.dataTransfer.getData("length"), 10);
     const shipOrientation = e.dataTransfer.getData("orientation");

     const newGrid = [...playerGrid];

     if (isValidPlacement(row, col, shipLength, shipOrientation, newGrid)) {
         for (let i = 0; i < shipLength; i++) {
             if (shipOrientation === "horizontal") {
                 newGrid[row][col + i] = "ship";
             } else {
                 newGrid[row + i][col] = "ship";
             }
         }

         setPlayerGrid(newGrid);
         const shipName = `${shipLength}x1`;
         if (ships[shipName] > 0) {
             setShips((prevShips) => {
                 const updatedShips = { ...prevShips };
                 updatedShips[shipName] -= 1;
                 return updatedShips;
             });
         }

         if (allShipsPlaced()) {
             setGameStarted(true); 
         }
     }
 };

    const isValidPlacement = (row, col, shipLength, orientation, grid) => {
        if (orientation === "horizontal" && col + shipLength > 10) return false;
        if (orientation === "vertical" && row + shipLength > 10) return false;

        for (let i = 0; i < shipLength; i++) {
            if (orientation === "horizontal" && grid[row][col + i] !== "empty") return false;
            if (orientation === "vertical" && grid[row + i][col] !== "empty") return false;
        }
        return true;
    };

    const toggleOrientation = () => {
        setOrientation((prevOrientation) => (prevOrientation === "horizontal" ? "vertical" : "horizontal"));
    };

    const handleEnemyClick = (row, col) => {
        
        if (!gameStarted || gameOver) {
            return;
        }

        setEnemyGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]); 
        if (newGrid[row][col] === "ship") {
            newGrid[row][col] = "hit";  
        } else if (newGrid[row][col] === "empty") {
            newGrid[row][col] = "miss"; 
        }
         if (checkIfGameOver(newGrid)) {
            setGameOver(true);
            setTimeout(() => alert("Game Over! You Win!"), 100);
        }

        return newGrid; 
    });

        if (mode === "normal"  && !gameOver) {
            setTimeout(() => {
                setPlayerGrid(prevGrid => aiAttackPlayer(prevGrid));
            }, 1000);
        }
    };


    const handlePlayerClick = (row, col) => {
        if (mode === "easy" || gameOver) return;

        const newGrid = [...playerGrid];
        if (newGrid[row][col] === "empty") {
            newGrid[row][col] = "miss";
        } else if (newGrid[row][col] === "ship") {
            newGrid[row][col] = "hit";
        }
        setPlayerGrid(newGrid);

        if (checkIfGameOver(newGrid)) {
            setGameOver(true);
            alert("Game Over! AI Wins!");
        }
    };

    const allShipsPlaced = () => {
        const allPlaced = Object.values(ships).every(count => count === 0);
        return allPlaced;
    };

  const placeRandomShip = useCallback((grid, shipLength) => {
    const directions = ["horizontal", "vertical"];
    let placed = false;

    while (!placed) {
        const randomRow = Math.floor(Math.random() * 10);
        const randomCol = Math.floor(Math.random() * 10);
        const direction = directions[Math.floor(Math.random() * 2)];

        if (isValidPlacement(randomRow, randomCol, shipLength, direction, grid)) {
            for (let i = 0; i < shipLength; i++) {
                if (direction === "horizontal") {
                    grid[randomRow][randomCol + i] = "ship";
                } else {
                    grid[randomRow + i][randomCol] = "ship";
                }
            }
            placed = true;
        }
    }
}, []);

const initializeEnemyShips = useCallback(() => {
    let tempGrid = createEmptyGrid();

    [5, 4, 3, 3, 2].forEach((shipLength) => {
        placeRandomShip(tempGrid, shipLength);
    });

    setEnemyGrid(tempGrid);
}, [placeRandomShip]);

    const resetGame = () => {
        setEnemyGrid(createEmptyGrid());
        setPlayerGrid(createEmptyGrid());
        setShips({
            "5x1": 1,
            "4x1": 1,
            "3x1": 2,
            "2x1": 1,
        });
        setGameStarted(false);
        setGameOver(false);
        setTimer(0);
        setTimeout(() => {
        initializeEnemyShips();
    }, 100); 
    };

    const startGame = () => {
        if (allShipsPlaced()) {
            setGameStarted(true); 
            console.log("Game started!");
        } else {
            alert("Please place all ships before starting the game.");
        }
    };

    useEffect(() => {
    initializeEnemyShips();
}, [initializeEnemyShips]);

    return (
        <div className="game-container">
            <Navbar />
            <main className="game-content">
                <h1>
                    You have entered  
                    <span className={`mode-indicator ${mode}-mode`}>
                        {mode === "normal" ? "Normal Mode" : "Easy Mode"}
                    </span>
                </h1>

                {mode === "normal" && (
                    <div className="timer">
                        <span>Time Started: {new Date(timer * 1000).toISOString().substring(14, 19)}</span>
                    </div>
                )}

                <div className="game-board">
                    <Board 
                        title="Enemy Board" 
                        grid={enemyGrid} 
                        onCellClick={handleEnemyClick} 
                    />
                    <Board 
                        title="Player Board" 
                        grid={playerGrid} 
                        onCellClick={handlePlayerClick} 
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}  
                    />
                </div>

                <div className="game-buttons">
                    <button className="change-mode-button" onClick={toggleModeAndReset}>
                        Switch to {mode === "normal" ? "Easy Mode" : "Normal Mode"}
                    </button>
                    <button className="toggle-orientation-button" onClick={toggleOrientation}>
                    Change to  {orientation === "horizontal" ? "vertical" : "horizontal"}
                    </button>
                </div>

                <div className="ship-container">
                    {ships["5x1"] > 0 && (
                        <Ship length={5} onDragStart={handleDragStart} />
                    )}
                    {ships["4x1"] > 0 && (
                        <Ship length={4} onDragStart={handleDragStart} />
                    )}
                    {ships["3x1"] > 0 && (
                        <Ship length={3} onDragStart={handleDragStart} />
                    )}
                    {ships["2x1"] > 0 && (
                        <Ship length={2} onDragStart={handleDragStart} />
                    )}
                </div>

                {!gameStarted ? (
                    <button onClick={startGame} disabled={!allShipsPlaced()} className="start-game-button">
                        Start Game
                    </button>
                ) : (
                    <button onClick={resetGame} className="start-game-button">
                        Restart Game
                    </button>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Game;
