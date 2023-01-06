import { View } from "react-native";

const Header = (props) => {


    return ( 
        <View style={{
            backgroundColor : "white",
            padding : 10,
            height:90,
            width: "100%",
            position:"relative",
            top:0,
            ...props.style
        }}>
            {props.children}
        </View>
    );
}
 
export default Header;