import { getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { DBClientContext } from "../App";

const NewPosts = () => {

    const client = useContext(DBClientContext);
    const [city, setCity] = useState("");
    const [street,setStreet] = useState("");
    const [country,setCountry] = useState("");
    const [npa,setNpa] = useState("");
    const [dateVisit, setDateVisit] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault()
        //Need condition for correctness of adress

        client.createPost({
            street : street,
            city : city,
            npa : npa,
            country : country,
            dateVisit : dateVisit,
        },getAuth().currentUser.uid)

        // client.hashId({
        //         street : street,
        //         city : city,
        //         npa : npa,
        //         country : country,
        //         dateVisit : dateVisit,
        //         createdBy : getAuth().currentUser.uid
        //     },getAuth().currentUser.uid)

        return true
    }


    return ( 
        <div className="new-post-preview">
            <h2>Add New Post</h2> 
            <form >
                <input 
                placeholder="Street name & number"
                type="text" 
                required 
                onChange={(e) => setStreet(e.target.value)}
                />

                <input 
                placeholder="City"
                type="text" 
                required 
                onChange={(e) => setCity(e.target.value)}
                />

                <input 
                placeholder="NPA"
                type="number" 
                required 
                onChange={(e) => setNpa(e.target.value)}
                />

                <input 
                placeholder="Country"
                type="text" 
                required 
                onChange={(e) => setCountry(e.target.value)}
                />      

                <label>Date of Visit</label>
                <input 
                type="date" 
                required 
                onChange={(e) => setDateVisit(e.target.value)}
                />


                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
     );
}
 
export default NewPosts;