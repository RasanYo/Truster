const DBClient = () => {

    function getJSONFrom(serverUrl) {
        return fetch(serverUrl)
                .then(res => {
                    return res.json()
                })
    }

    function addJSONTo(data, serverUrl) {
        return fetch(serverUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: data
        })
    }

    function deleteJSONAttributeFrom(attribute, serverUrl) {
        return fetch(`${serverUrl}/${attribute}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
    }

    return ( { 
        getJSONFrom: getJSONFrom,
        addJSONTo: addJSONTo,
        deleteJSONAttributeFrom: deleteJSONAttributeFrom
    } );
}
 
export default DBClient;