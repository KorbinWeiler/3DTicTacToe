import { useState, useContext } from 'react';
import {login, mockLogin} from '../Utils/Auth';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { Token: [token, setToken] } = useContext(UserContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        const newToken = mockLogin(username, password);
        if (newToken) {
           setToken(newToken);
           navigate('/')
        }
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Token:', newToken);
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
            <a href='/Register'>Register as a new user</a>
        </form>
        </div>
    );
}