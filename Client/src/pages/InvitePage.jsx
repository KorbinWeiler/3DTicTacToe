import Navbar from "../components/PageComponents/NavBar"
import InviteList from "../components/PageComponents/InviteList"

export default function InvitePage(){
    return(
        <div className="uiBox">
            <Navbar></Navbar>
            <div className="invite-list space-invite border background-dark2">
                <InviteList></InviteList>
            </div>
        </div>
    )
}