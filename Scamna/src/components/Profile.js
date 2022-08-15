import { useEffect } from "react";
import { useContext, useState } from "react";
import { DBClientContext } from "../App";

const Profile = () => {

    const client = useContext(DBClientContext)
    const [userData, setUserData] = useState(null)
    const [loadingData, setLoadingData] = useState(userData == null)

    useEffect(() => {
        client.auth.onAuthStateChanged(user => {
            if (user) {
                client.getDocument("users/regular/users", user.uid)
                    .then(snapshot => {
                        setUserData(snapshot.data())
                    })
            }
        })
    },[])
    

    useEffect(() => {
        if (userData) setLoadingData(false)
        else {
            setLoadingData(true)
        }
    }, [userData])

    return ( 
        <div className="profile">
            <h2>Profile</h2>
            {loadingData && <div>Loading...</div>}
            {!loadingData && 
            <ul className="profile-list">
                <ListItem leftChild="Name: " rightChild={`${userData.firstName} ${userData.lastName}`} />
                <ListItem leftChild="Email: " rightChild={userData.email} />
                <ListItem leftChild="Phone number: " rightChild={userData.phoneNumber} />
                <ListItem leftChild="Gender: " rightChild={userData.gender} />
                <ListItem leftChild="Email: " rightChild={userData.email} />
                <ListItem leftChild="Date of birth: " rightChild={userData.dateOfBirth} />
            </ul>}
        </div>
        
     );
}
 
export default Profile;

const ListItem = ({ leftChild, rightChild}) => {
    return ( 
        <li className="list-item">
            <span className="left-child">{leftChild}</span>
            <span className="right-child">{rightChild}</span>
        </li>
     );
}
 