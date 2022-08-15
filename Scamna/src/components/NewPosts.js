import { useContext, useState } from "react";
import { DBClientContext } from "../App";

const NewPosts = () => {

    const client = useContext(DBClientContext);
    const [city, setCity] = useState("");
    const [street,setStreet] = useState("");
    const [country,setCountry] = useState("");
    const [npa,setNpa] = useState("");
    const [dateVisit, setDateVisit] = useState("");
    

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
                onChange={(e) => setCity(e.target.value)}
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


                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default NewPosts;