import Navbar from "../Components/Navbar"
import "../Styles/ProfilePage.css";
import { useContext } from "react";
import { UserContext } from "../App";
export default function ProfilePage() {

    const {User} = useContext(UserContext); 
    const user = User;
    return (
        <>
            <div className="profile-page">
                <Navbar /> 
                <h1>Profile</h1>
                <div className="profile-info">
                    <p>Username: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </>
    )
}