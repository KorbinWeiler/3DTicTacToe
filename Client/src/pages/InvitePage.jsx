import {useState, useContext} from 'react';
import '../Styles/InvitePage.css';
import Navbar from "../components/Navbar";
import InviteComponent from '../components/InviteComponent';
import Modal from '../Components/Modal';
import { UserContext } from "../Utils/UserContext";
import { useEffect } from 'react';
import { AccecptInvitation } from '../Utils/SocketMethods';

export default function InvitePage() {

    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const {User, Socket, Refresh} = useContext(UserContext);
    const [notifty, setNotify] = Refresh;
    const user = User;
    const [invites, setInvites] = useState([]);
    useEffect(() => {
        // Fetch invites from server
        if (!Socket){
            return;
        }
        Socket.emit("get invites", user.name, (response) => {
            if(response.error){
                console.log("Error fetching invites: ", response.error);
                return;
            }
            setInvites(response);
            //setNotify(prev => !prev);
        });
    }, [notifty, Socket]);

    return (
        <div className="invite-page">
            <Navbar />
            <h1>Invites</h1>
            <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} children={<InviteComponent />} />
        <button onClick={() => setInviteModalOpen(true)}>Send Invite</button>
        <div className="invites-list">
            {invites.length === 0 ? (
                <p>No invites at the moment.</p>
            ) : (
                <ul>
                    {invites.map((invite, index) => (
                        <li onClick={()=>{AccecptInvitation(Socket, user.name, invite.FromUser, invite.DateSent)}} key={index}>
                            <strong>From: {invite.FromUser}</strong> — Date: {invite.DateSent}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
}