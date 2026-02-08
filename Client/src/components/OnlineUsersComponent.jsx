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
        <div className="online-users-component">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Online Users</h2>
                <button onClick={() => setRefresh(r => r + 1)} className="text-sm text-emerald-600 hover:underline">Refresh</button>
            </div>

            {onlineUsers?.length > 0 ? (
                <div className="grid gap-2">
                    {onlineUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 border rounded-md">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-sm font-medium text-emerald-700 dark:text-emerald-200">{(user?.charAt?.(0) || '?').toUpperCase()}</div>
                                <div className="text-sm text-slate-900 dark:text-slate-100">{user}</div>
                            </div>

                            {user !== curUser?.name ? (
                                <button onClick={() => Socket?.emit && Socket.emit('invite', user, curUser?.name)} className="px-2 py-1 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700">Invite</button>
                            ) : (
                                <span className="text-xs text-slate-400">You</span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-slate-500">No online users at the moment.</p>
            )}
        </div>
    );
}