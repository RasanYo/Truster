import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DBClientContext } from "../App";

const LogIn = () => {

    const client = useContext(DBClientContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        client.logInUser(email, password)
            .then(userCred => {
                navigate("/")
                console.log(`User ${userCred.user.uid}`)
            })
    }

    return ( 
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Log in</button>
            </form>
            <Link to="/signup">No account yet? Create it here</Link>
        </div>
     );
}
 
export default LogIn;