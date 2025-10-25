import { processPostRequest } from "./APIHelper";

const serverIP = import.meta.env.SERVER_IP
const serverPort = import.meta.env.SERVER_PORT
const url = `http://${serverIP}:${serverPort}`;

async function updateUserInfo(updatedUserInfo){
    const url = serverURL + `/update/User`;
    const res = processPostRequest(url, updatedUserInfo);
}

export {updateUserInfo}