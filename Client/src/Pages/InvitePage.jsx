import {Children, useState} from 'react';
import '../Styles/InvitePage.css';
import Navbar from "../Components/Navbar";
import InviteComponent from '../Components/InviteComponent';
import Modal from '../Components/Modal';

export default function InvitePage() {

    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    return (
        <div className="invite-page">
            <Navbar />
            <h1>Invites</h1>
            <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} children={<InviteComponent />} />
        <button onClick={() => setInviteModalOpen(true)}>Send Invite</button>
        </div>
    );
}