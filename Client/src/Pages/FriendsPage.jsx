import { useState, useEffect } from "react";
import Navbar from '../Components/Navbar';
import Modal from "../Components/Modal";

export default function FriendsPage() {

    const [addFriendsOpen, setAddFriendsOpen] = useState(false);
    const [friendInvitesOpen, setFriendInvitesOpen] = useState(false);

    useEffect(() => {
        // This would be replaced with an actual API call to fetch friends
        console.log("Fetching friends list...");
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Friends Page</h1>
            <button className="add-friend-button" onClick={() => setAddFriendsOpen(true)}>Add Friend</button>
            <Modal isOpen={addFriendsOpen} onClose={() => setAddFriendsOpen(false)} children={<div>Add Friend Form</div>} />
            <button className="view-friend-invites-button" onClick={() => setFriendInvitesOpen(true)}>View Friend Invites</button>
            <Modal isOpen={friendInvitesOpen} onClose={() => setFriendInvitesOpen(false)} children={<div>Friend Invites List</div>} />
            
            <p>Here you can manage your friends list and invites.</p>
        </div>
    );
}