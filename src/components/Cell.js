import React from "react";

const Cell = ({ rowIndex, colIndex, status, onClick, onDrop, onDragOver }) => {
    return (
        <div
            className={`cell ${status}`}
            onClick={() => onClick(rowIndex, colIndex)}
            onDrop={(e) => onDrop(e, rowIndex, colIndex)} 
            onDragOver={(e) => onDragOver(e)} 
            style={{
                width: "30px",
                height: "30px",
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                backgroundColor: status === "hit" ? "#00cc00" : status === "miss" ? "red" : status === "ship" ? "blue" : "white",
                color: status === "hit" || status === "miss" ? "white" : "black",
                cursor: "pointer",
            }}
        >
            {status === "hit" ? "✔" : status === "miss" ? "X" : ""}
            
        </div>
    );
};

export default Cell;
