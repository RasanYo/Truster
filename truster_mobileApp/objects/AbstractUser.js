import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, where } from 'firebase/firestore';
import {
  collection, 
  getDocs, 
  query, 
  orderBy, 
  startAt, 
  endAt 
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { 
  geohashQueryBounds, 
  distanceBetween 
} from 'geofire-common';
import { COLLECTIONS } from '../Constants';


export class AbstractUser {
  db;
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
    throw new Error('method must be implemented');
  }


  getPublicPosts(radiusInKm, center, sortByPrice, ...queryConstraints) {
    console.log('getting public posts');
    if(radiusInKm === 0 ) {
      const q = query(collection(this.db, COLLECTIONS.AVAILABLE_VISITS), ...queryConstraints);

      return getDocs(q).then(snapshot => {
        console.log(snapshot.docs);
        return snapshot.docs;
      });
    } else {
      const bounds = geohashQueryBounds(center, radiusInKm*1000);
      // console.log(bounds)
      const promises = [];
      for (const b of bounds) {
        const q = query(collection(this.db, COLLECTIONS.AVAILABLE_VISITS), orderBy('geohash'),...queryConstraints, startAt(b[0]), endAt(b[1]));
        promises.push(getDocs(q));
      }
      const matchingDocs = [];
      return Promise.all(promises).then((snapshots) => {
                
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
        return matchingDocs;

      }).then((docs) => {
        //que si le filtre sortByPrice est appliqué
        if(sortByPrice){
          docs.sort((x,y) => {
            if( x.data().price < y.data().price){
              return -1;
            } else if(x.data().price > y.data().rpice){
              return 1;
            } return 0;
          });

          console.log([1, 2, 'Test', 5]);
        }
                
        console.log('added ' + docs.length + ' docs to the list');
        return docs;
      });
    }
  }

  isPointInRegion(lat,lng, region) {

    const radiusInKmOfRegion = Math.max(region.latitudeDelta,region.longitudeDelta)*111.32;
    const distanceInKmFromCenter = 2*distanceBetween([lat, lng], [region.latitude,region.longitude]);
    return distanceInKmFromCenter < radiusInKmOfRegion;
  }

  getPostsFrom(country, city) {
    const col = collection(getFirestore(), COLLECTIONS.AVAILABLE_VISITS);
    return getDocs(col).then(snapshot => {
      const retArray = [];
      snapshot.docs.forEach(doc => retArray.push(doc.data()));
      return retArray;
    });
  }

  /**
     * 
     * @param {*} pictureFile 
     * @returns {Promise<UploadResult>} promise containing an UploadResult
     */
  uploadProfilePicture(pictureFile, uid) {
    console.log('PICTURE_FILE', pictureFile);
    let fileType = pictureFile.split('.')[0];
    let storageRef = ref(getStorage(), `${COLLECTIONS.profile_picture(uid)}`);
    return uploadBytes(storageRef, pictureFile);
  }


  /**
     * 
     * @returns {Promise<string>} promise containing download URL of profile picture
     * @throws an error if no profile picture has been uploaded previously
     */
  getProfilePictureURL(imgUrl) {
    let storageRef;
    try {
      storageRef = ref(getStorage(), `${COLLECTIONS.profile_picture(imgUrl)}`);
    } catch (e) {
      throw e;
    }
    return getDownloadURL(storageRef).then(url => {return url;});
  }

  userExists(uid) {
    const userCollectionRef = collection(this.db, COLLECTIONS.REGULAR_USERS);
    const userDocRef = doc(userCollectionRef, uid);
    return getDoc(userDocRef).then(doc => {return doc.data() ? uid : null;});
  }

  userExistsByEmail(email) {
    const q = query(collection(this.db,COLLECTIONS.REGULAR_USERS), where('email','==',email));
    return getDocs(q).then(snapshot => {
      return snapshot.docs.length != 0;} );
  }

  userComplete(uid) {
    const userCollectionRef = collection(this.db, COLLECTIONS.REGULAR_USERS);
    const userDocRef = doc(userCollectionRef, uid);
    return getDoc(userDocRef).then(doc => {return doc.data().dob ? true : false;}); 
  }

  getUser(uid) {
    const userCollectionRef = collection(this.db, COLLECTIONS.REGULAR_USERS);
    const userDocRef = doc(userCollectionRef, uid);
    return getDoc(userDocRef).then(doc => {
      return doc.data();
    });
  }
   
}