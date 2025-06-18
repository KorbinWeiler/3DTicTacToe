import { useState } from "react";

export default function LoginPage(){
    let username = '';
    let password = '';
    let validUserLogin = true

    const [inactive, setActivive] = useState(true)
    const [error, setError] = useState(false);

    function validateUser(){
        if(username == '' && password == ''){
            validUserLogin = false;
        }
    }

    return(
            <div className="login box-format">
                <form>
                    {error ? <p className="error">Username or Password is incorrect</p> : null}
                    <input className="text-input" type='text' placeholder="Username" onChange={(e)=>{username = e.target.value;}}></input>
                    <input className="text-input" type="password" placeholder="Password" onChange={(e)=>{password=e.target.value; if(username != "" && password != ''){setActivive(false)}}}/>
                    <button className="button login-button" type='button' disabled={inactive} onClick={validateUser}>Login</button>
                </form>
            </div>
    )
}