import { getAuth, signOut } from "firebase/auth"
import { AbstractUser } from "./AbstractUser"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { 
    setDoc, 
    doc, 
    arrayUnion,
    updateDoc,
    getDoc,
    getFirestore
} from "firebase/firestore"
import { COLLECTIONS } from "../Constants"
import { 
    geohashForLocation,
    geohashQueryBounds,
    distanceBetween
} from "geofire-common"






export class User extends AbstractUser{
    #uid
    user

    constructor(uid, user=null) {
        super()
        this.#uid = uid
        this.user = user
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
        return signOut(getAuth())
    }

    /**
     * creates a new post in the database
     * @param {Post} post 
     * @returns {Pomise<void>} empty promise
     */
     post(post) {
        let data = post.getData()
        const hash = this.#createIdForPost(data.lat,data.lng)
        data.geohash = hash
        setDoc(
            doc(
                this.db,
                post.getLocation(),
                post.getId()
            ),
            data
        )
        return updateDoc(
            doc(this.db, COLLECTIONS.REGULAR_USERS, this.#uid),
            {
                myPosts : arrayUnion(data)
            }
        )
    }

    #createIdForPost(lat,lng){
        return geohashForLocation([lat,lng])
    }

    getPersonalInformation(){
        return getDoc(doc(getFirestore(),COLLECTIONS.REGULAR_USERS,this.#uid))
    }

    /**
     * 
     * @param {*} pictureFile 
     * @returns {Promise<UploadResult>} promise containing an UploadResult
     */
    uploadProfilePicture(pictureFile) {
        let storageRef = ref(getStorage(), COLLECTIONS.profile_picture(this.#uid))
        return uploadBytes(storageRef, pictureFile)
    }


    /**
     * 
     * @returns {Promise<string>} promise containing download URL of profile picture
     * @throws an error if no profile picture has been uploaded previously
     */
    getProfilePictureURL() {
        let storageRef
        try {
            storageRef = ref(getStorage(), COLLECTIONS.profile_picture_URL(this.#uid)) 
        } catch (e) {
            throw e
        }
        return getDownloadURL(storageRef).then(url => {return url})
    }

}