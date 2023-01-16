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
    Timestamp,
    getDocs,
    where
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
import { query } from "firebase/database"



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
        const id = this.getUID() < receiverID ? `${this.getUID()}_${receiverID}` : `${receiverID}_${this.getUID()}`
        this.updatePersonalInformation({
            chats: arrayUnion({
                id: id,
                receiverID: receiverID
            })
        })
        updateDoc(doc(getFirestore(), `users/regular/users/${receiverID}`), {
            chats: arrayUnion({
                id: id,
                receiverID: this.getUID()
            })
        })
        return setDoc(docRef, {
            users: users,
            openedAt: Timestamp.now(),
            messages: [],
            id: id
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

    getAllChats() {
        return this.getPersonalInformation().then(snapshot => {
            return snapshot
        })
    }

    getPosts() {
        return this.getPersonalInformation().then(snapshot => {
            return snapshot.data().myPosts
        })
    }

    getRequests() {
        return this.getPersonalInformation().then(snapshot => {
            return snapshot.data().myVisitRequests
        })
    }

    getPost(postID) {
        const postRef = doc(getFirestore(), `COLLECTIONS.AVAILABLE_VISITS/${postID}`)
        return getDoc(postRef).then(snapshot => {return snapshot.data()})
    }
    
    acceptRequest(postID, requesterID) {
        const postRef = doc(getFirestore(), `${COLLECTIONS.AVAILABLE_VISITS}/${postID}`)
        const newPostRef = doc(getFirestore(), `${COLLECTIONS.FINISHED_VISITS}/${postID}`)
        this.getPost(postID).then(postData => {
            setDoc(newPostRef, {
                ...postData,
                visitorID: requesterID
            })
        })
        
    }

}