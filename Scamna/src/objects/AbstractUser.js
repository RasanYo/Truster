export class AbstractUser {
    #db

    constructor(db){
        this.#db = db
    }

    getMyPosts(id) {
        throw new Error("Abstract Method ")
    }
}