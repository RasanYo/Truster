import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, reauthenticateWithPopup, sendEmailVerification, signOut,updateEmail,updatePassword, updateProfile } from "firebase/auth"
import { AbstractUser } from "./AbstractUser"
import { 
    setDoc, 
    doc, 
    arrayUnion,
    updateDoc,
    getDoc,
    getFirestore,
    collection,
    deleteDoc,
    Timestamp
} from "firebase/firestore"
import { COLLECTIONS } from "../Constants"
// import { 
//     geohashForLocation,
//     geohashQueryBounds,
//     distanceBetween
// } from "geofire-common"
import { postConverter } from "./Post"
// import { useNavigate } from "react-router-dom"



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
        
        return updateDoc(userRef, {myPosts : arrayUnion(post.asDataObject())}).catch(err => {
            return setDoc(userRef, {myPosts : arrayUnion(post.asDataObject())})
        })
    }

    requestVisit(postID) {
        const postCol = collection(getFirestore(), COLLECTIONS.AVAILABLE_VISITS)
        const userCol = collection(getFirestore(), COLLECTIONS.REGULAR_USERS)

        const postRef = doc(postCol, postID)
        const userRef = doc(userCol, this.getUID())

        const requestedAt = Timestamp.now() 

        return updateDoc(postRef, {
            requesters: arrayUnion({
                uid: this.getUID(),
                requestedAt: requestedAt 
            })
        })
        .then(() => {
            return updateDoc(userRef, {
                myVisitRequests: arrayUnion({
                    postID: postID,
                    requestedAt: requestedAt
                })
            })
        })
    }


    getPersonalInformation(){
        return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS,this.#uid))
    }

    updatePersonalInformation(newUserInformation){
        return updateDoc(doc(getFirestore(),COLLECTIONS.REGULAR_USERS,this.#uid), newUserInformation)
    }

    updateCurrentPasswordWithCredentials(currEmail, oldPassword, newPassword){
        const credentials = EmailAuthProvider.credential(currEmail,oldPassword)
        let curr = getAuth().currentUser
        return reauthenticateWithCredential(curr, credentials).then(() => {
            console.log("Re authenticate is good")
            updatePassword(curr, newPassword)
          })
    }



    deleteAccount(){
        return deleteDoc(doc(getFirestore(),COLLECTIONS.REGULAR_USERS,this.#uid)).then(() => {
            console.log("Account deleted from database")
            const auth = getAuth();
            const user = auth.currentUser;
            return deleteUser(user)
        })
        
    }

    changeEmail(newEmail) {
        const auth = getAuth()
        return updateEmail(auth.currentUser, newEmail)
            .then(() => {
                console.log("CHECK 1")
                return updateProfile(auth.currentUser, {
                    emailVerified: false
            })})
            .then(() => {
                console.log("CHECK 2")
                return sendEmailVerification(auth.currentUser)
            })
            .then(() => "Sent verification email")
            .catch((err) => console.log(err.message))

    }

}