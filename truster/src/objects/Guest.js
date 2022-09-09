import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
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

    /**
     * 
     * @returns {boolean}
     */
    isLoggedIn() { return false }

    signUp(email, password, data) {
        return createUserWithEmailAndPassword(getAuth(), email, password)
            .then(userCred => {
                return setDoc(
                    doc(
                        this.db, 
                        COLLECTIONS.users(data.country, data.city, userCred.user.uid)
                    ),
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
            })
    }


    
}