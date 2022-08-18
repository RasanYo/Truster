import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DBClientContext } from "../App";
import AutoComplete from './AutoComplete';

const NewPosts = () => {

    const navigate = useNavigate()

    const client = useContext(DBClientContext);
    const [city, setCity] = useState("");
    const [street,setStreet] = useState("");
    const [country,setCountry] = useState("");
    const [npa,setNpa] = useState("");
    const [dateVisit, setDateVisit] = useState("");
    const [fullAdress, setFullAdress] = useState("");
    
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
        navigate("/myposts")
        return true
    }

    useEffect(() => {
        setFullAdress("")
    },[])

    useEffect(() => {
        console.log(fullAdress)
    },[fullAdress])

    return ( 
        <div className="new-post-preview">
            <h2>Add New Post</h2> 
            <form >
                {/* {<AutoComplete address={fullAdress} setAddress={setFullAdress}/>} */}
                <AutoComplete textObj={{text : "Type Adress"}} setStreet={setStreet} setCity={setCity} setNpa={setNpa} setCountry={setCountry} setFullAdress={setFullAdress}/>

                <input 
                className="inputForm"
                placeholder="Street name & number"
                type="text" 
                value={street}
                required 
                onChange={(e) => setStreet(e.target.value)}
                />

                <input 
                className="inputForm"
                placeholder="City"
                type="text" 
                required 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
                {/* <AutoComplete  textObj={{text : "City"}} setCity={setCity} searchOptions={{types : ['locality']}}/> */}

                <input 
                className="inputForm"
                placeholder="NPA"
                type="number" 
                required 
                value={npa}
                onChange={(e) => setNpa(e.target.value)}
                />

                <AutoComplete  textObj={{text : "Country"}} setCountry={setCountry} searchOptions={{types : ['country']}}/>
                        
                      

                <label className="labelForm">Date of Visit</label>
                <input 
                className="inputForm"
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