import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DBClientContext } from "../App";
import MyPosts from "./MyPosts";
import VisitList from "./VisitList";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const client = useContext(DBClientContext)

    const unsubscribe = client.auth.onAuthStateChanged(user => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    })

    return ( 
        <div className="home-preview">
            {isLoggedIn && <div className="findVisit-home">
                                <h2>Find Visit</h2>
                                <VisitList numberofElements={2}></VisitList>
                                <Link to="/visits">Find visit</Link>
                            </div>}
            {isLoggedIn && <div className="myPosts-home">
                                <h2>My Posts</h2>
                                <MyPosts numberofElements={5} usedOutside={true}></MyPosts>
                                <Link to="/myposts">See More</Link>
                            </div>}                
            {isLoggedIn && <div className="newPost-home">
                                <h2>New Post</h2>
                                <Link to="/newpost">New Post</Link>
                            </div>}
            
            
        </div>
     );
}
 
export default Home;