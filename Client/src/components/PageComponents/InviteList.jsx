import InviteComponent from "./InviteComponent";
export default function InviteList({invites}){
    let inviteList = [11,12,13,21];
    //const invite = invites.map((invite)=>(<InviteComponent invite={invite}/>))
    

    return(
    <div>
        {inviteList.map((invite, e)=>(<InviteComponent key={e} invite={invite}/>))}
    </div>
    )
}