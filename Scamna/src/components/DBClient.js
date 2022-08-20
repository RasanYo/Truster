import { initializeApp } from 'firebase/app'
import { arrayRemove, arrayUnion, collection, deleteDoc, deleteField, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { COLLECTIONS } from '../Constants'

export class DBClient {
    constructor(config) {
        this.app = initializeApp(config)
        this.db = getFirestore()
        this.auth = getAuth()
        this.currentUser = null
        this.readCounter = 0
    }


    printTest() {
        return "Client present"
    }

    /**
     * 
     * @param {string} collection_name name of the collection. To get subCollection of item write "Collection/item"
     * @param {QueryConstraint[]} queryConstraints query constraints for the read request
     * @returns {Promise<QuerySnapshot<DocumentData>>} promise containg array of document data
     */
    getCollection(collection_name) {
        this.readCounter = this.readCounter + 1
        const q = collection(this.db, collection_name)
        return getDocs(q)
            .then(snapshot => {
                return snapshot.docs
            })
    }

    /**
     * @param {string} collection_name name of the collection. To get subCollection of item write "Collection/item"
     * @param {QueryConstraint[]} queryConstraints query constraints for the read request
     * @returns {Promise<Array<DocumentData>>} promise containt array of json data
     */
    getCollectionData(collection_name) {
        return this.getCollection(collection_name).then(docs => {
            return docs.map(doc => doc.data())
        })
    }

    getCollectionWithQuery(collectionName, ...queryConstraints) {
        this.readCounter = this.readCounter + 1
        const q = query(collection(this.db, collectionName), ...queryConstraints)
        return getDocs(q).then(snapshot => {
            return snapshot.docs
        })
    }

    getCollectionDataWithQuery(collectionName, ...queryConstraints) {
        return this.getCollectionWithQuery(collectionName, ...queryConstraints)
            .then(docs =>{ 
                return docs.map(doc.data())
            })   
    }

    



    /**
     * 
     * @param {String} collection_name name of the collection containg document. To get subCollection of item write "Collection/item"
     * @param {String} doc_id id of the document
     * @returns {Promise<DocumentSnapshot<DocumentData>>} promise of document snapshot
     */
    getDocument(collection_name, doc_id) {
        this.readCounter = this.readCounter + 1
        console.log(`Read count is ${this.readCounter}`)
        return getDoc(doc(this.db, collection_name, doc_id))
    }

    /**
     * 
     * @param {string} collection_name name of the collection containing the document we want to delete. To get subCollection of item write "Collection/item"
     * @param {*} document_id id of the document we want to delete
     * @returns {Promise<void} empty promise
     */
    deleteDocumentFrom(collection_name, document_id) {
        const docRef = doc(this.db, collection_name, document_id)
        return deleteDoc(docRef)
    }

    /**
     * 
     * @param {dictionary} userObject object containing user information
     * @returns {Promise<DocumentReference<dictionary>>} promise resolved 
     * with a DocumentReference pointing to the newly created document after 
     * it has been written to the backend
     */
    createUser(userObject, password) {
        userObject.createdAt = Timestamp.now()
        return createUserWithEmailAndPassword(this.auth, userObject.email, password)
            .then(userCred => {
                console.log(`Created user with uid ${userCred.user.uid}`)
                this.currentUser = {
                    uid: userCred.user.uid,
                    data: userObject
                }
                return setDoc(doc(this.db, 'users/regular/users', userCred.user.uid), userObject)
            })
        
    }

    /**
     * 
     * @param {*} postObject 
     * @param {*} userId 
     */
    createPost(postObject,userId){
        postObject.createdAt = Timestamp.now()
        postObject.createdBy = userId

        let postId = this.hashId(postObject,userId)
        setDoc(doc(this.db, "posts/notVisited/posts", postId), postObject)
        postObject.id = postId
        updateDoc(doc(this.db, "users/regular/users", userId),{
            myPosts : arrayUnion(postObject)
        }).catch(e => {
            console.log(e)
        })
    }

    hashId(postObject,userId){
        const newString = (postObject.lat + postObject.lng   + userId).toString();
        return newString
    }

    /**
     * 
     * @param {string} email account email
     * @param {string} password account password 
     * @returns {Promise<UserCredential>} promise containing user credentials of logged in user
     */
    logInUser(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password)
            .then(userCred => {
                console.log("USERCRED" + userCred.user.uid)
                return this.getDocument(COLLECTIONS.REGULAR_USERS, userCred.user.uid).then(snapshot => {
                    console.log("CHECK")
                    this.currentUser = {
                        uid: userCred.user.uid,
                        data: snapshot.data()
                    }
                })
            })
    }

    /**
     * 
     * @returns {Promise<void} empty promise
     */
    logOutCurrentUser() {
        return signOut(this.auth).then(() => this.currentUser = null)
    }

    /**
     * 
     * @param {*} postID 
     * @param {*} userID 
     * @param {*} message 
     * @returns 
     */
    sendRequestTo(postID, userID, message) {
        setDoc(doc(this.db, `${COLLECTIONS.AVAILABLE_VISITS}/${postID}/requests`, userID), {
            message: message,
            createdAt: Timestamp.now(),
            createdBy: userID
        })
        return updateDoc(doc(this.db, `${COLLECTIONS.REGULAR_USERS}`, userID),{
            myVisitRequests : arrayUnion(postID)
        }).catch(e => {
            console.log(e)
        })
    }

    /**
     * 
     */
    acceptVisitRequest(postID, requesterID) {
        return updateDoc(doc(this.db, COLLECTIONS.AVAILABLE_VISITS, postID), {
            visitor: requesterID
        }).then(() => {
            updateDoc(doc(this.db, COLLECTIONS.REGULAR_USERS, requesterID), {
                myVisits : arrayUnion(postID)
            })
        })
    }

    /**
     * 
     * @param {*} postID 
     * @param {*} requesterID 
     * @returns 
     */
    declineVisitRequest(postID, requesterID) {
        return deleteDoc(doc(this.db, `${COLLECTIONS.AVAILABLE_VISITS}/${postID}/requests`, requesterID))
            .then(() => {
                updateDoc(doc(this.db, COLLECTIONS.REGULAR_USERS, requesterID), {
                    myVisitRequests : arrayRemove(postID)
                })
            })
    }

    /**
     * 
     * @param {*} postID 
     * @param {*} requesterID 
     */
    cancelVisit(postID, requesterID) {
        return updateDoc(doc(this.db, COLLECTIONS.AVAILABLE_VISITS, postID), {
            visitor: deleteField()
        }).then(() => {
            updateDoc(doc(this.db, COLLECTIONS.REGULAR_USERS, requesterID), {
                myVisits : arrayRemove(postID)
            })
        })
    }
    
    /**
     * 
     * @param {*} collectionName 
     * @param {*} docID 
     * @param {*} callBack 
     * @returns 
     */
    createRealTimeDocListener(collectionName, docID, callBack) {
        return onSnapshot(doc(this.db, collectionName, docID), callBack)
    }

    /**
     * 
     * @param {*} collectionName 
     * @param {*} callBack 
     * @returns 
     */
    createRealTimeCollectionListener(collectionName, callBack) { 
        return onSnapshot(collection(this.db, collectionName), callBack)
    }



}