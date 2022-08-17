import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DBClientContext } from "../App";

const RequestPage = () => {

    const client = useContext(DBClientContext)
    const params = useParams()
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const previousUser = useRef(null)

    client.auth.onAuthStateChanged(user => {
        if (user && user !== previousUser.current) {
            previousUser.current = user
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
            <form onSubmit={handleSubmit}>
                <label>Request to visits</label>
                <input 
                    placeholder="Write a message here..."
                    type="textarea"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button>Send request</button>
            </form>
        </div>
     );
}
 
export default RequestPage;