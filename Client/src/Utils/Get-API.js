import { processGetRequest } from "./APIHelper";

const serverURL = "http://localhost:4000";

// function getActiveUsers(){
//     const apiURL = serverURL + "/activeUsers";
//     return fetch(apiURL, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });
// }

async function getActiveUsers(){
    const url = serverURL + "/activeUsers"
    const res = await processGetRequest(url);
    if(res){
        return res;
    }
}

async function getUserGames(userID){
    const url = serverURL + `/games/${userID}`
    const res = await processGetRequest(url);
    if(res){
        return res;
    }
}

async function getUserFriends(userID){
    const url = serverURL + `/friends/${userID}`
    const res = await processGetRequest(url);
    if(res){
        return res;
    }
}

async function getFriendRequests(userID){
    const url = serverURL + `/friends/${userID}/requests`
    const res = await processGetRequest(url);
    if(res){
        return res;
    }
}

async function getGlobalLeaderBoard(){
    const url = serverURL + `/leaderboard`;
    const res = await processGetRequest(url);
    if(res){
        return res;
    }
}

async function getLocalLeaderBoard(userID){
    const url = serverURL + `/leaderboard/${userID}`;
    const res = await processGetRequest(url);
    if(res){
        return res;
    }
}

// async function getData() {
//   const url = "https://example.org/products.json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

export { getActiveUsers, getUserGames, getFriendRequests, getUserFriends, getGlobalLeaderBoard, getLocalLeaderBoard };