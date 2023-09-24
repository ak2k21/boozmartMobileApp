import React, { useState, useEffect } from 'react';
import { useColorScheme, View, Text, ActivityIndicator, ImageBackground } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BaseView from "../BaseView"
import { Styles } from "./Styles";
import { CommonActions, useTheme } from "@react-navigation/native";
import AppConfig from "../../../branding/App_config";
import AppButton from "../../components/Application/AppButton/View";
import { PermissionsAndroid } from 'react-native';
import Routes from "../../navigation/Routes";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Globals from '../../utils/Globals';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const assets = AppConfig.assets.default;

export const AddressCheck = (props) => {

  //Theme based styling and colors
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const fonts = AppConfig.fonts.default;
  const Typography = AppConfig.typography.default;
  const screenStyles = Styles(scheme, colors);
  const [address, setAddress] = useState("")
  const [isMapReady, setIsMapReady] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [message, setMessage] = useState("")

  const GooglePlacesInput = () => {
    return (
      <View style={{
        position: "absolute",
        top: hp("10%"),
        zIndex: 3, // works on ios
        elevation: 3, // works on android,
        width: wp("80%"),
        marginLeft: wp("9%"),
        display: "flex",
        justifyContent: "center",
      }}>
        <GooglePlacesAutocomplete
          placeholder={address || 'Please enter your address'}
          currentLocation={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setGeolocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            });
            setAddress(details.formatted_address)
            if (details.address_components.filter(item => item.types.includes('postal_code')).length) {
              setZipCode(details.address_components.filter(item => item.types.includes('postal_code'))[0].short_name)
              try {
                if (Globals.newJerseyTrentonZipcodes.map(item => item["post code"]).includes(details.address_components.filter(item => item.types.includes('postal_code'))[0].short_name)) {
                  setMessage("Yay! We deliver to your location. Please continue to browse through our catalog.")
                } else {
                  setMessage("Sorry! We are currently unavailable at your location. Contact us on ###-##-#### for further details.")
                }
              } catch (err) {
                setMessage("Sorry! We are currently unavailable at your location. Contact us on ###-##-#### for further details.")
              }
            }
          }}
          fetchDetails={true}
          query={{
            key: 'AIzaSyD9S5rAJ1RNWrG3fHjDKU8m2khTUxcr5u8',
            language: 'en',
            components: 'country:us',
          }}
        />
      </View>
    );
  };
  const requestLocationPermission = async () => {

    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Boozemart2 App needs access to your Location' +
            'so you can pin your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.warn(err)
    }
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeolocation({ latitude, longitude });
      },
      (error) => {
        console.log("ios coords error", error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000
      }
    );
  };

  useEffect(() => {
    (async function () {
      //const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
      if (Platform.OS !== "ios") {
        await requestLocationPermission();
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted) {
          console.log("location access granted")
          getCurrentPosition()
        }
        else {
          console.log("location permission denied")
        }
      } else {
        // Call the function to request permission when needed
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentPosition()
        }
        else {
          console.log("location permission denied")
        }
      }
    })();
  }, [])

  return (
    <>
        <ImageBackground source={require("../../screens/Variant3/LoginForm/Assets/login-wallpaper-2.jpg")}>
            <View
              style={{
                height: hp("100%")
              }}>
              <View style={{ position: "relative", height: hp("100%") }}>

              {(geolocation.latitude != 0 && geolocation.longitude != 0) && (
                <View style={{ }}>
                  {/* <Text style={{
                    zIndex:3,
                    elevation:3,
                    top: hp("5%"),
                    position: "absolute",
                    textAlign: 'center',
                    color: '#000',
                    fontFamily: fonts.RUBIK_REGULAR,
                    fontSize: Typography.P4,
                    display: "flex",
                    justifyContent: "center",
                    width: wp("90%")
                  }}>{"Please select your address to explore"}</Text> */}
                  <GooglePlacesInput />

                  <MapView
                    region={{
                      latitude: geolocation.latitude,
                      longitude: geolocation.longitude,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.01,
                    }}
                    style={{
                      width: wp("100%"),
                      height: hp("100%"),
                    }}
                    loadingEnabled={true}
                  >
                    <Marker
                      ref={(marker) => {
                        marker = marker;
                      }}
                      coordinate={{
                        latitude: geolocation.latitude,
                        longitude: geolocation.longitude,
                      }}
                    />
                  </MapView>

                  {message && <Text style={{
                    top: hp("20%"),
                    position: "absolute",
                    textAlign: 'center',
                    color: !message.includes('Yay')?colors.activeColor:"#000",
                    fontWeight: 'bold',
                    marginLeft: wp("5%"),
                    zIndex: 2,
                    elevation:2,
                    backgroundColor: "#fff",
                    padding: wp("2%")
                  }}>{message}</Text>}

                  {/* <Text style={{
                    top: hp("35%"),
                    position: "absolute",
                    textAlign: 'center',
                    color: colors.primaryBackground,
                    fontWeight: 'bold',
                    marginLeft: wp("5%"),
                    zIndex: 2,
                    elevation:2
                  }}>
                      While some studies suggest that moderate alcohol consumption may have certain health benefits, excessive or heavy drinking can lead to a wide range of health problems, including liver disease, heart issues, and addiction.

                      Never drink and drive. Alcohol impairs your ability to operate a vehicle safely and is a leading cause of accidents and fatalities on the road.
                  </Text> */}
                </View>
                
                )}

                {(geolocation.latitude == 0 && geolocation.longitude == 0) && (
                      <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>
                    )}

                {!message && (<View style={{
                  position: "absolute",
                  bottom: hp("10"),
                  width: wp("80%"),
                  marginHorizontal: wp("7%"),
                  zIndex: 1,
                    elevation: 1
                }}>
                  <AppButton
                    title={"Back"}
                    onPress={() => {
                      props.navigation.navigate(Routes.LOGIN_FORM_SCREEN3)
                    }}
                  />
                </View>)}
                {message && (<View style={{
                  position: "absolute",
                  bottom: hp("10"),
                  width: wp("80%"),
                  marginHorizontal: wp("7%"),
                  zIndex: 1,
                    elevation: 1
                }}>
                  <AppButton
                    title={"Home"}
                    onPress={() => {
                      props.navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: Routes.HOME_VARIANT3 }]
                        })
                      );
                    }}
                  />
                </View>)}
              </View>
            </View>
      </ImageBackground>
    </>
  );
}
