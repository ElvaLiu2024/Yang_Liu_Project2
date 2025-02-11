import React from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";

const MainContent = () => {
    return (
        <section className="main-content">
            <div className="content">
                <h1>Welcome to <span>Battleship</span></h1>
                <p>Prepare your fleet and sink your opponent's ships!</p>
                <Link to="/game" className="start-button">Start Game</Link>
            </div>
        </section>
    );
};

export default MainContent;

