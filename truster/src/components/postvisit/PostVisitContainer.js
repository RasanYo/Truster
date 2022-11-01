import { createContext, useState } from "react";
import PostVisit from "./PostVisit";
import '../../styles/postvisitcontainer.css'
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Post } from "../../objects/Post";
import { useContext } from "react";
import { UserContext } from "../../App";
import useData from "../../hooks/useData";

export const ErrorContext = createContext(null)

const PostVisitContainer = () => {

    const { user } = useContext(UserContext)

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

    const [address, setAddress] = useState(null)

    const {data, handleChange} = useData({
        start: "",
        end: "",
        description: "",
    })

    const onSubmit = e => {
        e.preventDefault()
        setShowErrors(true)
        if (!address || new Date(data.start).getTime() > new Date(data.end).getTime()) return false
        else {
            const post = new Post(address, {start: data.start, end: data.end}, data.description, user.getUID())
            user.post(post).then(() => console.log("Successfully posted"))
        }
    }

    return ( 
        <div className="postvisit-container space-top">
            <h1 className="fit-width">Post a visit</h1>
            <ErrorContext.Provider value={showErrors}>
                <PostVisit
                    setAddress={setAddress}
                    data={data}
                    handleChange={handleChange}
                    onSubmit={onSubmit}
                />
            </ErrorContext.Provider>
        </div>
     );
}
 
export default PostVisitContainer;