import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, login } from '../Utils/Auth';
import { UserContext } from '../Utils/UserContext';
import '../Styles/RegistrationPage.css';


export default function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const { Token: [token, setToken] } = useContext(UserContext);

    const handleSubmit = async (e) => {
        console.log("hitting", confirmPassword)
        // Handle registration logic here
        try {
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            if (username === '' || email === '' || password === '') {
                alert("Please fill in all fields.");
                return;
            }
            const res = await registerUser(username, email, password);
            console.log("Registration Response: ", res);
            const newToken = await login(username, password);
            if (newToken) {
                sessionStorage.setItem('user', JSON.stringify({ name: newToken.user, rank: 0, points: 0, gameID: null }));
                sessionStorage.setItem('token', newToken.token);
                setToken(newToken.token);
                navigate('/');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="registration-page">
            <form className='registration-form' onSubmit={(e) => {
                e.preventDefault();
                console.log("Submitting");
                handleSubmit(e)}}>
                <h2>Register</h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onMouseDown={(e) => {
                    console.log("button mousedown");
                }}>Register</button>
            </form>
            <a href="/login" className="registration-link">Already have an account? Login</a>
        </div>
    );
}