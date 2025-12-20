import { useState, useEffect } from "react";

export default function OnlineUsersComponent(){
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        // Simulate fetching online users
        const fetchOnlineUsers = () => {
            // This would be replaced with an actual API call
            const users = ["User1", "User2", "User3"]; // Example data
            setOnlineUsers(users);
        };

        fetchOnlineUsers();
    }, [refresh]);

    return (
        <div>
            <h2>Online Users</h2>
            {onlineUsers.length > 0 ? 
            onlineUsers.map((user, index) => (
                <div key={index} className="online-users">
                    {user}
                </div>
                )) : 
            <p>No online users at the moment.</p>
            }
            <button className="refresh-button" onClick={() => setRefresh(prev => prev + 1)}>Refresh</button>
        </div>
    );
}