import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../../context';
import { auth } from '../../firebase';


export default function LoginMenu({navigation}){
  const {user} = useContext(UserContext);
  const [isLoggingIn,setIsLoggingIn] = useState(false);
  const [isWrongPassword,setIsWrongPassword] = useState(false);

  const [userState, setUserState] = useState({
    gender: 'Others',
    firstName: 'Menelik',
    lastName: 'Nouvellon',
    birthdate: '01/09/02',
    email: '',
    password: '',
    passwordConfirmation: '',
    aboutMe: 'Pas besoin mec',
    picture: null,
  });


  const loginOrSignUp = (email) => {



    user.userExistsByEmail(email).then(bool => {
      if(isLoggingIn == true){
        console.log('logging in the user');
        user.login(email,userState.password)
          .then(() => {
            navigation.pop();
          }).catch(err => {
            console.log(err.code);
            if(err.code === 'auth/wrong-password'){
              setIsWrongPassword(true);
              setPassword('');
            }
          });
      }
      if(bool){
        setIsLoggingIn(true);
      }
      else{
        navigation.navigate('SignUp',{emailGiven : email});
      }
    });

  };

  const googleAuth = () => {
    user.signupWithGoogle().then(() => {
      navigation.pop();
    })
  }
    

  const setEmail = text => {
    setUserState(existingValues => ({
      ...existingValues,
      email : text
    }));
  };

  const setPassword = text => {
    setUserState(existingValues => ({
      ...existingValues,
      password : text
    }));
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth,'meneliknouvellon.pro@gmail.com','Mene4485')
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user);
      })
      .catch(err => alert(err.message));
  };

  return (
    <View>
      <View>
        <View style={styles.componentStyle}>
          <TextInput placeholder="Adresse email" value={userState.email} style={styles.text} onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false} onChange={() => {setIsLoggingIn(false);setIsWrongPassword(false); }} autoComplete="email" keyboardType="email-address" textContentType="emailAddress"></TextInput>
        </View>
        {isLoggingIn && 
                <View style={styles.componentStyle}>
                  <TextInput placeholder="password" value={userState.password} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPassword(text)} autoCapitalize="none" autoCorrect={false}></TextInput>
                  {isWrongPassword && <Text style={{color:'red', fontSize:10}}>Wrong Password</Text>}
                </View>}
        <TouchableOpacity style={[styles.componentStyle,{backgroundColor: userState.email.length == 0 ? '#c4c4c4' : '#FFCB66',}]}
          onPress={() => loginOrSignUp(userState.email)}>
          <Text style={{textAlign:'center',fontSize:17,}}>
                        Continue
          </Text>
        </TouchableOpacity>
                
      </View>
      <View style={{marginTop:50,}}>
        <Text>
                        Continue with : 
        </Text>
        <TouchableOpacity style={styles.componentStyle}>  
          <Text style={{textAlign:'center'}}>Google</Text>
        </TouchableOpacity>
        <View style={styles.componentStyle}>  
          <Text style={{textAlign:'center'}}>Apple</Text>
        </View>
        <View style={styles.componentStyle}>  
          <Text style={{textAlign:'center'}}>Facebook</Text>
        </View>
            
      </View>
            
    </View>
  );
}

const styles = StyleSheet.create({
  componentStyle : {
    marginTop:30,
    marginHorizontal:20,
    padding:10,
    borderColor:'gray',
    borderWidth:1,
    borderRadius:7,
    height:50,
    justifyContent:'center',
  },

  text : {
    marginLeft:10,
    fontSize:17
  }
});