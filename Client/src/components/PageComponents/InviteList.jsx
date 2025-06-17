import InviteComponent from "./InviteComponent";
import { inviteContext } from "../../App";
import { useContext, useEffect } from "react";

export default function InviteList({invites}){
    //let inviteList;

    const {InviteList} = useContext(inviteContext);
    //const [invites, setInvites] = InviteList;
    //const invite = invites.map((invite)=>(<InviteComponent invite={invite}/>))

    return(
    <div className="list">
        {invites.length === 0 ? <p>No Invites</p> : invites.map((invite, e)=>(<InviteComponent key={e} invite={invite} />))}
    </div>
    )
}