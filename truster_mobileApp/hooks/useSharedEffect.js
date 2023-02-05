import { useEffect } from 'react';
import { auth } from '../firebase';
import { Guest } from '../objects/Guest';
import { User } from '../objects/User';

export default function useSharedEffect(setUser, navigation) {
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(u => {
      console.log('Auth state changed');
      if (u) { 
        console.log('User is already logged in');
        setUser(new User(u.uid, u)); 
      } 
      else {
        console.log('User is not logged in');
        setUser(new Guest());
        navigation.navigate('LoginMenu');
        // navigation.navigate("LoginMenu")
      }
      return () => unsuscribe();
    });
  }, []);
}
