import { FlatList } from "react-native";
import MessageBox from "./MessageBox";

const MessageList = ({
    messages
}) => {

    return ( 
        <FlatList 
            data={messages}
            renderItem={({ item }) => (
                <MessageBox msg={item}/>
            )}
        />
     );
}
 
export default MessageList;