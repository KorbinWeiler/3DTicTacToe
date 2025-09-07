import { processPostRequest } from "./APIHelper";

const serverURL = "http://localhost:4000";

async function updateUserInfo(updatedUserInfo){
    const url = serverURL + `/update/User`;
    const res = processPostRequest(url, updatedUserInfo);
}

export {updateUserInfo}