# 3D Tic Tac Toe

## Description

3D Tic Tac Toe is a full-stack multiplayer web application that takes the classic tic-tac-toe game into a 4×4×4 three-dimensional playing space. Players register or log in as guests, challenge other online users to a game, and compete in real-time. The first player to place four marks in a row — along any axis, diagonal, or space diagonal — wins. The platform tracks game history, player rankings, and provides a social layer with friend invitations and an active-users list.

---

## Tech Stack

**Frontend**
- React with React Router DOM
- Tailwind CSS
- Socket.IO Client
- Axios

**Backend**
- Node.js with Express
- Socket.IO (real-time WebSocket layer)
- PostgreSQL (persistent storage)
- JWT

**DevOps / Tooling**
- Docker & Docker Compose
- Vitest (unit testing, client & server)
- ESLint, nodemon

---

## Architecture

The application is split into three services orchestrated by Docker Compose:

```
┌─────────────┐        REST (port 3000)         ┌────────────────────┐
│             │ ──────────────────────────────► │                    │
│   Client    │                                 │   Express Server   │
│             │ ◄────────────────────────────── │                    │
│  (port 80)  │      Socket.IO (port 3001)      │   (ports 3000 &    │
│             │ ◄──────────────────────────────►│       3001)        │
└─────────────┘                                 └────────┬───────────┘
                                                         │
                                                         │ SQL
                                                         ▼
                                                ┌────────────────────┐
                                                │     PostgreSQL     │
                                                │    (port 5432)     │
                                                └────────────────────┘
```

**Client** — A React single-page application. A `UserContext` provides global state (JWT token, current user, socket reference). Routes are split into public (login, register) and protected (game, profile, friends). Real-time updates are handled via a persistent Socket.IO connection.

**Server** — Express handles authentication and REST endpoints on port 3000. A separate Socket.IO server runs on port 3001 and manages all real-time game and social events. JWT middleware protects private routes and socket connections.

**Database** — PostgreSQL stores users, games, and invitations. The schema is automatically applied from `schema.sql` on first start. Tables:
- `Users` — username (PK), password hash, email, created date
- `Games` — game ID, player X, player O, board state (JSON), current turn, winner
- `Invites` — invite ID, sender, recipient, status (`pending` / `accepted`)

---

## Features

- **3D 4×4×4 board** — win by placing four marks in a row along any of 13 possible directions (rows, columns, pillars, face diagonals, and space diagonals)
- **User accounts** — register with email & password, or join instantly as a guest with a random username
- **JWT authentication** — tokens expire after one hour; protected routes and socket connections require a valid token
- **Real-time multiplayer** — moves, invitations, and game updates are pushed via Socket.IO with no polling
- **Game invitations** — send, accept, or decline invitations to other online players
- **Active users list** — see who is currently online and available to play
- **Game history** — completed games are persisted and viewable per player
- **Leaderboard / ranking** — players accumulate points and a rank across games

---

## How to Run

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose

### 1. Configure environment variables

Create a `.env` file in the project root:

```env
# PostgreSQL
POSTGRES_USER=tictactoe
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=tictactoe
PG_PORT=5432

# Server
JWT_SECRET=your_jwt_secret
SERVER_PORT=3000
SOCKET_PORT=3001

# Client (injected at build time by Vite)
VITE_SERVER_IP=localhost
VITE_SERVER_PORT=3000
VITE_SOCKET_PORT=3001
```

### 2. Start with Docker Compose

```bash
# Start all services (database, server, client)
npm run up

# Or run in detached (background) mode
npm run up:detached

# Stop all services
npm run down
```

The client will be available at **http://localhost:80**, and the server API at **http://localhost:3000**.

### Running locally without Docker

**Server**
```bash
cd Server
npm install
npm run migrate   # apply database schema
npm start         # starts with nodemon (auto-reload)
```

**Client**
```bash
cd Client
npm install
npm run dev       # Vite dev server at http://localhost:5173
```

> Make sure a PostgreSQL instance is running and the environment variables point to it before starting the server.

### Tests

```bash
# Server tests
cd Server && npm test

# Client tests
cd Client && npm test
```
