import { AbstractUser } from "./AbstractUser";

export class Guest extends AbstractUser{
    constructor(db){
        super(db)
    }

    
}