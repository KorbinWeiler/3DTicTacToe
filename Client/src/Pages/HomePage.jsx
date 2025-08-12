import React, { useEffect, useState, useContext } from 'react';
import '../Styles/HomePage.css';
import {UserContext} from '../App';
import Navbar from '../Components/Navbar';

const HomePage = () => {
  const user = {name: 'PlayerOne', rank: 5, points: 1200 }

  const { Token } = useContext(UserContext);
  const [token, setToken] = Token;
  const [myTurnGames, setMyTurnGames] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  
//   useEffect(() => {
//     // Mock user info fetch
//     const storedUser = {
//       name: 'Jane Doe',
//       email: 'jane.doe@example.com',
//       role: 'Frontend Developer',
//     };

//     setUser(storedUser);
//   }, []);

  useEffect(() => {
    // Mock data – replace with API calls
    setMyTurnGames([
      { id: 'game1', opponent: 'Alice', lastMove: '2025-08-10' },
      { id: 'game2', opponent: 'Bob', lastMove: '2025-08-09' }
    ]);

    setLeaderboard([
      { name: 'Alice', points: 1500 },
      { name: 'Charlie', points: 1350 },
      { name: 'PlayerOne', points: 1200 },
      { name: 'Bob', points: 1100 }
    ]);
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <h1>Welcome, {user.name}!</h1>
      <div className='UserInfo'>
        <div>
          <header>
            <p>Rank #{user.rank} — {user.points} pts</p>
          </header>
          <section className="my-turn">
            <h2>Your Turn</h2>
            {myTurnGames.length === 0 ? (
              <p>No games waiting for your move.</p>
            ) : (
              <ul>
                {myTurnGames.map((game) => (
                  <li className='listItem' key={game.id}>
                    <strong>vs {game.opponent}</strong> — Last move: {game.lastMove}
                    <button onClick={() => alert(`Open Game ID: ${game.id}`)}>Play</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
        <section className="leaderboard">
          <h2>Leaderboard</h2>
          <ol>
            {leaderboard.map((player, index) => (
              <li key={index}>
                {player.name} — {player.points} pts
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default HomePage;