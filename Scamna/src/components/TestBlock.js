import { useState, useEffect } from 'react'
import BasicButton from './BasicButton'
import BasicText from './BasicText'
import DBClient from './DBClient'

const TestBlock = () => {

    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)

    const users_url = "http://localhost:8000/users"

    const client = DBClient()

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

    

    useEffect(() => {
        client.getJSONFrom(users_url)
            .then(data => {
                setUsers(JSON.stringify(data))
            })
            .catch(err => {
                setError(err)
            })
    }, [])

    useEffect(() => {
        client.addJSONTo(users, users_url)
    }, [users])

    const handleClick = () => {
        fetch(users_url)
            .then(res => {
                console.log("CHECK")
                return res.json()
            })
            .then(data => {
                let el = data
                el["new_user"] = new_user
                setUsers(JSON.stringify(el))
            })
            .catch(err => {
                setError(err)
            })
    }

    const handleDelete = () => {
        client.deleteJSONAttributeFrom("new_user", users_url)
    }


    return ( 
        <div>
            { users && <BasicText text={users} />}
            <BasicButton title="Test button" handleClick={handleClick} />
            <BasicButton title="Delete button" handleClick={handleDelete} />
        </div>
     );
}
 
export default TestBlock;