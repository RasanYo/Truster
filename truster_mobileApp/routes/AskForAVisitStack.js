import Menu from "../screens/Menu";
import VisitForm from "../screens/VisitForm";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from "react";
import { UserContext } from "../App";


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
                headerShown : false,
                animation:"slide_from_bottom",
                presentation:"modal"
            }}>
                <Stack.Screen name="Menu" component={Menu}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="VisitForm" component={VisitForm}/>
            </Stack.Navigator>
        // </NavigationContainer>
        
    )
}

export default AskForAVisitStack;

