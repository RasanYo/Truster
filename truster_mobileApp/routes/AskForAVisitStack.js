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
                headerShown : false,}}>
                <Stack.Screen name="Menu" component={Menu}/>
                <Stack.Group screenOptions={{
                    animation:"slide_from_bottom",
                    presentation:"modal",
                    headerShown : true,
                }}>
                    
                    <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up or Login' }}/>
                    <Stack.Screen name="Login" component={Login}/>
                </Stack.Group>

                <Stack.Group>
                    {/* <Stack.Screen name="Menu" component={Menu}/> */}
                    <Stack.Screen name="VisitForm" component={VisitForm}/>
                </Stack.Group>
                
                
            </Stack.Navigator>
        // </NavigationContainer>
        
    )
}

export default AskForAVisitStack;

