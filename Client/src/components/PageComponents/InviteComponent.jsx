
function acceptInvitation(){

}

function declineInvitation(){

}

export default function InviteComponent({invite}){
    return(
        <div className="space-invite">
            {invite}
            <button type="button" onClick={acceptInvitation}>Accept</button>
            <button type="button" onClick={declineInvitation}>Decline</button>
        </div>
    )
}