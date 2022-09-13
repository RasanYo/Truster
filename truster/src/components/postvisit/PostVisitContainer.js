import { createContext, useState } from "react";
import PostVisit from "./PostVisit";
import '../../styles/postvisitcontainer.css'
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export const ErrorContext = createContext(null)

const PostVisitContainer = () => {

    function stringifyAdress(adress) {
        var res = ""
        if (adress.number) res += `${adress.number} `
        if (adress.street) res += `${adress.street}, `
        if (adress.npa) res += `${adress.npa} `
        if (adress.city) res += `${adress.city} `
        if (adress.country) res += `${adress.country}`
        return res
    }

    function getAdressCoords(adress) {
        
        return geocodeByAddress(stringifyAdress(adress)).then(res => {return getLatLng(res[0])})
    }

    const [showErrors, setShowErrors] = useState(false)

    const [adress, setAdress] = useState({
        number: "",
        street: "",
        additionalInfo: "",
        npa: "",
        city: "",
        country: ""
    })
    const handleChangeAdress = e => {
        let field = e.target.name
        let newAdress = adress
        newAdress[field] = e.target.value
        setAdress(newAdress)
    }

    const [timeframe, setTimeframe] = useState({
        start: "",
        end: ""
    })
    const handleChangeTimeframe = e => {
        let field = e.target.name
        let newTimeframe = timeframe
        newTimeframe[field] = e.target.value
        setTimeframe(newTimeframe)
    }

    const [description, setDescription] = useState("")
    const handleChangeDescription = e => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        getAdressCoords(adress)
            .then(res => console.log(res))
        
    }

    return ( 
        <div className="postvisit-container">
            <h1 className="fit-width">Post a visit</h1>
            <ErrorContext.Provider value={showErrors}>
                <PostVisit
                    adress={adress} handleChangeAdress={handleChangeAdress}
                    timeframe={timeframe} handleChangeTimeframe={handleChangeTimeframe}
                    description={description} handleChangeDescription={handleChangeDescription}
                    onSubmit={onSubmit}
                />
            </ErrorContext.Provider>
        </div>
     );
}
 
export default PostVisitContainer;