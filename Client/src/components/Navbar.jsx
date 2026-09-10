import { useContext, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import { Link } from "react-router-dom";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/Games", label: "Games" },
    { to: "/Friends", label: "Friends" },
    { to: "/Invite", label: "Invite" },
    { to: "/Profile", label: "Profile" },
];

export default function Navbar() {
    const {Token, Socket} = useContext(UserContext);
    const [, setToken] = Token;
    const socket = Socket;
    const currentToken = sessionStorage.getItem('token');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignOut = () => {
        if (currentToken) {
            setToken(null);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            try { socket?.disconnect?.(); } catch { /* already disconnected */ }
        }
    }

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/80 border-b-4 border-emerald-100 dark:border-emerald-800 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-6">
                        <Link to="/" onClick={closeMenu} className="text-lg sm:text-xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-300">3D Tic Tac Toe</Link>
                        <div className="hidden md:flex items-center gap-4">
                            {NAV_LINKS.map((l) => (
                                <Link key={l.to} to={l.to} className="text-sm text-slate-700 dark:text-slate-200 hover:text-emerald-600">{l.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link to="/login" onClick={handleSignOut} className="text-sm px-3 sm:px-4 py-2 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-600/20 dark:text-emerald-300">{currentToken ? 'Sign Out' : 'Login'}</Link>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={menuOpen}
                            className="md:hidden inline-flex items-center justify-center p-2 -mr-1 rounded-md text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-emerald-800/40"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                {menuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-emerald-100 dark:border-emerald-800 bg-white dark:bg-slate-900">
                    <div className="px-4 py-3 space-y-1">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                onClick={closeMenu}
                                className="block px-3 py-2 rounded-md text-base text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-emerald-800/40"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
