//make a component that displays a login form with username and password fields, and a submit button
import React, { useState } from 'react';
//import './LoginPage.css';
import {login} from '../Utils/Auth';
export default function LoginPage() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        newToken = login(username, password);
        if (!newToken) {
           setToken(newToken);
        }
        console.log('Username:', username);
        console.log('Password:', password);
    };
    
    return (
        <div className="login-container">
        <form>
            <h2>Login</h2>
            <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
        </div>
    );
}