import React, { useEffect, useState, useContext } from 'react';
import {UserContext} from '../Utils/UserContext';
import Navbar from '../components/Navbar';
import GameComponent from '../components/GameComponent';

const HomePage = () => {
  const { Token, User } = useContext(UserContext);
  const user = User;
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
      { name: 'Bob', points: 1400 },
      { name: 'Charlie', points: 1300 }
    ]);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <p className='w-screen flex items-center justify-center'>Early Build: please refresh the page to connect to the server.</p>
      <main className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-7xl mx-auto w-full px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome, {user?.name || 'Guest'}!</h1>
                    <p className="text-sm text-slate-500">Rank #{user?.rank ?? '—'} • {user?.points ?? 0} pts</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Your Turn</h2>
                {myTurnGames.length === 0 ? (
                  <p className="text-sm text-slate-500">No games waiting for your move.</p>
                ) : (
                  <div className="space-y-3">
                    {myTurnGames.map((game) => (
                      <GameComponent key={game.ID} Game={game} yourTurn={true} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside className="lg:col-span-1 space-y-6">
              <div className="sticky top-6 bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold">Profile</h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{user?.name || 'Guest'}</p>
                <p className="text-sm text-slate-500">Rank #{user?.rank ?? '—'}</p>
                <p className="text-sm text-slate-500">{user?.points ?? 0} pts</p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold">Leaderboard</h3>
                <ol className="mt-3 space-y-2">
                  {leaderboard.map((player, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-200">{player.name}</span>
                      <span className="text-slate-500">{player.points} pts</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;