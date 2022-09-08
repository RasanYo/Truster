import { addDoc, collection, setDoc, Timestamp, doc, arrayUnion, collectionGroup, getDocs, query, where, orderBy, limit, startAt, endAt } from "firebase/firestore"
import { COLLECTIONS } from "../Constants"
import { Geohash } from "geofire-common"
import { Geopoint } from "geofire-common"
import { geohashForLocation } from "geofire-common"
import { geohashQueryBounds } from "geofire-common"
import { distanceBetween } from "geofire-common"
// import * as geofirestore from "geofirestore"
import { arrayRemove, deleteDoc, deleteField, getDoc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'
import { AbstractUser } from "./AbstractUser"



export class User extends AbstractUser{
    #uid

    constructor(uid, db) {
        super(db)
        this.#uid = uid
        
    }

    /**
     * 
     * @returns users uid
     */
    getUID() { return this.#uid}

    /**
     * 
     * @param {Post} post 
     * @returns {Pomise<void>}
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

    requestPost(post, message) {
        setDoc(
            doc(
                this.db, 
                `${post.getLocation()}/${post.getId()}/requests`,
                this.#uid
            ),
            {
                message: message,
                createdAt: Timestamp.now(),
                createdBy: this.#uid
            }
        )
        return updateDoc(
            doc(
                this.db, 
                `${COLLECTIONS.REGULAR_USERS}`, 
                this.#uid
            ),
            {
                myVisitRequests : arrayUnion(post.getId())
            }
        )
    }

    #createIdForPost(lat,lng){
        return geohashForLocation([lat,lng])
    }







    createPostLocation(coordinates, value){
        const hash = geohashForLocation([coordinates.lat,coordinates.lng])
        console.log(hash)
        setDoc(doc(this.db,"cities/Lausanne/posts",String(value)),{
            geohash : hash,
            lat : coordinates.lat,
            lng : coordinates.lng,
            value : value
        })
    }

    test(firestore) {
        // const ref = collection(this.#db, COLLECTIONS.AVAILABLE_VISITS)
        // const neighborhoods = query(collectionGroup(this.#db, 'neighborhoods'), orderBy('value'), limit(2))
        
        // const cities = query(collectionGroup(this.#db, 'cities'), where('name', '==', 'Montpellier'))
        // // const filtered = query(collectionGroup(this.#db, 'neighborhoods'), where('city', '==', 'Montpellier'), orderBy('value'), limit(7))

        // // console.log(cities)

        // getDocs(cities).then(querySnapshot => {
        //     querySnapshot.forEach((doc) => {

        //         console.log(doc.id, ' => ', doc.data());
        //     })
        // })

        // const lat = 46.523750;
        // const lng = 6.574160;
        // const hash = geohashForLocation([lat, lng]);
        // console.log(hash)

        // const londonRef = doc(this.#db, "quartiers","chavannes")
        // updateDoc(londonRef,{
        //     geohash: hash,
        //     lat: lat,
        //     lng: lng
        // })

        const coordinates1 = {lat : 46.523750, lng : 6.574160};
        const coordinates2 = {lat : 46.523795, lng : 6.587345};
        const coordinates3 = {lat : 46.539620, lng : 6.611893};
        const coordinates4 = {lat : 46.521495, lng : 6.557980};
        const coordinates5 = {lat : 46.546648, lng : 6.561928};

        this.createPostLocation(coordinates1,1)
        this.createPostLocation(coordinates2,2)
        this.createPostLocation(coordinates3,3)
        this.createPostLocation(coordinates4,4)
        this.createPostLocation(coordinates5,5)
        // const coordinates6 = {lat : 46.523750, lng : 6.574160};
        // const coordinates7 = {lat : 46.523750, lng : 6.574160};
        // const coordinates8 = {lat : 46.523750, lng : 6.574160};

        
        const center = [46.523750, 6.574160];
        const radiusInM = 1.5 * 1000;

        const bounds = geohashQueryBounds(center, radiusInM);

        const promises = [];
        for (const b of bounds) {
            const q = query(collection(this.db,"cities/Lausanne/posts"), orderBy("geohash"),startAt(b[0]),endAt(b[1]))
            promises.push(getDocs(q));
        }


        Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];

            for (const snap of snapshots) {
              for (const doc of snap.docs) {
                const lat = doc.get('lat');
                const lng = doc.get('lng');
          
                const distanceInKm = distanceBetween([lat, lng], center);
                const distanceInM = distanceInKm * 1000;
                if (distanceInM <= radiusInM) {
                  matchingDocs.push(doc);
                }
              }
            }
          
            return matchingDocs;
          }).then((matchingDocs) => {
            matchingDocs.sort((x,y) => {
                if( x.data().value < y.data().value){
                    return -1
                } else if(x.data().value > y.data().value){
                    return 1
                } return 0
            })

            matchingDocs.forEach(x => {
                console.log(x.data())
            })
          });

    }
}