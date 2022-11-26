import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, where } from "firebase/firestore";
import {
    collection, 
    getDocs, 
    query, 
    orderBy, 
    startAt, 
    endAt 
} from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { 
    geohashQueryBounds, 
    distanceBetween 
} from "geofire-common"
import { COLLECTIONS } from "../Constants"


export class AbstractUser {
    db
    constructor() {
        if (this.constructor === AbstractUser) {
            throw new Error('Cannot instantiate abstract user');
        }
        this.db = getFirestore();
    }

    /**
     * return true if user is of type User and false if of type Guest
     */
    isLoggedIn() {
        throw new Error('method must be implemented')
    }


    // CEST POUR DEMANDER LA LOCALISATION 
    // navigator.geolocation.getCurrentPosition(position =>{
    //     console.log("latitude : " ,position.coords.latitude)
    //     console.log("longitude : " , position.coords.longitude)
    // })


    //center c'est sensé être soit la position du mec qu'on lui aura demandé 
    //ou bien s'il veut pas la lat/lng de la ville
   getPublicPosts(country, city, radiusInKm, center, sortByPrice, setResult, ...queryConstraints) {
        console.log("getting public posts")
    if(radiusInKm === 0 ){
            const q = query(collection(this.db, COLLECTIONS.posts(country, city)), ...queryConstraints)
            return getDocs(q).then(snapshot => {
                console.log(snapshot.docs)
                return snapshot.docs
            })
        } else{
            const bounds = geohashQueryBounds(center, radiusInKm*1000);
            const promises = [];
            for (const b of bounds) {
                const q = query(collection(this.db,`${COLLECTIONS.AVAILABLE_VISITS}/${country}/cities/${city}/posts`), ...queryConstraints, orderBy("geohash"),startAt(b[0]),endAt(b[1]))
                promises.push(getDocs(q));
            }
        const matchingDocs = [];
            Promise.all(promises).then((snapshots) => {
                
                // console.log(snapshots)
            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const lat = doc.get('address').lat;
                    const lng = doc.get('address').lng;
  
                    const distanceInKm = distanceBetween([lat, lng], center);
                    if (distanceInKm <= radiusInKm) {
                    matchingDocs.push(doc);
                    }
                }
              }
            
            // console.log(matchingDocs)
            return matchingDocs;
        }).then((matchingDocs) => {
            //que si le filtre sortByPrice est appliqué
            if(sortByPrice){
                matchingDocs.sort((x,y) => {
                    if( x.data().value < y.data().value){
                        return -1
                    } else if(x.data().value > y.data().value){
                        return 1
                    } return 0
                })
            }
            
            // matchingDocs.forEach(x => {
            //     console.log(x.data())
            // })
            // console.log(matchingDocs)
            setResult(matchingDocs)
            return matchingDocs
          });
    }
}

    getPostsFrom(country, city) {
        const col = collection(getFirestore(), COLLECTIONS.posts(country, city))
        return getDocs(col).then(snapshot => {
            // snapshot.docs.forEach(doc => console.log(doc.data()))
            const retArray = []
            snapshot.docs.forEach(doc => retArray.push(doc.data()))
            return retArray
        })
    }

    /**
     * 
     * @param {*} pictureFile 
     * @returns {Promise<UploadResult>} promise containing an UploadResult
     */
    uploadProfilePicture(pictureFile, uid) {
        let storageRef = ref(getStorage(), COLLECTIONS.profile_picture(uid))
        return uploadBytes(storageRef, pictureFile)
    }


    /**
     * 
     * @returns {Promise<string>} promise containing download URL of profile picture
     * @throws an error if no profile picture has been uploaded previously
     */
    getProfilePictureURL(imgUrl) {
        let storageRef
        try {
            storageRef = ref(getStorage(), COLLECTIONS.profile_picture(imgUrl))
        } catch (e) {
            throw e
        }
        return getDownloadURL(storageRef).then(url => {return url})
    }

    userExists(uid) {
        const userCollectionRef = collection(this.db, COLLECTIONS.REGULAR_USERS)
        const userDocRef = doc(userCollectionRef, uid)
        return getDoc(userDocRef).then(doc => {return doc.data() ? uid : null})
    }

    userExistsByEmail(email) {
        const q = query(collection(this.db,COLLECTIONS.REGULAR_USERS), where("email","==",email))
        return getDocs(q).then(snapshot => {
            return snapshot.docs.length != 0} )
    }

    userComplete(uid) {
        const userCollectionRef = collection(this.db, COLLECTIONS.REGULAR_USERS)
        const userDocRef = doc(userCollectionRef, uid)
        return getDoc(userDocRef).then(doc => {return doc.data().dob ? true : false}) 
    }
   
}