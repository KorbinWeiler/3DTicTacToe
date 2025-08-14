import "../Styles/ComponentStyles.css";
export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <p>3D Tic Tac Toe</p>
                <div>
                    <a className="navbar-item" href="/">Home</a>
                    <a className="navbar-item" href="/">Games</a>
                    <a className="navbar-item" href="/">Friends</a>
                    <a className="navbar-item" href="/Invite">Invite</a>
                    <a className="navbar-item" href="/Profile">Profile</a>
                    <a className="navbar-item" href="/login">Login</a>
                </div>
            </nav>
        </>
    );
}