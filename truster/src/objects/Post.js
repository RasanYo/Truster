import { geohashForLocation } from "geofire-common"
import { COLLECTIONS } from "../Constants"

export const postConverter = {
    toFirestore: (post) => {
        return {
            address: post.getAddress(),
            description: post.getDescription(),
            geohash: post.getGeohash(),
            id: post.getId(),
            requesters: post.getRequesters(),
            timeframe: post.getTimeframe(),
            creatorUID: post.getCreatorUID()
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Post(data.address, data.timeframe, data.description, data.creatorUID, data.requesters, data.id)
    }
}
export class Post {

    #id
    #address
    #description
    #requesters
    #timeframe
    #creatorUID

    constructor(address, timeframe, description="", creatorUID=null, requesters=[], id=null) {
        this.#address = address
        this.#timeframe = timeframe
        this.#description = description
        this.#creatorUID = creatorUID
        this.#requesters = requesters

        this.#id = id ? id : this.#createID()
    }

    #createID() {
        return this.getGeohash()
    }

    getGeohash() {
        return geohashForLocation([this.#address.lat, this.#address.lng])
    }

    getAddress() {
        return this.#address
    }

    getTimeframe() {
        return this.#timeframe
    }

    getDescription() {
        return this.#description
    }

    getCreatorUID() {
        return this.#creatorUID
    }

    getRequesters() {
        return this.#requesters
    }

    asDataObject() {
        return {
            address: this.getAddress(),
            description: this.getDescription(),
            geohash: this.getGeohash(),
            id: this.getId(),
            requesters: this.getRequesters(),
            timeframe: this.getTimeframe(),
            creatorUID: this.getCreatorUID()
        }
    }

    /**
     * 
     * @returns post id
     */
    getId() {
        return this.#id
    }

    getLocation() {
        return COLLECTIONS.posts(this.#address.country, this.#address.city)
    }
}