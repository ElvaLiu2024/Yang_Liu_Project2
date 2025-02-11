import React from "react";
import "../styles/Scores.css"; 

const Scores = () => {
    const highScores = [
        { rank: 1, username: "CaptainJack", wins: 120, losses: 30 },
        { rank: 2, username: "SeaDestroyer", wins: 110, losses: 35 },
        { rank: 3, username: "WaveRider", wins: 95, losses: 45 },
        { rank: 4, username: "TorpedoTom", wins: 85, losses: 50 },
        { rank: 5, username: "OceanBlaster", wins: 70, losses: 65 },
    ];

    return (
        <div className="scores-content">
            <h2>High Scores</h2>
            <table className="scores-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Games Won</th>
                        <th>Games Lost</th>
                    </tr>
                </thead>
                <tbody>
                    {highScores.map((player) => (
                        <tr key={player.rank}>
                            <td>{player.rank}</td>
                            <td>{player.username}</td>
                            <td>{player.wins}</td>
                            <td>{player.losses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scores;