import Navbar from "../components/Navbar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Utils/UserContext";

export default function ProfilePage() {
    const { User, Token } = useContext(UserContext);
    const [token, setToken] = Token || [];
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        } catch (e) {}
        if (setToken) setToken(null);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Navbar />
            <main className="max-w-4xl mx-auto w-full p-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center md:items-start md:col-span-1">
                        <div className="w-28 h-28 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-3xl font-bold text-emerald-700 dark:text-emerald-200">{(User?.name || '?').charAt(0).toUpperCase()}</div>
                        <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{User?.name ?? 'Unknown'}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{User?.email ?? 'No email'}</p>
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile Details</h3>
                            <div className="mt-3 sm:mt-0 flex gap-2">
                                <button
                                    onClick={() => navigate('/profile/edit')}
                                    className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-md border bg-slate-50 dark:bg-slate-700">
                                <div className="text-xs text-slate-500">Rank</div>
                                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{User?.rank ?? 0}</div>
                            </div>
                            <div className="p-4 rounded-md border bg-slate-50 dark:bg-slate-700">
                                <div className="text-xs text-slate-500">Points</div>
                                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{User?.points ?? 0}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">About</h4>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">This is your public profile. You can edit your display name, email, and other preferences from the Edit Profile page.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}