class Invite{
    constructor(obj){
        this.inviteType = obj.inviteType;
        this.sender = obj.sender;
        this.recipient = obj.recipient;
    }

    constructor(inviteType, sender, recipient){
        this.inviteType = inviteType;
        this.sender = sender;
        this.recipient = recipient;
    }
}

export {Invite}