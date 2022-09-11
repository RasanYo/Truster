export const COLLECTIONS = {
    AVAILABLE_VISITS: "posts/notVisited/countries",
    FINISHED_VISITS: "posts/visited/countries",
    REGULAR_USERS: "users/regular/users",
    ADMIN_USERS: "users/admin/users",
    users: (country, city) => `coutries/${country}/cities/${city}/users`,
    user: (country, city, uid) => `${COLLECTIONS.users(country, city)}/${uid}`,

    PROFILE_PICTURES: "images/profile_pictures",
    profile_picture: (uid) => `${COLLECTIONS.PROFILE_PICTURES}/${uid}`,
    profile_picture_URL: (uid) => `${COLLECTIONS.profile_picture(uid)}.jpg`

}
