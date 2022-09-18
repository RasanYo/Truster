import { getAuth, signOut,updateEmail,updatePassword } from "firebase/auth"
import { AbstractUser } from "./AbstractUser"
import { 
    setDoc, 
    doc, 
    arrayUnion,
    updateDoc,
    getDoc,
    getFirestore,
    collection
} from "firebase/firestore"
import { COLLECTIONS } from "../Constants"
import { 
    geohashForLocation,
    geohashQueryBounds,
    distanceBetween
} from "geofire-common"
import { postConverter } from "./Post"



export class User extends AbstractUser{
    #uid
    user

    constructor(uid, user=null) {
        super()
        this.#uid = uid
        this.user = user
        // console.log(user)
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

    getImgUrl() {return this.user.imgUrl}

    /**
     * creates a new post in the database
     * @param {Post} post 
     * @returns {Pomise<void>} empty promise
     */
     post(post) {
        const col = collection(getFirestore(), post.getLocation())
        const postRef = doc(col, post.getId()).withConverter(postConverter)
        console.log("CHECK")
        setDoc(postRef, post)
        const userRef = doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)
        
        return updateDoc(userRef, {myPosts : arrayUnion(post.asDataObject())})
    }


    getPersonalInformation(){
        return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS,this.#uid))
    }

    updatePersonalInformation(newUserInformation){
        return updateDoc(doc(getFirestore(),COLLECTIONS.REGULAR_USERS,this.#uid),newUserInformation)
    }

    updateCurrentPassword(password){
        return updatePassword(getAuth().currentUser,password)
    }

}