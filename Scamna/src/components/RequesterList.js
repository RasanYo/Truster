import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { DBClientContext } from "../App";
import { COLLECTIONS } from "../Constants";
import RolldownItem from "./RolldownItem";
import { ImCheckmark, ImCross } from "react-icons/im";

const RequesterList = ({ postID, style }) => {

    const client = useContext(DBClientContext);
    const [requests, setRequests] = useState(null)
    const [loadingRequests, setLoadingRequests] = useState(requests == null)
    const [visitor, setVisitor] = useState(null)

    const [fetch, setFetch] = useState(true)
    

    const allowRequest = useLocation().pathname.includes("visits")

    useEffect(() => {
        let isActive = true
        if (isActive) {
        client.getCollectionData(`${COLLECTIONS.AVAILABLE_VISITS}/${postID}/requests`)
            .then(reqs => {
                setRequests(reqs)
            })
        }
        return () => { isActive = false}
    }, [])

    // modifying fetch will trigger a new get request to the requestercollection
    useEffect(() => {
        let isActive = true
        if (isActive) {
        client.getCollectionData(`${COLLECTIONS.AVAILABLE_VISITS}/${postID}/requests`)
            .then(reqs => {
                setRequests(reqs)
            })
        }
        return () => { isActive = false }
    }, [fetch])

    const unsubPostListener = client.createRealTimeDocListener(
        COLLECTIONS.AVAILABLE_VISITS, 
        postID,
        doc => {
            let v = doc.data().visitor
            setVisitor(v)
        }
    )

    useEffect(() => {
        setLoadingRequests(requests == null)
    }, [requests])
        

    return ( 
        <div className="rolldown-list" style={style}>
            {loadingRequests && <div>Fetching requests...</div>}
            
            {
            !loadingRequests && 
            !allowRequest && 
            requests.map((request, index) => {
                return <RolldownItem
                    key={index}
                    preview={
                        <div>
                            <h2 className="title">{request.createdBy}</h2>
                            {visitor == request.createdBy ? 

                            <button 
                                onClick={e => {
                                    e.preventDefault()
                                    client.cancelVisit(postID, request.createdBy)
                                }}
                            >
                                Cancel visit
                            </button> : 

                            <span className="request-buttons">
                                {!visitor && 
                                <ImCheckmark 
                                    onClick={e => {
                                        e.preventDefault()
                                        client.acceptVisitRequest(postID, request.createdBy)
                                    }}
                                    className="check"
                                />}
                                <ImCross 
                                    onClick={e => {
                                        e.preventDefault()
                                        client.declineVisitRequest(postID, request.createdBy)
                                        setFetch(!fetch)
                                    }}
                                    className="cross"
                                />
                            </span>}
                        </div>
                    }
                    body={
                    <div>
                        <h4>{request.message}</h4>
                    </div>}
                />
            })}
        </div>
     );
}
 
export default RequesterList;