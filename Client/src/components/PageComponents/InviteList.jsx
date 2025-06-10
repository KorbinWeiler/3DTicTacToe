
export default function InviteList({invites}){
    let inviteList = [];
    if(invites){
        inviteList = invites.map((invite)=>{return <div>{invite}</div>})
    }

    return(
    <div>
        {inviteList}
    </div>
    )
}