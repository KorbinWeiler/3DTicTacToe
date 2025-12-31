import "../Styles/ComponentStyles.css";
import { useContext } from "react";
import { UserContext } from "../Utils/UserContext";


export default function Navbar() {

    const {Token, Socket} = useContext(UserContext);
    const [token, setToken] = Token;
    const socket = Socket;
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
                    <a onClick={()=>{() => {if(token){sessionStorage.setItem("token", null)}}}} className="navbar-item" href="/login">{token ? "Sign Out" : "Login"}</a>
                </div>
            </nav>
        </>
    );
}