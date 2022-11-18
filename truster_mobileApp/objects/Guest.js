import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc, Timestamp, collection, getFirestore } from "firebase/firestore";
import { COLLECTIONS } from "../Constants";
import { AbstractUser } from "./AbstractUser";
import {auth} from "../firebase"

export class Guest extends AbstractUser{


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<UserCredential>} promise with user credentials
     */
    login(email, password) {
        console.log(email)
        return signInWithEmailAndPassword(getAuth(), email, password).catch(err => console.log(err))
    }

    loginWithGoogle() {
        let provider = new GoogleAuthProvider()
        return signInWithPopup(getAuth(), provider)
    }

    // login() {
    //     console.log("using the second login")
    //     return this.login(email, password)
    //         .then(() => navigation.pop())
    //         .catch(error => {
    //             console.log(error.message)
    //             // setIsGoodPassword(false) 
    //         })
    // }

    /**
     * 
     * @returns {boolean}
     */
    isLoggedIn() { return false }

    /**
     * Creates a new user and logs user in after creation.
     * Creation of user in auth service and in database 
     * @param {Object} userObject 
     * @param {Object} adressObject 
     * @returns {Promise<>} promise
     */
    signUp(userObject, adressObject) {

        if (!userObject || !adressObject) {
            throw new Error("Null objects passed as arguments")
        }
        Object.keys(userObject).forEach(key => {
            if (key !== "picture" && (userObject[key] === null || userObject[key] === ""))
                throw new Error(`Detected missing value for ${key}`)
        })

        if (adressObject.country === null || adressObject.country === "") {
            throw new Error(`Detected missing value for country`)
        } else if (adressObject.city === null || adressObject.city === "") {
            throw new Error(`Detected missing value for city`)
        }

        return createUserWithEmailAndPassword(getAuth(), userObject.email, userObject.password)
            .then(userCred => {
                let collectionRef = collection(getFirestore(), COLLECTIONS.REGULAR_USERS)
                let userRef = doc(collectionRef, userCred.user.uid)
                return this.uploadProfilePicture(userObject.picture, userCred.user.uid)
                .then(() => {
                    console.log("Picture uploaded")
                    console.log(userObject.picture)
                    return this.getProfilePictureURL(userCred.user.uid)
                    .then((result) => {
                        console.log("We got the URL and it is : ")
                        if(userObject.picture == null) {result="https://firebasestorage.googleapis.com/v0/b/scamna-b0b94.appspot.com/o/images%2Fprofile_pictures%2Fdummy_profile_pic.png?alt=media&token=573848b9-10ca-447a-a2c8-9062a2b5bd7a"}
                        console.log(result)
                        return setDoc(
                            userRef,
                            {
                                uid: userCred.user.uid,
                                createdAt: Timestamp.now(),
                                dob: userObject.birthdate,
                                email: userObject.email,
                                adress: adressObject,
                                firstName: userObject.firstName,
                                lastName: userObject.lastName,
                                gender: userObject.gender,
                                myPosts: [],
                                myVisitRequests: [],
                                myVisits: [],
                                aboutMe: userObject.aboutMe,
                                imgUrl : result
                            })
                    })
                    .then(() => {
                        return sendEmailVerification(userCred.user).then(() => console.log("Sent verification mail"))
                    })
                })
            })
    }

    //a mettre en private
    #createUser(userObject) {
        let collectionRef = collection(getFirestore(), COLLECTIONS.REGULAR_USERS)
        const userRef = doc(collectionRef, userObject.uid)
        return this.uploadProfilePicture(userObject.picture, userObject.uid)
            .then(() => {
                console.log("Picture uploaded")
                console.log(userObject.picture)
                return this.getProfilePictureURL(userObject.uid)
            })
            .then(result => {
                console.log("We got the URL and it is : ")
                if(userObject.picture == null) {result="https://firebasestorage.googleapis.com/v0/b/scamna-b0b94.appspot.com/o/images%2Fprofile_pictures%2Fdummy_profile_pic.png?alt=media&token=573848b9-10ca-447a-a2c8-9062a2b5bd7a"}
                console.log(result)

                return setDoc(
                    userRef,
                    {
                        uid: userObject.uid,
                        createdAt: Timestamp.now(),
                        dob: userObject.birthdate,
                        email: userObject.email,
                        adress: null,
                        firstName: userObject.firstName,
                        lastName: userObject.lastName,
                        gender: userObject.gender,
                        myPosts: [],
                        myVisitRequests: [],
                        myVisits: [],
                        aboutMe: userObject.aboutMe,
                        imgUrl : result
                    }
                )
            })
    }


    signup(userObject) {
        // ####### error handling #######
        if (!userObject) throw new Error("Null objects passed as arguments")
        Object.keys(userObject).forEach(key => {
            if (key !== "picture" && (userObject[key] === null || userObject[key] === ""))
                throw new Error(`Detected missing value for ${key}`)
        })
        // ####### error handling #######
        return createUserWithEmailAndPassword(getAuth(), userObject.email, userObject.password)
            .then(userCred => {
                userObject.uid = userCred.user.uid
                return this.#createUser(userObject)
            })

    }

    signupWithGoogle() {
        let provider = new GoogleAuthProvider()
        return signInWithPopup(getAuth(), provider)
            .then(userCred => {
                console.log(userCred)
                return this.userExists(userCred.user.uid).then(uid => {
                    if (!uid) {
                        console.log(userCred)
                        const userData = userCred._tokenResponse
                        const userObject = {
                            uid: userData.localId,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email,
                            birthdate: null,
                            aboutMe: null,
                            gender: null
                        }
                        this.#createUser(userObject)
                    }
                    return uid
                })

            })
    }

    isEmailRegistered(email) {
        
    }

    
}