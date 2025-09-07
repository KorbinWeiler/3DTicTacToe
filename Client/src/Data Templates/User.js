class User{
    constructor(obj){
        this.username = obj.username;
        this.email = obj.email;
        this.points = obj.points;
    }

    constructor(username, email, points){
        this.username = username;
        this.email = email;
        this.points = points;
    }
}

export {User};