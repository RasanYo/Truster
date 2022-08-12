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
        client.getDocument("tule/1HKYhAQ428roGu7C2PeZ/prepus", "S11O7lbShbAREXisvtHV").then(doc => console.log(doc.data()))
    }, [])
    

    return ( 
        <div>
            Hi
        </div>
     );
}
 
export default TestBlock;