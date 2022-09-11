import { getAuth, signOut } from "firebase/auth"
import { AbstractUser } from "./AbstractUser"
import { 
    setDoc, 
    doc, 
    arrayUnion,
    updateDoc,
    getDoc,
    getFirestore
} from "firebase/firestore"
import { COLLECTIONS } from "../Constants"
import { 
    geohashForLocation,
    geohashQueryBounds,
    distanceBetween
} from "geofire-common"






export class User extends AbstractUser{
    #uid

    constructor(uid) {
        super()
        this.#uid = uid
    }

    /**
     * 
     * @returns users uid
     */
    getUID() { return this.#uid}

    /**
     * 
     * @returns {boolean} true
     */
    isLoggedIn() { return true }

    /**
     * signs user out
     * @returns {Promise<void>} empty promise
     */
    logout() { 
        return signOut(getAuth())
    }

    /**
     * creates a new post in the database
     * @param {Post} post 
     * @returns {Pomise<void>} empty promise
     */
     post(post) {
        let data = post.getData()
        const hash = this.#createIdForPost(data.lat,data.lng)
        data.geohash = hash
        setDoc(
            doc(
                this.db,
                post.getLocation(),
                post.getId()
            ),
            data
        )
        return updateDoc(
            doc(this.db, COLLECTIONS.REGULAR_USERS, this.#uid),
            {
                myPosts : arrayUnion(data)
            }
        )
    }

    #createIdForPost(lat,lng){
        return geohashForLocation([lat,lng])
    }

    getPersonalInformation(){
        return getDoc(doc(this.db,COLLECTIONS.REGULAR_USERS,this.#uid))
    }

    
}