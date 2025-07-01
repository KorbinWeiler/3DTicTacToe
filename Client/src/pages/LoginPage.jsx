import { useState, useContext } from "react";
import { gameContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    let validUserLogin = true
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const {ClientID} = useContext(gameContext)
    const [clientID, setClientID] = ClientID

    const [inactive, setActivive] = useState(true)
    const [error, setError] = useState(false);

    function validateUser(username, password){
        if(username === '' && password === ''){
            validUserLogin = false;
        }
        if (validUserLogin){
            setClientID(username)
            navigate("/")
        }
    }

    return(
            <div className="login box-format">
                <form>
                    {error ? <p className="error">Username or Password is incorrect</p> : null}
                    <input className="text-input" type='text' placeholder="Username" onChange={(e)=>{setUserName(e.target.value); if(userName != "" && password != ''){setActivive(false)}}}></input>
                    <input className="text-input" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); if(userName != "" && password != ''){setActivive(false)}}}/>
                    <button className="button login-button" type='button' disabled={inactive} onClick={()=>{console.log(userName); validateUser(userName, password)}}>Login</button>
                </form>
            </div>
    )
}