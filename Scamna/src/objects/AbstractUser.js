import { query } from "firebase/firestore";

export class AbstractUser {
    #db
    constructor(db) {
        if (this.constructor == AbstractUser) {
            throw new Error('Cannot instantiate abstract user');
        }
        this.#db = db;
    }

    isLoggedIn() {
        throw new Error('method must be implemented')
    }

   getPublicPosts(country, city,  ...queryConstraints) {
        const q = query()
   } 

}