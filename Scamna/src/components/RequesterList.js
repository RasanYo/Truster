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
    

    const allowRequest = useLocation().pathname.includes("visits")

    useEffect(() => {
        client.getCollectionData(`${COLLECTIONS.AVAILABLE_VISITS}/${postID}/requests`)
            .then(reqs => {
                setRequests(reqs)
            })
    }, [])

    // const unsubRequestList = client.createRealTimeCollectionListener(
    //     `${COLLECTIONS.AVAILABLE_VISITS}/${postID}/requests`,
    //     collectionSnapshot => {
    //         let docs = []
    //         collectionSnapshot.forEach(doc => docs.push(doc.data()))
    //         console.log(docs)
    //         setRequests(docs)
    //     })


    const unsubVisitor = client.createRealTimeDocListener(
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
            {!loadingRequests && !allowRequest && 
            requests.map((request, index) => {
                return <RolldownItem
                    key={index}
                    preview={<div>{request.createdBy}</div>}
                    body={
                    <div>
                        <h4>{request.message}</h4>
                        {/* {!visitor && 
                        <button 
                            onClick={e => {
                                e.preventDefault()
                                client.acceptVisitRequest(postID, request.createdBy)
                        }}>Accept request</button>}
                        {visitor && 
                        visitor == request.createdBy && 
                        <button onClick={e => {
                            e.preventDefault()
                            client.cancelVisit(postID, request.createdBy)
                        }}>Cancel visit</button>} */}

                        {visitor == request.createdBy ? 
                        <button onClick={e => {
                            e.preventDefault()
                            client.cancelVisit(postID, request.createdBy)
                        }}>Cancel visit</button> : 
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
                                }}
                                className="cross"
                            />
                        </span>}
                    </div>}
                />
            })}
        </div>
     );
}
 
export default RequesterList;