import { collection, orderBy, query } from "firebase/firestore";
import { COLLECTIONS } from "../Constants";

export class AbstractUser {
    #db
    constructor(db) {
        if (this.constructor == AbstractUser) {
            throw new Error('Cannot instantiate abstract user');
        }
        this.#db = db;
    }

    isLoggedIn() {
        throw new Error('method must be implemented')
    }

    getPublicPosts(country, city, neighborhoods, ...queryConstraints) {
        const cityRef = collection(this.#db, COLLECTIONS.AVAILABLE_VISITS, country, 'cities', city)
        let postRefs
        if (neighborhoods.length) {
            let neighborhoodRefs = query(
                collectionGroup(cityRef.firestore, 'neighborhoods'), 
                where('name', '==', neighborhoods)
            )
            postRefs = query(
                collectionGroup(neighborhoodRefs.firestore, 'posts'),
                 ...queryConstraints
            )     
        } else {
            postRefs = query(
                collectionGroup(cityRef.firestore, 'posts'), 
                ...queryConstraints
            )
        }

        return getDocs(postRefs)
            .then(querySnapshot => {
                querySnapshot.map((doc) => {
                    return doc
                })
            })
    }

}