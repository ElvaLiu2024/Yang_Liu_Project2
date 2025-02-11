# This is Yang-Liu-Project2 for CS5610-Spring2025

🚢 Battleship
Project Name: Battleship
Author: Yang Liu
GitHub Repository: https://github.com/ElvaLiu2024/Yang_Liu_Project2/
Deployed App (Heroku/Render):

🎯 Project Overview
Battleship is a classic strategy game where two players take turns attacking each other's ships until one player's fleet is completely destroyed. This project is developed using React + Context API to manage state and provide a seamless gaming experience.

The game supports two modes:

1.Normal Mode: You take turns attacking with an AI opponent. The AI avoids hitting the same spot twice.
2.Easy Mode: Free-play mode where you can click anywhere on the enemy board. The AI does not take any turns.

📜 Game Rules

1. Drag and drop ships onto the Player Board before starting.
2.Click on the enemy board to attack a cell.
3.Hit a ship: The tile is marked ✅ (green checkmark).
4.Miss: The tile is marked X (red X).
5.AI attacks your board (Only in Normal Mode).
6.Destroy all enemy ships to win the game!


🏆 Win Condition
1.If all of one player’s ships are destroyed, the game ends.
2.The screen displays: "Game Over! {Player or AI} Won!"
3.Players can click Restart Game to play again.