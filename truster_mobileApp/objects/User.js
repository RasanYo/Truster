import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, reauthenticateWithPopup, sendEmailVerification, signOut,updateEmail,updatePassword, updateProfile } from "firebase/auth"
import { AbstractUser } from "./AbstractUser"
import { 
    setDoc, 
    doc, 
    arrayUnion,
    updateDoc,
    getDoc,
    getDocs,
    getFirestore,
    collection,
    deleteDoc,
    Timestamp,
    query,
    where,
    Firestore,
    arrayRemove
} from "firebase/firestore"
import { COLLECTIONS } from "../Constants"
// import { 
//     geohashForLocation,
//     geohashQueryBounds,
//     distanceBetween
// } from "geofire-common"
import { postConverter } from "./Post"
// import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"



export class User extends AbstractUser{
    #uid
    user

    constructor(uid, user=null) {
        super()
        this.#uid = uid
        this.user = user
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
        return signOut(auth)
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
        setDoc(postRef, post)
        const userRef = doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)
        
        return updateDoc(userRef, {myPosts : arrayUnion(post.asDataObject())}).catch(err => {
            console.log("[POST_ERROR]", err.message)
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

    addToFavorites(postID) {
        const userCol = collection(getFirestore(), COLLECTIONS.REGULAR_USERS)
        const userRef = doc(userCol, this.getUID())

        return updateDoc(userRef, {
            myFavorites: arrayUnion(postID)
        }).then(y => {
            this.favoritesIDs.push(postID)
            console.log("added post to fav : " + this.favoritesIDs)
        })
    }

    removeFromFavorites(postID) {
        const userCol = collection(getFirestore(), COLLECTIONS.REGULAR_USERS)
        const userRef = doc(userCol, this.getUID())

        return updateDoc(userRef, {
            myFavorites: arrayRemove(postID)
        }).then(y => {
            this.favoritesIDs = this.favoritesIDs.filter(x => x !== postID)
            console.log("removed post from fav : " + this.favoritesIDs)
        })
    }

    getFavoritesPosts(favoritesIDs){
            const postCol = collection(getFirestore(), COLLECTIONS.AVAILABLE_VISITS)
            if(favoritesIDs.length == 0){
                console.log("no favorites")
                return []
            }
            const q = query(postCol, where("id", "in", favoritesIDs))

            //return a map of the posts getted from the database from getDocs
            return getDocs(q).then(snapshot => {
                return snapshot.docs.map(doc => {
                    return doc.data()
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


    openChat(receiverID) {
        console.log("openChat")
        const docRef = doc(getFirestore(), COLLECTIONS.chat(this.#uid, receiverID))
        const users = []

        this.getUser(receiverID).then(data => {
            users.push({
                uid: receiverID,
                name: data.firstName
            })
        })

        this.getUser(this.#uid).then(data => {
            users.push({
                uid: this.#uid,
                name: data.firstName
            })
        })
        
        return setDoc(docRef, {
            users: users,
            openedAt: Timestamp.now(),
            messages: []
        })
    }

    sendMessage(receiverID, message) {
        console.log("sendMessage")
        const docRef = doc(getFirestore(), COLLECTIONS.chat(this.#uid, receiverID))
        const msg = {
            from: this.#uid,
            sentAt: Timestamp.now(),
            message: message
        }
        return updateDoc(docRef, {
            messages: arrayUnion(msg)
        })
    }

    getChatWith(receiverID) {
        console.log("getChatWith")
        const docRef = doc(getFirestore(), COLLECTIONS.chat(this.#uid, receiverID))
        return getDoc(docRef).then(doc => {return doc.data()})
    }

}