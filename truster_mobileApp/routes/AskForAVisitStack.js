import Menu from "../screens/Menu";
import VisitForm from "../screens/VisitForm";
import SignUp from "../screens/SignUp";
// import Login from "../screens/Login";
import LoginMenu from "../screens/LoginMenu";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { UserContext } from "../App";
import VisitAppartments from "../screens/VisitAppartements";


// const screens = {
//     Menu : {
//         screen : Menu,
//         navigationOptions : {
//             title:"wrlugzbergouzeguzberwerfeferferferfeferfrefwefewfferferfetg",

//         }
//     },
//     VisitForm : {
//         screen : VisitForm
//     }
// }

// const AskVisitStack = createStackNavigator(screens)
// export default createAppContainer(AskVisitStack)


const Stack = createNativeStackNavigator();

function AskForAVisitStack(){

    const { user } = useContext(UserContext)

    return (
        // <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown : false,}}>
                <Stack.Screen name="Menu" component={Menu}/>
                
                
                <Stack.Screen options={{
                    animation:"slide_from_bottom",
                    presentation:"modal",
                    headerShown : true,
                    title: 'Sign Up or Login'
                }} name="LoginMenu" component={LoginMenu}/>

                
                <Stack.Screen name="SignUp" component={SignUp} options={{
                    presentation:"modal",
                    headerShown : true,
                }}/>

                
                <Stack.Screen name="VisitForm" component={VisitForm}/>
                
                <Stack.Screen name="VisitAppartments" component={VisitAppartments}/>
                
                
            </Stack.Navigator>
        // </NavigationContainer>
        
    )
}

export default AskForAVisitStack;

