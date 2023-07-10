# Tic Tac Toe

A Tic Tac Toe game with Minimax algorithm built with React, TypeScript, and CSS.

## Introduction

This is a web-based implementation of the classic game Tic Tac Toe. It allows two human players to play against each other or play against an AI player that uses the Minimax algorithm to make intelligent moves.

## Game Rules

- The game is played on a 3x3 grid.
- Players take turns marking an empty cell with their respective symbol (X or O).
- The first player to get three of their symbols in a row, column, or diagonal wins the game.
- If all cells are filled and no player has won, the game is a draw.

## AI Player using Minimax Algorithm

In the "AI vs Player" mode, the game uses the Minimax algorithm to determine the best move for the AI player. The Minimax algorithm is a decision-making algorithm used in two-player games. It explores all possible game outcomes by recursively evaluating each move and its potential outcomes, ultimately selecting the move that minimizes the maximum possible loss. This allows the AI player to make optimal moves and play the game strategically.

## Features

- Choose between "Player vs Player" or "AI vs Player" game modes.
- Responsive design and intuitive user interface.
- Players can enter their names for customization.
- Status display indicating the current player's turn and game result.

## Getting Started

1. Clone the repository: `git clone https://github.com/patelrudy/TIC-TAC-TOE.git`
2. Install dependencies: `cd tic-tac-toe` and `npm install`
3. Start the development server: `npm start`
4. Open the game in your web browser: `http://localhost:3000`

## Technologies Used

- React: JavaScript library for building user interfaces.
- TypeScript: Superset of JavaScript that adds static typing.
- CSS: Cascading Style Sheets for styling the components.
