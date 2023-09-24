import React, { useState, useEffect } from 'react';
import { useColorScheme, View, ActivityIndicator, Image, Text } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BaseView from "../BaseView"
import { Styles } from "./Styles";
import { useTheme } from "@react-navigation/native";
import AppConfig from "../../../branding/App_config";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import FlashMessage from "react-native-flash-message";
import MapViewDirections from 'react-native-maps-directions';
import Axios from 'axios';
import ApiUrls from '../../utils/ApiUrls';

const assets = AppConfig.assets.default;

export const OrderTrack = (props) => {

  //Theme based styling and colors
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const screenStyles = Styles(scheme, colors);

  const [isMapReady, setIsMapReady] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [mapView, setMapView] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0
  });

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
        console.log("ios coords: ", position.coords)
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

  const getUserLocation = () => {
    console.log("address: ",userAddress)
    console.log("order id:", props.route.params.orderId)
    Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ORDER_BY_ID_API+props.route.params.orderId).then((orderResp) => {
      console.log("address id: ",orderResp.data.address_id)
      Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_ADDRESS_ID_API+orderResp.data.address_id).then((addressResp) =>{
        setUserAddress(addressResp.data);
        console.log("address: ",addressResp.data)
      })
    });
  }

  useEffect(() => {
    (async function () {
      //const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
      if (Platform.OS !== "ios") {
        await requestLocationPermission();
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted)
          getUserLocation()
      } else {
        // Call the function to request permission when needed
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          console.log('Location permission granted');
          getUserLocation()
        }

      }
    })();
  }, [])

  return (

    <BaseView
      title={"Track Order"}
      navigation={props.navigation}
      showAppHeader={true}
      headerWithBack={!props.hideBack}
      applyBottomSafeArea
      childView={() => {
        return (
          <>
            <View style={{ height: hp("90%") }}>
              {(userAddress) &&
                (<><MapView
                  region={{
                    latitude: userAddress.lat,
                    longitude: userAddress.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onMapReady={() => setIsMapReady(true)}
                  style={{
                    flex: 1,
                    width: wp("90%"),
                    height: hp("90%"),
                  }}
                  loadingEnabled={true}
                  ref={c => setMapView(c)}
                >
                  <MapViewDirections
                    origin={{
                      latitude: 40.219552,
                      longitude: -74.732861,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    destination={{
                      latitude: userAddress.lat,
                      longitude: userAddress.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    mode='DRIVING'
                    timePrecision='now'
                    apikey={"AIzaSyD9S5rAJ1RNWrG3fHjDKU8m2khTUxcr5u8"}
                    strokeWidth={3}
                    onReady={result => {
                      console.log(`Distance: ${result.distance} km`)
                      console.log(`Duration: ${result.duration} min.`)
                      setDistance(Math.round(result.distance));
                      setDuration(Math.round(result.duration));
                      // mapView.fitToCoordinates(result.coordinates, {
                      //   edgePadding: {
                      //     right: (width / 20),
                      //     bottom: (height / 20),
                      //     left: (width / 20),
                      //     top: (height / 20),
                      //   }
                      // });
                    }}
                  />
                  <Marker coordinate={{
                    latitude: 40.219552,
                    longitude: -74.732861,
                    }} title={"Your order is here"}>
                    <Image
                      source={require("./Assets/car.png")}
                      style={{ height: 65, width: 65 }}
                    />
                  </Marker>
                  <Marker
                    ref={(marker) => {
                      marker = marker;
                    }}
                    coordinate={{
                      latitude: userAddress.lat,
                      longitude: userAddress.lng,
                    }}>
                      <>
                        <View style={{backgroundColor: "#FFF", padding: 10}}>
                          <Text>Delivery in {duration} minutes</Text>
                        </View>
                        {/* <View style={{position:"relative", top:hp("-2%")}}>
                          <Image
                            source={require("./Assets/pin.png")}
                            style={{ height: 30, width: 20, marginLeft:"35%"}}
                          />
                        </View> */}
                      </>
                    </Marker>
                </MapView>
                  <View style={{
                    position: "absolute",
                    bottom: hp("2"),
                    width: wp("80%"),
                    marginHorizontal: wp("5%")
                  }}>
                    <View style={{ position: 'absolute', top: hp("10%") }}><FlashMessage floating={true} position="top" /></View>
                  </View></>)}

              {(!userAddress) && (
                <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>
              )}
            </View>
          </>
        );
      }}

    />
  );
}