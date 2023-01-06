import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';


const Card = ({itemData, onPress, index}) => {
  return (
    <TouchableOpacity onPress={onPress} key={index}>
    {/* {console.log("index "+index)} */}
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          {/* <Image
            source={itemData.image}
            resizeMode="cover"
            style={styles.cardImg}
          /> */}
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.title}</Text>
          <Text numberOfLines={2} style={styles.cardDetails}>{itemData.description}</Text>
          <Text numberOfLines={2} style={styles.cardDetails}>{itemData.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 100,
    // backgroundColor:"red",
    width:300,
    // marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal:20,

  },
  cardImgWrapper: {
    // flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize:15
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});