import { View } from 'react-native';

const Footer = (props) => {


  return ( 
    <View style={{
      backgroundColor : 'white',
      padding : 10,
      height:90,
      width: '100%',
      position:'absolute',
      bottom:0,
      ...props.style
    }}>
      {props.children}
    </View>
  );
};
 
export default Footer;