import "../Styles/ComponentStyles.css";
import { useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import { Link } from "react-router-dom";


export default function Navbar() {

    const {Token, Socket} = useContext(UserContext);
    const [token, setToken] = Token;
    const socket = Socket;
    const currentToken = sessionStorage.getItem('token');
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
                    {/* <a onClick={()=>{() => {if(token){sessionStorage.setItem("token", "1")}; console.log("Token before Nav " + sessionStorage.getItem("token"))}}} className="navbar-item" href="/login">{token ? "Sign Out" : "Login"}</a> */}
                    <Link to="/login" className="navbar-item" onClick={() => {
                        if (currentToken) {
                            setToken(null);
                            sessionStorage.removeItem("token");
                            sessionStorage.removeItem("user");
                            socket.disconnect();
                        }
                    }}>{currentToken ? "Sign Out" : "Login"}</Link>
                </div>
            </nav>
        </>
    );
}