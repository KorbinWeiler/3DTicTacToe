import React, { useEffect, useState, useContext } from 'react';
import '../Styles/HomePage.css';
import {UserContext} from '../Utils/UserContext';
import Navbar from '../components/Navbar';
import GameComponent from '../Components/GameComponent';

const HomePage = () => {
  //const user = {name: 'PlayerOne', rank: 5, points: 1200 }

  const { Token, User } = useContext(UserContext);
  const user = User;
  console.log("User in HomePage: ", user);
  const [token, setToken] = Token;
  const [myTurnGames, setMyTurnGames] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);


  useEffect(() => {
    // Mock data – replace with API calls
    setMyTurnGames([
      { ID: '1', Opponent: 'Alice', yourTurn: true },
      { ID: '2', Opponent: 'Bob', yourTurn: true }
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
      <h2>Early Build: To connect to the server manually refresh the page</h2>
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
                myTurnGames.map((game, index) => (
                  <div key={index} className="ongoing-game-item">
                      <GameComponent Game={game} yourTurn={true}/>
                  </div>
                )))}
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