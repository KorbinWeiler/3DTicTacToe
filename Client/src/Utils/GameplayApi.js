
const serverIP = import.meta.env.SERVER_IP
const serverPort = import.meta.env.SERVER_PORT
const url = `http://${serverIP}:${serverPort}`;

//
// async function SendMove(gameID, boardState, token, player) {
//     try {
//         const response = await fetch(`${url}/api/games/${gameID}/move`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ boardState, player })
//         });
//         const data = await response.json();
//         if (!response.ok) {
//             throw new Error(data.error || 'Failed to send move');
//         }
//         return data;
//     } catch (error) {
//         console.error('Error sending move:', error);
//         throw error;
//     }
// }

// export { SendMove };