import { useState } from "react"

const useData = (dataObject) => {

    const [data, setData] = useState(dataObject)

    const handleChange = e => {
        let field = e.target.name //firstname
        let newData = data
        newData[field] = e.target.value
        setData(newData)
    }

    return { data, handleChange };
}
 
export default useData;