import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { AbstractUser } from "./AbstractUser";

export class Guest extends AbstractUser{

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<UserCredential>} promise with user credentials
     */
    login(email, password) {
        return signInWithEmailAndPassword(getAuth(), email, password)
    }

    /**
     * 
     * @returns {boolean}
     */
    isLoggedIn() { return false }

    signUp(email, password) {
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(userCred => {
                setDoc(doc(this.db, ))
            })
    }


    
}