import { FlatList } from "react-native";
import RequesterContainer from "./RequesterContainer";

const RequesterList = ({
    requesterIDs
}) => {

    

    return ( 
        <FlatList 
            data={requesterIDs}
            renderItem={({ item }) => {
                <RequesterContainer 
                    requesterID={item}
                />
            }}
        />
     );
}
 
export default RequesterList;