import {useState, useContext, useEffect} from 'react';
import Navbar from "../components/Navbar";
import InviteComponent from '../components/InviteComponent';
import Modal from '../components/Modal';
import { UserContext } from "../Utils/UserContext";
import { AccecptInvitation } from '../Utils/SocketMethods';

export default function InvitePage() {

    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const {User, Socket, Refresh} = useContext(UserContext);
    const [notifty, setNotify] = Refresh;
    const user = User;
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        if (!Socket) return;
        Socket.emit("get invites", user.name, (response) => {
            if (response?.error) {
                console.log("Error fetching invites: ", response.error);
                return;
            }
            setInvites(response || []);
        });
    }, [notifty, Socket, user?.name]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Navbar />

            <main className="w-full flex-1">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Invites</h1>
                            <p className="text-sm text-slate-500">Manage incoming and outgoing game invites</p>
                        </div>

                        <div>
                            <button onClick={() => setInviteModalOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md shadow-sm hover:bg-emerald-700">
                                Send Invite
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                        {invites.length === 0 ? (
                            <div className="text-sm text-slate-500">No invites at the moment.</div>
                        ) : (
                            <ul className="space-y-3">
                                {invites.map((invite, index) => (
                                    <li key={index} className="flex items-center justify-between p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                                        onClick={() => { AccecptInvitation(Socket, user.name, invite.FromUser, invite.DateSent); }}>
                                        <div>
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">From: {invite.FromUser}</div>
                                            <div className="text-xs text-slate-500">Date: {invite.DateSent}</div>
                                        </div>
                                        <div>
                                            <button className="px-3 py-1 text-sm rounded bg-emerald-100 text-emerald-700">Accept</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>

            <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} children={<InviteComponent />} />
        </div>
    );
}