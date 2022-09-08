import { AbstractUser } from "./AbstractUser";

export class Guest extends AbstractUser{
    auth
    constructor(db, auth){
        super(db)
    }

    logIn(){

    }

}