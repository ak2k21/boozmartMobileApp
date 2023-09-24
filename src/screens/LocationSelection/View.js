import React, { useState, useEffect } from 'react';
import { useColorScheme, View, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BaseView from "../BaseView"
import { Styles } from "./Styles";
import { CommonActions, useTheme } from "@react-navigation/native";
import AppConfig from "../../../branding/App_config";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AppButton from "../../components/Application/AppButton/View";
import { PermissionsAndroid } from 'react-native';
import Routes from "../../navigation/Routes";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import * as Location from 'expo-location';
// import Globals from '../../utils/Globals';
const assets = AppConfig.assets.default;

export const LocationSelection = (props) => {

  //Theme based styling and colors
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const screenStyles = Styles(scheme, colors);
  const [address, setAddress] = useState("")
  const [isMapReady, setIsMapReady] = useState(false);
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0
  });

  const GooglePlacesInput = () => {
    return (
      <View style={{
        position: "absolute",
        top: hp("2%"),
        zIndex: 3, // works on ios
        elevation: 3, // works on android,
        width: wp("80%"),
        marginLeft: wp("5%")
      }}>
        <GooglePlacesAutocomplete
          placeholder={address || 'Search'}
          currentLocation={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log("**************data*********: ", data);
            console.log("******************details**************:", details);
            setGeolocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            });
            setAddress(details.formatted_address)
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
        if (position) {
          const { latitude, longitude } = position.coords;
          console.log("ios coords: ", position.coords)
          setGeolocation({ latitude, longitude });
        }
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
    if (props.route.params.navigatedFrom === "updateaddress")
      Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ADDRESS_ID_API + props.route.params.addressid, {
        headers: {
          userId: props.route.params.userId
        }
      }).then((succResp) => {
        if (succResp.data.lat)
          setGeolocation({ latitude: Number.parseFloat(succResp.data.lat), longitude: Number.parseFloat(succResp.data.lng) })
      }, (errorresp) => {
        console.log("From error")
        console.log((errorresp));
      })
  }, [])

  useEffect(() => {
    (async function () {
      //const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
      if (Platform.OS !== "ios") {
        await requestLocationPermission();
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted && props.route.params.navigatedFrom === "addaddress")
          getCurrentPosition()
      } else {
        // Call the function to request permission when needed
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED && props.route.params.navigatedFrom === "addaddress") {
          console.log('Location permission granted');
          getCurrentPosition()
        }

      }
    })();
  }, [])

  return (

    <BaseView
      title={"Location"}
      navigation={props.navigation}
      showAppHeader={true}
      headerWithBack={!props.hideBack}
      applyBottomSafeArea
      childView={() => {
        return (
          <>
            <View style={{ height: hp("90%") }}>
              {(geolocation.latitude != 0 && geolocation.longitude != 0) &&
                (<>
                  <GooglePlacesInput />
                  <MapView
                    region={{
                      latitude: geolocation.latitude,
                      longitude: geolocation.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    onMapReady={() => setIsMapReady(true)}
                    style={{
                      flex: 1,
                      marginLeft: wp("-5%"),
                      width: wp("100%"),
                      height: hp("90%"),
                    }}
                    loadingEnabled={true}
                  >

                    <Marker.Animated
                      draggable
                      onDragEnd={(e) => {
                        console.log(e.nativeEvent);
                        setGeolocation(e.nativeEvent.coordinate)
                      }
                      }

                      ref={(marker) => {
                        marker = marker;
                      }}
                      coordinate={{
                        latitude: geolocation.latitude,
                        longitude: geolocation.longitude,
                      }}

                    />

                  </MapView>
                  <View style={{
                    position: "absolute",
                    bottom: hp("2"),
                    width: wp("90%"),
                    marginHorizontal: wp("2%")
                  }}>
                    <View style={{ position: 'absolute', top: hp("10%") }}><FlashMessage floating={true} position="top" /></View>

                    <View style={{
                      position: 'absolute',
                      bottom: hp("10%")
                    }}>
                      <AppButton
                        title={"Confirm Location"}
                        onPress={() => {
                          showMessage({
                            message: "Address has been updated ",
                            type: "danger",
                          });
                          setTimeout(() => {
                            Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ADDRESS_ID_API + props.route.params.addressid, {
                              "lat": geolocation.latitude,
                              "lng": geolocation.longitude
                            })
                            if (props.route?.params?.orderId) {
                              props.navigation.push(Routes.CHECKOUT_ADDRESS, {
                                orderid: props.route.params.orderId,
                                userId: props.route.params.userId
                              })
                            } else {
                              props.navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [{
                                    name: Routes.My_Address, params: {
                                      userid: props.route.params.userId
                                    }
                                  }]
                                })
                              );
                            }
                          }, 2000)
                        }}
                      />
                    </View>
                  </View></>)}

              {(geolocation.latitude == 0 && geolocation.longitude == 0) && (
                <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>
              )}
            </View>
          </>
        );
      }}

    />
  );
}

/*

Location.reverseGeocodeAsync(geolocation).then((resp) => {
                            if(Globals.newJerseyTrentonZipcodes.map(item => item["post code"]).indexOf(resp.data[0].postalCode) != -1){
                              Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ADDRESS_ID_API + props.route.params.addressid, {
                                "lat": geolocation.latitude,
                                "lng": geolocation.longitude
                              }).then(() =>{
                                showMessage({
                                  message: "Address has been updated.",
                                  type: "danger",
                                });
                              }, () => {
                                showMessage({
                                  message: "There has been an error updating the address. Please try again later.",
                                  type: "danger",
                                });
                              })
                              
                              setTimeout(() => {

                                    if(props.route.params.orderId){
                                      props.navigation.navigate(Routes.CHECKOUT_ADDRESS, {
                                        orderid: props.route.params.orderId,
                                        userId: props.route.params.userId
                                      })
                                    }else {
                                      props.navigation.push(Routes.My_Address, {
                                        userid: props.route.params.userId
                                      })
                                    }
                                  }, 2000)
                            } else {
                              showMessage({
                                message: "Currently, this location is not servicable, please select a different location.",
                                type: "danger",
                              });
                            }
                          })

*/