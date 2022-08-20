import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DBClientContext } from "../App";

const LogIn = () => {

    const client = useContext(DBClientContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isGoodPassword,setIsGoodPassword] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        client.logInUser(email, password)
            .then(() => {
                navigate("/")
            }).catch(error => {
                console.log(error.message)
                setIsGoodPassword(false) 
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
                {!isGoodPassword && <div>Sorry, your password was incorrect. Please double-check your password.</div>
                }
                <button>Log in</button>
            </form>
            <Link to="/signup">No account yet? Create it here</Link>
        </div>
     );
}
 
export default LogIn;