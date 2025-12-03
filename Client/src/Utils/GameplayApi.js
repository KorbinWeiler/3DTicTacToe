import axios from "axios";

const serverIP = import.meta.env.SERVER_IP
const serverPort = import.meta.env.SERVER_PORT
const url = `http://${serverIP}:${serverPort}`;

const SendMove = async (gameId, move, token) => {
    const moveURL = `${url}/game/${gameId}/move`;
    const res = await axios.post(moveURL, { move }, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
}

export { SendMove };