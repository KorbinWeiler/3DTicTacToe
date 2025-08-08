import axios from 'axios';

const login = async (Username, Password) => {
    const res = await axios.post('http://localhost:4000/login', {
        username: Username,
        password: Password
    });
    return res.data.token;
};

const getProfile = async () => {
    const res = await axios.get('http://localhost:4000/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data
};



export { login, getProfile }