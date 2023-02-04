import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Autocomplete from '../objects/Autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Location from 'expo-location';


// Ce quil manque à faire c'est d'inclure les types d'accomodation dans les posts information
export default function VisitForm({navigation}) {
  const [address, setAddress] = useState('');
  const [accomodationSelected, setAccomodationSelected] = useState(null);
  const [tomorrow, setTomorrow] = useState('');
  const [inTwoDays, setInTwoDays] = useState('');
  const [inThreeDays, setInThreeDays] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [description, setDescription] = useState('');
  const [isCity, setIsCity] = useState(false);
  const [isStreetNumber, setIsStreetNumber] = useState(false);
  const [isStreetName, setIsStreetName] = useState(false);
  const [price, setPrice] = useState(false);

  const [isErasingAll, setIsErasingAll] = useState(false);

  useEffect(() => {
    setIsErasingAll(false);
  }, [address, accomodationSelected, selectedDate, description]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleTomorrow = (nbDays) => {
    const today = new Date();
    const aux = new Date();
    aux.setDate(today.getDate() + nbDays);
    setSelectedDate(aux);
  };

  const handleAccommodationSelected = (val) => {
    console.log(val);
    setAccomodationSelected(val);
  };

  const dateToString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Current Month
    const year = date.getFullYear(); // Current Year
    return day + '/' + month + '/' + year;
  };

  const isSameDate = (d1, d2) => {
    return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear();
  };

  useEffect(() => {
    const today = new Date();
    const dateInTwoDays = new Date();
    dateInTwoDays.setDate(today.getDate() + 2);
    setInTwoDays(dateInTwoDays);

    const dateInOneDay = new Date();
    dateInOneDay.setDate(today.getDate() + 1);
    setTomorrow(dateInOneDay);
    setSelectedDate(dateInOneDay);

    const dateInThreeDays = new Date();
    dateInThreeDays.setDate(today.getDate() + 3);
    setInThreeDays(dateInThreeDays);

    // -----

    setIsCity(true);
    setIsStreetName(true);
    setIsStreetNumber(true);
  }, []);

  const accomodationOption = [
    {
      icon: <AntDesign name="home" size={20} style={styles.icon}/>,
      text: 'House',
    },
    {
      icon: <FontAwesome name="building-o" size={20} style={styles.icon}/>,
      text: 'Appartment',
    },
    {
      icon: <FontAwesome5 name="warehouse" size={20} style={styles.icon}/>,
      text: 'Local',
    },
  ];

  const eraseAll = () => {
    setIsErasingAll(true);
    setAccomodationSelected(null);
    setSelectedDate(tomorrow);
    setDescription('');
  };

  const handleSelection = (data, details) => {
    setIsCity(false);
    setIsStreetName(false);
    setIsStreetNumber(false);
    const geo = details.geometry.location;
    const t = details.address_components;
    const newAddress = {};

    newAddress.lat = geo.lat;
    newAddress.lng = geo.lng;
    newAddress.fullAddress = details.formatted_address;
    getCityName(geo.lat, geo.lng);

    t.forEach((x) => {
      if (x.types.includes('street_number')) {
        newAddress.number = x.long_name;
        setIsStreetNumber(true);
      } else if (x.types.includes('route')) {
        newAddress.street = x.long_name;
        setIsStreetName(true);
      } else if (x.types.includes('postal_code')) {
        newAddress.npa = x.long_name;
      } else if (x.types.includes('country')) {
        newAddress.country = x.long_name;
      }
    });
    getCityName(geo.lat, geo.lng).then((response) => {
      newAddress.city = response;
      console.log(newAddress);
      setIsCity(true);
      if (Object.getOwnPropertyNames(newAddress).length != 8) {
        console.log(Object.getOwnPropertyNames(newAddress).length);
        console.log('Information missing');
      } else {
        setAddress(newAddress);
      }
    });
  };

  // This function is only we can't get the city name from the google api
  const getCityName = async (LATITUDE, LONGITUDE) => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      });

      console.log(response[0].city);
      return response[0].city;
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <View style={styles.container}>
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps='handled'
        keyboardOpeningTime={10}
        contentContainerStyle={{flexGrow: 1}}>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Menu')} >
          <View style={{marginTop: 50, marginLeft: 15, width: 35}}>
            <Ionicons name="caret-back-circle-outline" size={30} color="black" />
          </View>

        </TouchableWithoutFeedback>

        {/* First block */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Where is the visit taking place ?</Text>
          <View style={styles.addressInput}>
            <AntDesign name="search1" size={20} style={{marginTop: 17}}/>
            <Autocomplete setAddress={setAddress} isErasingAll={isErasingAll} setIsCity={setIsCity}
              setIsStreetName={setIsStreetName} setIsStreetNumber={setIsStreetNumber} handleSelection={handleSelection}></Autocomplete>
          </View>
          <View style={{marginTop: 4}}>
            {(!isCity || !isStreetName || !isStreetNumber) && <Text style={styles.necessaryInfoText}>Please Provide :</Text>}
            {!isCity && <Text style={styles.necessaryInfoText}>City</Text>}
            {!isStreetName && <Text style={styles.necessaryInfoText}>Street Name</Text>}
            {!isStreetNumber && <Text style={styles.necessaryInfoText}>Street Number</Text>}
          </View>

          <FlatList data={accomodationOption} horizontal={true}
            renderItem={({item}) => (
              <TouchableOpacity style={[styles.accomodationType, {borderColor: accomodationSelected == item.text ? 'blue':'black', backgroundColor: accomodationSelected == item.text ? '#2acced':'white'}]}
                onPressIn={() => handleAccommodationSelected(item.text)} on>

                {item.icon}
                <Text style={styles.accomodationText}> {item.text}</Text>
              </TouchableOpacity>
            )}
          />
        </View>


        {/* Second block */}
        {selectedDate && <View style={styles.section}>
          <Text style={styles.sectionTitle}>When do you need information ?</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => handleTomorrow(1)}>
              {tomorrow && <Text style={[styles.dateOption, {borderColor: isSameDate(selectedDate, tomorrow) ? 'blue':'black'}]} >Tomorrow</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTomorrow(2)}>
              {inTwoDays && <Text style={[styles.dateOption, {borderColor: isSameDate(selectedDate, inTwoDays) ? 'blue':'black'}]}>{dateToString(inTwoDays)}</Text>}
            </TouchableOpacity>

            <View>
              <AntDesign name="calendar" size={45} style={styles.icon} onPress={showDatePicker}/>
              {selectedDate && <Text>{dateToString(selectedDate)} </Text>}
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              date = {inThreeDays}
              display = "inline"
              minimumDate={inThreeDays}
            />

          </View>
        </View>}

        {/* Third Block */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compensation for a visitor (€)</Text>
          <TextInput value={price} onChangeText={(val) => setPrice(val.replace(/[^0-9]/g, ''))} placeholder="20"/>
        </View>

        {/* Fourth Block */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput placeholder="Describe here what you would expect from your trusty" placeholderTextColor={'gray'} value={description} onChangeText={setDescription} multiline></TextInput>
        </View>

      </KeyboardAwareScrollView>

      {selectedDate ? <Footer eraseAll={eraseAll} navigation={navigation} addressInfo={address} date={dateToString(selectedDate)} description={description} price={price}></Footer> : null}
    </View>


  );
}

