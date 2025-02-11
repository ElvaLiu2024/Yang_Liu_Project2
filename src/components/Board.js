import React from "react";
import Cell from "./Cell";
import "../styles/Board.css";

const Board = ({ title, grid, onCellClick, onDrop, onDragOver }) => {
    const handleDragOver = (event) => {
        event.preventDefault();  
    };
    return (
        <div className="board">
            <h2>{title}</h2>
            <div className="grid">
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            status={grid[rowIndex][colIndex]} 
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                                onDrop={(event) => onDrop(event, rowIndex, colIndex)}
                                onDragOver={onDragOver || handleDragOver} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;