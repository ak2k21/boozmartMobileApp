import React, {useState, useEffect} from "react";
import {Text, ActivityIndicator, Animated, FlatList, View} from "react-native";

import BaseView from "../BaseView";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import Routes from "../../navigation/Routes";
import Globals from "../../utils/Globals";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {CardItem} from "../../components/Application/CardItem/View";
import AppButton from "../../components/Application/AppButton/View";
import Styles from "./Styles";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';

export const CheckoutSelectCard = (props) => {

    //Internal states
    const [creditcardsLoading, setCreditcardsLoading] = useState(true);
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL+ApiUrls.GET_CREDIT_CARD_BY_USER_ID_API+props.route.params.userId).then((succResp) =>{
            setCreditcardsLoading(false);
            setCardsData(succResp.data.map((item) => {
             return {...item, spinValue : new Animated.Value(0)};
           }));
           if(succResp.data.length) onCardItemPress(0)
        },(errorresp) =>{
            console.log((errorresp));
        })
    }, [])

    const onCardItemPress = (index) => {
        setCardsData((cardsData) => {

            cardsData.map(card => card.isActive = false);

            cardsData[index].isActive = !cardsData[index].isActive;
            return [...cardsData];
        });


    };

    return (

        <BaseView
            navigation={props.navigation}
            title={"Select a Card"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                props.navigation.push(Routes.ADD_CREDIT_CARD, {
                    userId: props.route.params.userId
                })
            }}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={Styles.container}>
                    {creditcardsLoading &&
                              <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                            {!creditcardsLoading && !cardsData.length && (
                                <View>
                                <Text style = {{
                                     marginTop: hp(35),
                                     textAlign:"center",
                                     fontSize:20,
                                     }}>Add your credit cards to select</Text>
                                </View>
                                )}
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={cardsData}
                            style={Styles.listContainer}
                            renderItem={({item, index}) => {

                                if (index === 0) {
                                    return (
                                        <View style={Styles.cardFirstItem}>
                                            <CardItem
                                                showActiveIcon
                                                isActive={item.isActive}
                                                item={item}
                                                onPress={() => {
                                                    onCardItemPress(index);
                                                }}/>
                                        </View>
                                    );
                                } else if (index === cardsData.length - 1) {
                                    return (
                                        <View style={Styles.cardLastItem}>
                                            <CardItem
                                                showActiveIcon
                                                isActive={item.isActive}
                                                item={item}
                                                onPress={() => {
                                                    onCardItemPress(index);
                                                }}/>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <CardItem
                                            showActiveIcon
                                            isActive={item.isActive}
                                            item={item}
                                            onPress={() => {
                                                onCardItemPress(index);
                                            }}/>
                                    );
                                }


                            }}
                        />
                        {(cardsData.length !==0) && <View style={Styles.bottomContainer}>
                            <AppButton
                                title={"Next"}
                                onPress={() => {
                                    Axios.put(ApiUrls.SERVICE_URL + ApiUrls.PUT_ORDER_BY_ID_API+props.route.params.orderid, {
                                              "creditCardId": cardsData.filter((card) => {if(card.isActive) return card})[0].id
                                    }).then((succResp) => {
                                        props.navigation.navigate(Routes.CART_SUMMARY, {
                                            orderId: props.route.params.orderid,
                                            userId: props.route.params.userId
                                        });
                                    })
                                }}
                            />

                        </View>}

                    </View>


                );
            }}
        />

    );

};
