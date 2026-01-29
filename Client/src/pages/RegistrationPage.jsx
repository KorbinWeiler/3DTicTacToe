import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, login } from '../Utils/Auth';
import { UserContext } from '../Utils/UserContext';


export default function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const { Token: [token, setToken] } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            if (!username || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }
            await registerUser(username, email, password);
            const newToken = await login(username, password);
            if (newToken) {
                sessionStorage.setItem('user', JSON.stringify({ name: newToken.user, rank: 0, points: 0, gameID: null }));
                sessionStorage.setItem('token', newToken.token);
                setToken(newToken.token);
                navigate('/');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. See console for details.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Create an account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 text-center">
                    Already have an account? <a href="/login" className="text-emerald-600 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}