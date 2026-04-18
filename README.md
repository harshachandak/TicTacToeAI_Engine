# TicTacToe_AI_Multiplayer
I engineered a sophisticated Tic-Tac-Toe engine that implements the Minimax recursive algorithm to create an unbeatable AI opponent. This implementation moves beyond basic game logic by simulating every possible move combination to determine the mathematically optimal path, ensuring the AI never loses.

The application’s core strength lies in its modular state management. I developed a "Time-Travel" system that captures immutable snapshots of the board state after every turn. This architecture allows users to traverse the game’s history and resume play from any previous point, demonstrating a deep understanding of data persistence and historical state tracking.

The software is designed with a clean separation of concerns, using ES6 Modules to decouple the decision-making algorithms from the UI event handling. This structured approach, combined with a responsive layout built via CSS Grid, demonstrates professional-grade front-end engineering and a focus on building scalable, maintainable codebases.

Technical Stack & Features
Algorithmic Logic: Utilized the Minimax algorithm with recursive scoring to achieve perfect play.

Data Integrity: Implemented a state-history array to manage board snapshots and "Time-Travel" functionality.

Adaptive Intelligence: Created logic gates to support multiple AI difficulty levels, from stochastic (random) to deterministic (Minimax).

Modern Architecture: Organized the codebase into modular components for improved readability and testing.
