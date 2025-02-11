import React from "react";
import {Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Rules from "./pages/Rules";
import Scores from "./pages/Scores";
import { GameProvider } from "./context/GameContext";
import "./styles/Main.css";

function App() {
    return (
        <GameProvider> 
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/scores" element={<Scores />} />
                </Routes>
            </div>
            <Footer />
        </GameProvider>
    );
}

export default App;
