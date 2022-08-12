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
     * @param {String} collection_name name of the collection containg document. To get subCollection of item write "Collection/item"
     * @param {String} doc_id id of the document
     * @returns {Boolean} true if the document exists, false otherwise
     */


    /**
     * 
     * @param {string} collection_name name of the collection we want to add the object to. To get subCollection of item write "Collection/item"
     * @param {dictionary} document object we want to add to the collection
     * @param {string} id id of the new document. If left null, a random id will be generated
     * @param {Boolean} enable_overwrite if true, the document will be overwritten if it already exists, else it will throw an error
     * @returns {Promise<DocumentReference<dictionary>>} promise containing the added document reference
     * @throw {Error} if the document id already exists in the collection and overwrites are disabled
     */
    addDocumentTo(collection_name, document, id=null, enable_overwrite=true) {
        if (id){ 

            if (!enable_overwrite && this.documentExists(collection_name, id)) {
                throw new Error(`Document with id ${id} already exists in collection ${collection_name}`);
            }

            setDoc(doc(this.db, collection_name, id), document);
        } else {
            const colRef = collection(this.db, collection_name)
            return addDoc(colRef, document)
        } 
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




