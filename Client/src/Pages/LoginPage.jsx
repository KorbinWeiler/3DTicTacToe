import { useState, useContext } from 'react';
import {login, mockLogin} from '../Utils/Auth';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { Token: [token, setToken], User } = useContext(UserContext);
    let user = User
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        const LoginData = mockLogin(username, password);
        if (LoginData) {
            sessionStorage.setItem('user', LoginData.user);
            user = LoginData.user;
            setToken(LoginData.token);
            navigate('/')
        }
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Token:', LoginData.token);
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