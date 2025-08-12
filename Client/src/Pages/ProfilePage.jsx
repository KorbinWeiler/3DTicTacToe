import Navbar from "../Components/Navbar"
export default function ProfilePage() {
    return (
        <>
            <div className="profile-page">
                <Navbar /> 
                <h1>Profile</h1>
                <div className="profile-info">
                    <p>Username: User123</p>
                    <p>Email:</p>
                </div>
            </div>
        </>
    )
}