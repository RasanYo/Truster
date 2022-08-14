import { initializeApp } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, QuerySnapshot, setDoc, Timestamp } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

export class DBClient {
    constructor(config) {
        this.app = initializeApp(config)
        this.db = getFirestore()
        this.auth = getAuth()
    }

    printTest() {
        return "Client present"
    }


    /**
     * 
     * @param {string} collection_name name of the collection. To get subCollection of item write "Collection/item"
     * @returns {Promise<QuerySnapshot<DocumentData>>} promise containg array of document data
     */
    getCollection(collection_name) {
        const colRef = collection(this.db, collection_name)
        return getDocs(colRef)
            .then(snapshot => {
                return snapshot.docs
            })
    }

    /**
     * @param {string} collection_name name of the collection. To get subCollection of item write "Collection/item"
     * @returns {Promise<Array<DocumentData>>} promise containt array of json data
     */
    getCollectionData(collection_name) {
        return this.getCollection(collection_name).then(docs => {
            return docs.map(doc => doc.data())
        })
    }

    /**
     * 
     * @param {String} collection_name name of the collection containg document. To get subCollection of item write "Collection/item"
     * @param {String} doc_id id of the document
     * @returns {Promise<DocumentSnapshot<DocumentData>>} promise of document snapshot
     */
    getDocument(collection_name, doc_id) {
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
        const regularUserRef = collection(this.db, 'users/regular/users')
        userObject.createdAt = Timestamp.now()
        return createUserWithEmailAndPassword(this.auth, userObject.email, password)
            .then(userCred => {
                console.log(`Created user with uid ${userCred.user.uid}`)
                return setDoc(doc(this.db, 'users/regular/users', userCred.user.uid), userObject)
            })
        
    }


}