import {Children, useState} from 'react';
import '../Styles/InvitePage.css';
import Navbar from "../components/Navbar";
import InviteComponent from '../Components/InviteComponent';
import Modal from '../Components/Modal';

export default function InvitePage() {

    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const invites = [
        { from: 'Alice', date: '2025-08-10' },
        { from: 'Bob', date: '2025-08-09' }
    ];
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
                        <li key={index}>
                            <strong>From: {invite.from}</strong> — Date: {invite.date}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
}