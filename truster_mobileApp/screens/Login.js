import { useContext, useState } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../App";

export default function Login(){
    const {user} = useContext(UserContext)

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isGoodPassword, setIsGoodPassword] = useState("")

    return (
        <View>
            <Text>
                Login Page
            </Text>
        </View>
    )
}