function Footer(props) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerEraseAll} onPress={props.eraseAll}>
                Erase all
      </Text>
      <TouchableWithoutFeedback onPress={() => {
        console.log(props.addressInfo);
        if (props.addressInfo && props.date && props.price) {
          props.navigation.navigate('PostPreview', {
            post: {
              address: props.addressInfo,
              description: props.description,
              price: props.price,
              timeframe: {
                start: props.date,
                end: props.date,
              },
            },
            isJustPreview: true});
        }
      }}>
        <View style={styles.footerPreview} >
          <MaterialIcons name="preview" size={24} color="black" />
          <Text style={{fontSize: 20, marginLeft: 5}}>Preview</Text>
        </View>
      </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#AEF4DF',
    flex: 1,
  },

  section: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 18,
  },

  sectionTitle: {
    fontSize: 20,
    marginBottom: 20,
  },

  addressInput: {
    padding: 10,
    borderColor: 'solid',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',

  },

  accomodationType: {
    padding: 15,
    borderColor: 'solid',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'column',
    marginRight: 20,
  },

  icon: {
    textAlign: 'center',
  },

  accomodationText: {
    fontSize: 15,
    marginTop: 5,
  },

  dateOption: {
    padding: 15,
    borderColor: 'solid',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'column',
    marginRight: 20,
    height: 50,
  },

  postButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,

  },

  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    height: 90,
    position: 'relative',
    bottom: 0,
    alignItems: 'center',
  },

  footerPreview: {
    flexDirection: 'row',
    backgroundColor: '#FFCB66',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    marginBottom: 20,
  },

  footerEraseAll: {
    marginRight: 20,
    marginBottom: 20,
    fontSize: 20,
    textDecorationLine: 'underline',

  },

  necessaryInfoText: {
    color: 'red',
    fontSize: 10,
  },

});
