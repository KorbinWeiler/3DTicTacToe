import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Utils/UserContext";

export default function OnlineUsersComponent(){
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const {Socket, Token, User} = useContext(UserContext);
    const [token, ] = Token;
    const curUser = User;


    useEffect(() => {
        // Simulate fetching online users
        const fetchOnlineUsers = () => {
            // This would be replaced with an actual API call
            Socket.emit("get active users", User.name, token, (response)=>{
                if(response.error){
                    console.log("Error fetching users: ", response.error);
                    return;
                }
                setOnlineUsers(response);
            }); // Example data
            //setOnlineUsers(users);
        };

        fetchOnlineUsers();
    }, [refresh]);

    return (
        <div>
            <h2>Online Users</h2>
            {onlineUsers.length > 0 ? 
            onlineUsers.map((user, index) => (
                <div key={index} onClick={() => Socket.emit("invite", user, curUser.name)} className="online-users">
                    {user}
                </div>
                )) : 
            <p>No online users at the moment.</p>
            }
            <button className="refresh-button" onClick={() => setRefresh(prev => prev + 1)}>Refresh</button>
        </div>
    );
}