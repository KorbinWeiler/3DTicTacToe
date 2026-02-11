import axios from 'axios';

// Use VITE_API_URL from docker-compose, or build from IP:PORT for local dev
const url = import.meta.env.VITE_API_URL || `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`;

const login = async (Username, Password) => {
    const loginURL = `${url}/login`;
    const hashedPassword = await hashPassword(Password); 
    console.log("password: ", hashedPassword);

    const res = await fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            password: hashedPassword,
        }),
    });

    if (!res.ok) {
        throw new Error(`Login failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
};

const getProfile = async () => {
    const profileURL = `${url}/profile`;

    const res = await fetch(profileURL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Get profile failed with status ${res.status}`);
    }

    return res.json();
};

const registerUser = async (username, email, password) => {
    const registerURL = `${url}/register`;
    const hashedPassword = await hashPassword(password);
    const res = await fetch(registerURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: hashedPassword,
            email: email,
        }),
    });

    if (!res.ok) {
        throw new Error(`Register failed with status ${res.status}`);
    }

    return res.json();
};

async function hashPassword(password) {
    return await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password)).then(hashBuffer => {
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    });
}

async function LoginAsGuest(){
    const guestLoginURL = `${url}/guestLogin`;
    const res = await fetch(guestLoginURL);
    if (!res.ok) {
        throw new Error(`Guest login failed with status ${res.status}`);
    }
    return res.json();
}

const mockLogin = (Username, Password) => {
    // Mock login function for testing purposes
    if (Username === 'test' && Password === 'password') {
        return {token: Date.now().toString(), user: null};
    }
    else{
        return null;
    }
}

export { login, getProfile, registerUser, mockLogin, LoginAsGuest }