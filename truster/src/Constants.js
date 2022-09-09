export const COLLECTIONS = {
    AVAILABLE_VISITS: "posts/notVisited/countries",
    FINISHED_VISITS: "posts/visited/countries",
    REGULAR_USERS: "users/regular/users",
    ADMIN_USERS: "users/admin/users",
    user: (country, city, uid) => `coutries/${country}/cities/${city}/users/${uid}`
}
