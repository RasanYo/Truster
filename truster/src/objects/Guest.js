import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { setDoc, doc, Timestamp, collection, getFirestore } from "firebase/firestore";
import { COLLECTIONS } from "../Constants";
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

    loginWithGoogle(callback=(userCred => {return})) {
        let provider = new GoogleAuthProvider()
        return signInWithPopup(getAuth(), provider).then(callback)
    }


    /**
     * 
     * @returns {boolean}
     */
    isLoggedIn() { return false }

    /**
     * Creates a new user and logs user in after creation.
     * Creation of user in auth service and in database
     * @param {string} email 
     * @param {string} password 
     * @param {string} country 
     * @param {string} city 
     * @param {object} data user data
     * @returns {Promise<>} promise
     */
    signUp(email, password, country, city, data) {
        return createUserWithEmailAndPassword(getAuth(), email, password)
            .then(userCred => {
                let collectionRef = collection(getFirestore(), COLLECTIONS.users(country, city))
                let userRef = doc(collectionRef, userCred.user.uid)
                return setDoc(
                    userRef,
                    {
                        uid: userCred.user.uid,
                        createdAt: Timestamp.now(),
                        dob: data.dob,
                        email: data.email,
                        adress: data.adress,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        gender: data.gender,
                        myPosts: [],
                        myVisitRequests: [],
                        myVisits: []
                    }
                )
                .then(() => {
                    return sendEmailVerification(userCred.user).then(() => console.log("Sent verification mail"))
                })
            })
    }


    
}