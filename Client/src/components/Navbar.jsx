import { useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const {Token, Socket} = useContext(UserContext);
    const [token, setToken] = Token;
    const socket = Socket;
    const currentToken = sessionStorage.getItem('token');

    const handleSignOut = () => {
        if (currentToken) {
            setToken(null);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            try { socket?.disconnect?.(); } catch (e) {}
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/80 border-b-4 border-emerald-100 dark:border-emerald-800 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-6">
                            <Link to="/" className="text-xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-300">3D Tic Tac Toe</Link>
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/" className="text-sm text-slate-700 dark:text-slate-200 hover:text-emerald-600">Home</Link>
                                <Link to="/Games" className="text-sm text-slate-700 dark:text-slate-200 hover:text-emerald-600">Games</Link>
                                <Link to="/Friends" className="text-sm text-slate-700 dark:text-slate-200 hover:text-emerald-600">Friends</Link>
                                <Link to="/Invite" className="text-sm text-slate-700 dark:text-slate-200 hover:text-emerald-600">Invite</Link>
                                <Link to="/Profile" className="text-sm text-slate-700 dark:text-slate-200 hover:text-emerald-600">Profile</Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link to="/login" onClick={handleSignOut} className="text-sm px-4 py-2 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-600/20 dark:text-emerald-300">{currentToken ? 'Sign Out' : 'Login'}</Link>
                        </div>
                    </div>
                </div>
        </nav>
    )
}