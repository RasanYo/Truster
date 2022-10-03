import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "../../styles/login.css"
import { AiOutlineGooglePlus } from "react-icons/ai"

const LogIn = () => {

    const {user, isLoggedIn} = useContext(UserContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isGoodPassword,setIsGoodPassword] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();

        user.login(email, password)
            .then(() => navigate("/"))
            .catch(error => {
                console.log(error.message)
                setIsGoodPassword(false) 
            })
    }

    
    return ( 
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                />
                <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                {!isGoodPassword && <div>Sorry, your password was incorrect. Please double-check your password.</div>
    }
                <div className="buttons">
                    <button>Log in</button>
                    <button 
                        className="btn google"
                        type="button" 
                        onClick={e => {
                            e.preventDefault()
                            user.signupWithGoogle().then(() => {
                                navigate("complete_signup")
                            })
                        }}
                    >Log in with <AiOutlineGooglePlus size={16}/></button>
                </div>
                <div className="signup-link">
                    <h5>No account yet ? <Link to="/signup">Sign up here</Link></h5>
                </div>
                
            </form>
        </div>
     );
}
 
export default LogIn;