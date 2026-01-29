import { useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext";

export default function SearchUserComponent(){
    const [targetUsername, setTargetUsername] = useState("");
    const [results, setResults] = useState([]);
    const { Socket } = useContext(UserContext);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!targetUsername) return;
        if (!Socket) {
            console.log("Searching for user:", targetUsername);
            return;
        }
        Socket.emit("search user", targetUsername, (response) => {
            if (response?.error) {
                console.log("Search error:", response.error);
                setResults([]);
                return;
            }
            setResults(Array.isArray(response) ? response : [response]);
        });
    }

    const handleInvite = (username) => {
        if (!Socket) return;
        Socket.emit('invite', username, (ack) => {
            // optional ack handling
            console.log('invite ack', ack);
        });
    }

    return (
        <div className="search-user-component w-full">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search for a user..."
                    onChange={(e) => setTargetUsername(e.target.value)}
                    value={targetUsername}
                    className="flex-1 rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-2"
                />
                <button type="submit" className="px-3 py-2 bg-emerald-600 text-white rounded-md">Search</button>
            </form>

            {results.length > 0 && (
                <div className="mt-3 space-y-2">
                    {results.map((r, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-md border bg-white dark:bg-slate-800">
                            <div className="text-sm text-slate-900 dark:text-slate-100">{typeof r === 'string' ? r : r.name}</div>
                            <div>
                                <button onClick={() => handleInvite(typeof r === 'string' ? r : r.name)} className="px-2 py-1 text-sm bg-emerald-600 text-white rounded-md">Invite</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}