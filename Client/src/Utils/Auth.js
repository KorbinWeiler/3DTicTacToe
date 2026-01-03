import axios from 'axios';

const serverIP = import.meta.env.VITE_SERVER_IP;
const serverPort = import.meta.env.VITE_SERVER_PORT;
const url = `http://${serverIP}:${serverPort}`;
console.log("Auth URL: ", url);

const login = async (Username, Password) => {
    const loginURL = `${url}/login`;
    console.log("Login URL: ", loginURL);

    const res = await fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            password: Password,
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

    const res = await fetch(registerURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
    });

    if (!res.ok) {
        throw new Error(`Register failed with status ${res.status}`);
    }

    return res.json();
};

const mockLogin = (Username, Password) => {
    // Mock login function for testing purposes
    if (Username === 'test' && Password === 'password') {
        return {token: Date.now().toString(), user: null};
    }
    else{
        return null;
    }
}

export { login, getProfile, registerUser, mockLogin }