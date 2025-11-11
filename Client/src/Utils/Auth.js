import axios from 'axios';

const serverIP = import.meta.env.SERVER_IP
const serverPort = import.meta.env.SERVER_PORT
const url = `http://${serverIP}:${serverPort}`;

const login = async (Username, Password) => {
    const loginURL = `${url}/login`;
    const res = await axios.post(loginURL, {
        username: Username,
        password: Password
    });
    return res.data.token;
};

const getProfile = async () => {
    const profileURL = `${url}/profile`;
    const res = await axios.get(profileURL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data
};

const registerUser = async (username, email, password) => {
    const registerURL = `${url}/register`;
    const res = await axios.post(registerURL, {
        username: username,
        password: password,
        email: email
    })
    return res.data;
};

const mockLogin = (Username, Password) => {
    // Mock login function for testing purposes
    if (Username === 'test' && Password === 'password') {
        return 'mocked_token_12345';
    }
    else{
        return "Bad Credentials";
    }
}

export { login, getProfile, registerUser, mockLogin }