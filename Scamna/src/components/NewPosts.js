import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DBClientContext } from "../App";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import AutoComplete from './AutoComplete';
import MapSection from "./Map";

const NewPosts = () => {

    const navigate = useNavigate()

    const client = useContext(DBClientContext);
    const [city, setCity] = useState("");
    const [street,setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [country,setCountry] = useState("");
    const [npa,setNpa] = useState("");
    const [dateVisit, setDateVisit] = useState("");
    const [fullAdress, setFullAdress] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const [invalidEntry, setInvalidEntry] = useState(false);

    // const [location, setLocation] = useState({
    //     address: '1600 Amphitheatre Parkway, Mountain View, california.',
    //     lat: 37.42216,
    //     lng: -122.08427,
    //   });

    const [location, setLocation] = useState(['',37.42216,-122.08427])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        //Need condition for correctness of adress

        if (!street || 
            !number ||
            !city ||
            !npa ||
            !country) {
            setInvalidEntry(true)
            return false
        }

        client.createPost({
            street : street,
            number : number,
            city : city,
            npa : npa,
            country : country,
            fullAdress : fullAdress,
            lat:lat,
            lng:lng,
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

    useEffect(()=>{
        var val = street+" " + number + " " + city + " " + country
        geocodeByAddress(val).then(results => {
            getLatLng(results[0]).then(x => {
                setLat(x.lat)
                setLng(x.lng)
                setLocation([val,x.lat,x.lng])
            })
          }).catch(ZERO_RESULTS => {
            console.log("no result for current adress")
          })
    },[city,street,number,country,npa])

    return ( 
        <div className="new-post-preview">
            <h2>Add New Post</h2> 
            <form onSubmit={handleSubmit}>
                {/* {<AutoComplete address={fullAdress} setAddress={setFullAdress}/>} */}
                <AutoComplete textObj={{text : "Type Adress"}} setStreet={setStreet} setCity={setCity} setNpa={setNpa} setCountry={setCountry} setFullAdress={setFullAdress} setNumber = {setNumber} setLocation={setLocation} setLat={setLat} setLng={setLng}/>
                {invalidEntry &&
                <div>
                    Missing: 
                    {!street && <h6>Street name</h6>}
                    {!number && <h6>Street number</h6>}
                    {!npa && <h6>NPA</h6>}
                    {!city && <h6>City</h6>}
                    {!country && <h6>Country</h6>}
                </div>}
                {/* <div className="street-name-number">
                    <input 
                        // style={{display: 'none'}}
                        id="one"
                        className="inputForm"
                        placeholder="Street name"
                        type="text" 
                        value={street}
                        required 
                        onChange={(e) => setStreet(e.target.value)}
                    />

                    <input 
                        // style={{display: 'none'}}
                        id="two"
                        className="inputForm"
                        placeholder="Nº"
                        type="text" 
                        value={number}
                        required 
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div> */}

                {/* <input 
                    // style={{display: 'none'}}
                    className="inputForm"
                    placeholder="City"
                    type="text" 
                    required 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                /> */}
                {/* <AutoComplete  textObj={{text : "City"}} setCity={setCity} searchOptions={{types : ['locality']}}/> */}

                {/* <input 
                    // style={{display: 'none'}}
                    className="inputForm"
                    placeholder="NPA"
                    type="text" 
                    required 
                    value={npa}
                    onChange={(e) => setNpa(e.target.value)}
                /> */}

                {/* <input 
                    // style={{display: 'none'}}
                    className="inputForm"
                    placeholder="Country"
                    type="text" 
                    required 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                /> */}

                {/* <AutoComplete  textObj={{text : "Country"}} setCountry={setCountry} searchOptions={{types : ['country']}}/> */}
                        
                <MapSection location={location} zoomLevel={15} id={"New Post"+location[1]+location[2]}/>

                <label className="labelForm">Date of Visit</label>
                <input 
                className="inputForm"
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