import { TwitterAuthProvider } from "firebase/auth"
import { setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { COLLECTIONS } from "../Constants"

export class User{
    #uid
    #db
    
    constructor(uid, db) {
        this.#uid = uid
        this.#db = db
    }

    /**
     * 
     * @returns users uid
     */
    getUID() { return this.#uid}

    /**
     * 
     * @param {Post} post 
     * @returns {Pomise<void>}
     */
    post(post) {
        let data = post.getData()
        setDoc(
            doc(
                this.#db,
                post.getLocation(),
                post.getId() 
            ),
            data
        )
        return updateDoc(
            doc(this.#db, COLLECTIONS.REGULAR_USERS, this.#uid),
            {
                myPosts : arrayUnion(data)
            }
        )
    }

    requestPost(post, message) {
        setDoc(
            doc(
                this.#db, 
                `${post.getLocation()}/${post.getId()}/requests`,
                this.#uid
            ),
            {
                message: message,
                createdAt: Timestamp.now(),
                createdBy: this.#uid
            }
        )
        return updateDoc(
            doc(
                this.#db, 
                `${COLLECTIONS.REGULAR_USERS}`, 
                userID
            ),
            {
                myVisitRequests : arrayUnion(post.getId())
            }
        )
    }
}