import InviteComponent from "./InviteComponent";
import { inviteContext } from "../../App";
import { useContext, useEffect } from "react";

export default function InviteList({invites}){
    //let inviteList;

    const {InviteList} = useContext(inviteContext);
    //const [invites, setInvites] = InviteList;
    //const invite = invites.map((invite)=>(<InviteComponent invite={invite}/>))

    useEffect(()=>{

    }, [invites])

    return(
    <div>
        {invites != [] ? invites.map((invite, e)=>(<InviteComponent key={e} invite={invite} />)) : null}
    </div>
    )
}