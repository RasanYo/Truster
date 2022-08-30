import { addDoc, collection, setDoc, Timestamp, updateDoc, doc, arrayUnion, collectionGroup, getDocs, query, where, orderBy, limit } from "firebase/firestore"
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
                this.#uid
            ),
            {
                myVisitRequests : arrayUnion(post.getId())
            }
        )
    }

    



    test() {
        const ref = collection(this.#db, COLLECTIONS.AVAILABLE_VISITS)
        const cities = query(collectionGroup(this.#db, 'neighborhoods'), orderBy('value'), limit(10))
        getDocs(cities).then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
            })
        })
    }
}