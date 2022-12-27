import { View } from "react-native";


export default function Footer(props){
    return(
        <View style={{
            backgroundColor : "white",
            flexDirection : "row",
            
            position:"absolute",
            bottom:0,
            width: "100%",        
            height: 70,

            // padding : 10,
            paddingHorizontal: 20,
            paddingBottom: 10,
            justifyContent:"space-between",
            alignItems:"center",

            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        }}>
            {props.children}
        </View>
    )
}