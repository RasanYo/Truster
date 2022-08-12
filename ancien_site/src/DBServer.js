const fetch = require('node-fetch');

const users_url = "http://localhost:3000/users"

const new_user = {
    first_name: "Arouf",
    last_name: "Gangsta",
    email: "arouf.gangsta@example.com",
    phone: "+33 6 98 76 54 32",
    date_of_birth: "10-08-2022",
    posts: [],
    visit_requests: [],
    visits: []
}

fetch(users_url)
    .then(res => {
        return res.json
    })
    .then(data => {
        console.log(data)
    })