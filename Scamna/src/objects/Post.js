export class Post {

    #data
    #id

    constructor(
        uid,
        country,
        city,
        npa,
        neighborhood,
        street,
        number,
        lat=null,
        lng=null,
        timeframe
    ) {
        let data = {
            uid: uid,
            country: country,
            city: city,
            npa: npa,
            neighborhood: neighborhood,
            street: street,
            number: number,
            lat: lat,
            lng: lng,
            timeframe: timeframe,
            requesters: []
        }
        this.#id = this.hashId(this.data, uid)
        data.id = this.#id
        this.#data = data
    }

    hashId(postObject, userId){
        const newString = (postObject.lat + postObject.lng   + userId).toString();
        return newString
    }

    /**
     * 
     * @returns post data
     */
    getData() {
        return this.#data
    }

    /**
     * 
     * @returns post id
     */
    getId() {
        return this.#id
    }

    getLocation() {
        return `${COLLECTIONS.AVAILABLE_VISITS}/${this.#data.country}/posts/${this.#data.city}/posts`
    }
}