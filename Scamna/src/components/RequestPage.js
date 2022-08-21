import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DBClientContext } from "../App";
import { COLLECTIONS } from "../Constants";

const RequestPage = () => {

    const client = useContext(DBClientContext)
    const params = useParams()
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const previousUser = useRef(null)

    const [userData, setUserData] = useState(null)
    const [canRequest, setCanRequest] = useState(false)

    const unsub = client.auth.onAuthStateChanged(user => {
        if (user && user !== previousUser.current) {
            previousUser.current = user
            client.getDocument(COLLECTIONS.REGULAR_USERS, user.uid).then(snapshot => {
                let data = snapshot.data()
                if (data.myVisitRequests.includes(params.id)) navigate("/visits")
                else {
                    setUserData(data)
                    setCanRequest(true)
                }
            })
            unsub()
        }
    })

    const handleSubmit = e => {
        e.preventDefault()
        console.log(params)
        client
            .sendRequestTo(params.id, previousUser.current.uid, message)
            .then(() => navigate("/visits"))
    }

    return ( 
        <div className="request-page">
            {canRequest && <form onSubmit={handleSubmit}>
                <label>Request to visits</label>
                <input 
                    placeholder="Write a message here..."
                    type="textarea"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button>Send request</button>
            </form>}
        </div>
     );
}
 
export default RequestPage;