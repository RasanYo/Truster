import { AbstractUser } from "./AbstractUser";
import { User } from "./User";

export class Guest extends AbstractUser{
    constructor(db){
        super(db)
        this.isLoggedIn = false
    }

    login(uid) {
        return new User(uid, this.db)
    }
    
}