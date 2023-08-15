import React, {useState, useEffect} from 'react';
import {Text, ActivityIndicator, Animated,FlatList, View} from 'react-native';

import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import Globals from "../../utils/Globals";
import {AddressItem} from "../../components/Application/AddressItem/View";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {Styles} from "./Styles";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";


export const CheckoutAddress = (props) => {

const [shippinggAddress, setShippinggAddress] = useState(0);

const [addressLoading, setAddressLoading] = useState(true);
const [userAddressList, setUserAddressList] = useState([]);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL+ApiUrls.GET_BY_ADDRESS_ALL_API,{
            headers: {
                userId: props.route.params.userId
            }
        }).then((succResp) =>{
        console.log("addresslist: ",succResp.data);
        setAddressLoading(false);
            setUserAddressList(succResp.data.map((item) => {
                return {...item, spinValue : new Animated.Value(0)};
            }));
            if(succResp.data.length) onAddressItemPress(0)
        },(errorresp) =>{
            console.log("From error")
            console.log((errorresp));
        })
    }, [])

    //Theme based styling and colors
    const {colors} = useTheme();
    const screenStyles = Styles(colors);

    const [addresses, setAddresses] = useState(userAddressList);

    const onAddressItemPress = (index) => {

        setUserAddressList((userAddressList) => {

            userAddressList.map(address => address.isActive = false);

            userAddressList[index].isActive = !userAddressList[index].isActive
            setShippinggAddress(userAddressList[index].address_id)
            return [...userAddressList];
        })

    }

    return (

        <BaseView
            navigation={props.navigation}
            title={"Select Address"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                props.navigation.push(Routes.Add_Address, {
                    userId: props.route.params.userId
                });
            }}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>
                        {addressLoading &&
                              <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                         {!addressLoading && !userAddressList.length && (
                                <View>
                                <Text style = {{
                                     marginTop: hp(30),
                                     textAlign:"center",
                                     fontSize:20,
                                     }}>Add your address to display here</Text>
                                </View>
                                )}
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={screenStyles.listContainer}
                            data={userAddressList}
                            renderItem={({item, index}) => {
                                if (index === 0) {
                                    return <View style={screenStyles.addressFirstItem}>
                                        <AddressItem
                                            showActiveIcon
                                            isActive={item.isActive}
                                            //showAnimatedIcon
                                            item={item}
                                            setUserAddressList = {setUserAddressList}
                                            userId= {props.route.params.userId}
                                            onPress={() => {
                                                onAddressItemPress(index)
                                            }}
                                        />
                                    </View>
                                } else if (index === userAddressList.length - 1) {
                                    return <View style={screenStyles.addressLastItem}>
                                        <AddressItem
                                            showActiveIcon
                                            isActive={item.isActive}
                                            item={item}
                                            setUserAddressList = {setUserAddressList}
                                            userId= {props.route.params.userId}
                                            onPress={() => {
                                                onAddressItemPress(index)
                                            }}
                                        />
                                    </View>
                                } else {
                                    return <AddressItem
                                        showActiveIcon
                                        isActive={item.isActive}
                                        item={item}
                                        setUserAddressList = {setUserAddressList}
                                        userId= {props.route.params.userId}
                                        onPress={() => {
                                            onAddressItemPress(index)
                                        }}
                                    />
                                }

                            }}/>

                        {userAddressList.length !==0 &&
                        <View style={screenStyles.bottomContainer}>
                            <AppButton
                                title={'Next'}
                                onPress={() => {
                                    Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API+props.route.params.orderid, {
                                                  "address_id": shippinggAddress
                                    }).then((succResp) => {
                                        props.navigation.navigate(Routes.CHECKOUT_PAYMENT, {
                                            orderid: succResp.data.order_id,
                                            userId: props.route.params.userId
                                        })
                                    })
                                }}
                            />
                        </View>}
                    </View>

                );
            }}
        />

    );
}
