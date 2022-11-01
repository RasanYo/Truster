export const COLLECTIONS = {
    AVAILABLE_VISITS: "posts/notVisited/countries",
    FINISHED_VISITS: "posts/visited/countries",
    REGULAR_USERS: "users/regular/users",
    ADMIN_USERS: "users/admin/users",
    users: (country, city) => `coutries/${country}/cities/${city}/users`,
    user: (country, city, uid) => `${COLLECTIONS.users(country, city)}/${uid}`,

    posts: (country, city) => `coutries/${country}/cities/${city}/posts`,
    post: (country, city, id) => `${COLLECTIONS.posts(country, city)}/${id}`,

    PROFILE_PICTURES: "images/profile_pictures",
    profile_picture: (imgUrl) => `${COLLECTIONS.PROFILE_PICTURES}/${imgUrl}`
    // profile_picture_URL: (uid) => {
    //     const supportedTypes = ['jpg', 'png', 'jpeg']
    //     for (let supportedType in supportedTypes) {
    //         try {
    //             let img = `${COLLECTIONS.profile_picture(uid)}.${supportedTypes[supportedType]}`
    //             return img
    //         } catch (e) {
    //             continue
    //         }
    //     }
    // }

}
