import { useState, useEffect, useContext } from 'react'
import { DBContext } from '../App'
import BasicButton from './BasicButton'
import BasicText from './BasicText'
import DBClient from './DBClient'

const TestBlock = () => {

    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)
    

    const client = useContext(DBContext)

    useEffect(() => {
        client.getDocument("tule/custom_id/sub_tule", "sub").then(doc => console.log(doc.data().name))
        
    }, [])
    

    return ( 
        <div>
            Hi
        </div>
     );
}
 
export default TestBlock;