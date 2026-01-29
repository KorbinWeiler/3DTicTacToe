import { useState, useContext } from 'react';
import {login, LoginAsGuest} from '../Utils/Auth';
import {UserContext} from '../Utils/UserContext'
import { useNavigate, Link } from 'react-router-dom';


export default function LoginPage() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { Token, User } = useContext(UserContext);
    const [token, setToken] = Token;
    let user = User

    const handleSubmit = async (e) => {
        e.preventDefault();
        let LoginData = null;
        // Handle login logic here
        if (username === '' || password === '') {
            alert("Please enter both username and password.");
            return;
        }
        try{
            LoginData = await login(username, password);
        } catch (error) {
            console.error('Login failed:', error);
            alert("Login failed. Please check your credentials and try again.");
            return;
        }
        console.log("Login Data: ", LoginData);
        if (LoginData) {
            sessionStorage.setItem('user', JSON.stringify({ name: LoginData.user, rank: 0, points: 0, gameID: null }));
            sessionStorage.setItem('token', LoginData.token);
            const newToken = LoginData.token;
            setToken(newToken);
            navigate('/');
        }
    };

    const GuestLogin = async (e) => {
        e.preventDefault();
        let LoginData = null;
        try{
            LoginData = await LoginAsGuest();
        } catch (error) {
            console.error('Guest Login failed:', error.message);
            alert("Guest Login failed. Please try again.");
            return;
        }
        if (LoginData) {
            sessionStorage.setItem('user', JSON.stringify({ name: LoginData.user, rank: 0, points: 0, gameID: null }));
            sessionStorage.setItem('token', LoginData.token);
            const newToken = LoginData.token;
            setToken(newToken);
            navigate('/');
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-5xl w-full mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-transparent">
                    <aside className="hidden md:flex flex-col justify-center gap-6 p-8 rounded-2xl bg-linear-to-tr from-green-600 via-lime-500 to-green-300 text-white shadow-lg">
                        <h2 className="text-3xl font-extrabold">3D Tic Tac Toe</h2>
                        <p className="text-slate-100/90">Play a modern 3D take on the classic game. Sign in to track progress, play online, and challenge friends.</p>
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 opacity-90">
                            <defs>
                                <linearGradient id="g" x1="0" x2="1">
                                    <stop offset="0" stopColor="rgba(255,255,255,0.3)" />
                                    <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
                                </linearGradient>
                            </defs>
                            <rect x="10" y="10" width="180" height="180" rx="16" fill="url(#g)"/>
                        </svg>
                        <div className="text-sm opacity-90">New here? <Link to="/Register" className="underline font-semibold">Create an account</Link></div>
                    </aside>

                    <main className="bg-white dark:bg-slate-800 rounded-2xl shadow p-8">
                        <div className="mb-6 text-center">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sign in</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">Enter your credentials to access your account</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex justify-end text-sm">
                                <Link to="#" className="text-indigo-600 hover:underline">Forgot password?</Link>
                            </div>

                            <button type="submit" className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow">Sign in</button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-white dark:bg-slate-800 px-2 text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button onClick={GuestLogin} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">Guest</button>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-sm text-slate-500">Don't have an account? <Link to="/Register" className="text-indigo-600 font-medium">Register</Link></p>
                    </main>
                </div>
            </div>
        </div>
    );
}