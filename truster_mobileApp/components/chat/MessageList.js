import { useContext } from "react";
import { FlatList } from "react-native";
import { UserContext } from "../../context";
import MessageBox from "./MessageBox";

const MessageList = ({
    messages
}) => {

    const {user} = useContext(UserContext)

    return ( 
        <FlatList 
            data={messages}
            renderItem={({ item }) => (<MessageBox message={item.message} time={item.time}/>)}
        />
     );
}
 
export default MessageList;