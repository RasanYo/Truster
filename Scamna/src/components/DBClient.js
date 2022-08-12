import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

class DBClient {
    constructor(config) {
        this.app = initializeApp(config)
        this.db = getFirestore()
        this.auth = getAuth()
    }
}




