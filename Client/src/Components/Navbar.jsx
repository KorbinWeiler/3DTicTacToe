import "../Styles/ComponentStyles.css";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Navbar() {

    const {Token} = useContext(UserContext);
    const [token, setToken] = Token;
    return (
        <>
            <nav className="navbar">
                <p>3D Tic Tac Toe</p>
                <div>
                    <a className="navbar-item" href="/">Home</a>
                    <a className="navbar-item" href="/Games">Games</a>
                    <a className="navbar-item" href="/Friends">Friends</a>
                    <a className="navbar-item" href="/Invite">Invite</a>
                    <a className="navbar-item" href="/Profile">Profile</a>
                    <a className="navbar-item" href="/login">{token ? "Sign Out" : "Login"}</a>
                </div>
            </nav>
        </>
    );
}