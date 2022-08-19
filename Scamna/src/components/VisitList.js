import { limit, where } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { DBClientContext } from "../App";
import { COLLECTIONS } from "../Constants";
import PostPreview from "./PostPreview";
import { useNavigate } from "react-router-dom";

const VisitList = (numberofElements) => {

    const client = useContext(DBClientContext)
    const [visits, setVisits] = useState(null)
    const [isLoading, setIsLoading] = useState(visits == null)
    const previousUser = useRef(null)
    const navigate = useNavigate()

    const unsubscribe = client.auth.onAuthStateChanged(user => {
        if (user && user !== previousUser.current) {
            previousUser.current = user
            // client.getCollectionWithQuery(COLLECTIONS.AVAILABLE_VISITS, where("createdBy", "!=", user.uid), limit(parseInt({numberofElements})))
            //     .then(visits => {
            //         setVisits(visits)
            //     })
            client.getCollectionWithQuery(COLLECTIONS.AVAILABLE_VISITS, where("createdBy", "!=", user.uid))
                .then(visits => {
                    setVisits(visits)
                })
        }
    })

    useEffect(() => {
        setIsLoading(visits == null)
    }, [visits])

    return ( 
        <div className="visit-list">
            <div className="post-list">
                {isLoading && <div>Loading ...</div>}
                {!isLoading && visits.map((visit, index) => (
                    <PostPreview 
                        post={visit.data()} 
                        key={index} 
                        handleClick={e => {
                            e.preventDefault()
                            navigate(`${visit.id}`)
                        }}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default VisitList;