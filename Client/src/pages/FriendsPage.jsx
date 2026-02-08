import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Modal from "../Components/Modal";

export default function FriendsPage() {

    const [addFriendsOpen, setAddFriendsOpen] = useState(false);
    const [friendInvitesOpen, setFriendInvitesOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // Mock friends — replace with API
        setFriends([
            { id: 1, name: 'Alice', status: 'online' },
            { id: 2, name: 'Bob', status: 'offline' },
            { id: 3, name: 'Charlie', status: 'online' }
        ]);
    }, []);

    const filtered = friends.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Navbar />

            <main className="w-full flex-1 flex justify-center">
                <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Friends</h1>
                        <p className="text-sm text-slate-500">Manage your friends and invites</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <section className="max-w-3xl mx-auto w-full">
                        <div className="mb-4">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search friends"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                            />
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow divide-y">
                            {filtered.length === 0 ? (
                                <div className="p-6 text-sm text-slate-500">No friends found.</div>
                            ) : (
                                filtered.map(friend => (
                                    <div key={friend.id} className="p-4 flex items-center justify-between">
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{friend.name}</div>
                                            <div className="text-xs text-slate-500">{friend.status}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="px-3 py-1 text-sm text-red-600 border rounded">Remove</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Suggestions removed per request */}
                </div>
                <div className="flex items-center justify-center mt-6 gap-3">
                    <button onClick={() => setFriendInvitesOpen(true)} className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-md text-sm">View Invites</button>
                    <button onClick={() => setAddFriendsOpen(true)} className="px-3 py-2 bg-emerald-600 text-white rounded-md text-sm">Add Friend</button>
                </div>
                </div>
            </main>

            <Modal isOpen={addFriendsOpen} onClose={() => setAddFriendsOpen(false)} children={<div className="p-4">Add Friend Form</div>} />
            <Modal isOpen={friendInvitesOpen} onClose={() => setFriendInvitesOpen(false)} children={<div className="p-4">Friend Invites List</div>} />
        </div>
    );
}