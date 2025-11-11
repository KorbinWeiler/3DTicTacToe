import { useState, useContext } from 'react';
import {login, mockLogin} from '../Utils/Auth';
import {UserContext} from '../Utils/UserContext'
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';


export default function LoginPage() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { Token, User } = useContext(UserContext);
    const [token, setToken] = Token;
    let user = User
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        const LoginData = mockLogin(username, password);
        if (LoginData) {
            sessionStorage.setItem('user', LoginData.user);
            sessionStorage.setItem('token', LoginData.token);
            user = LoginData.user;
            const newToken = LoginData.token;
            setToken(newToken);
            navigate('/');
        }
        console.log('Username:', username);
        console.log('Password:', password);
    };
    
    return (
        <>
        <div className="login-page">
        <form className='login-form'>
            <h2 className='login-header'>Login</h2>
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
        <div className="login-links">
            <a href='/Register'>Register as a new user</a>
            <a href='/'>Continue as Guest</a>
        </div>
        </>
    );
}