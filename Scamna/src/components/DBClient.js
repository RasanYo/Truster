import { initializeApp } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, QuerySnapshot, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export class DBClient {
    constructor(config) {
        this.app = initializeApp(config)
        this.db = getFirestore()
        this.auth = getAuth()
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


}