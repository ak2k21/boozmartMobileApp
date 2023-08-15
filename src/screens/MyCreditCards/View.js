import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Text, FlatList, TouchableOpacity, Animated,ScrollView, useColorScheme, View} from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import {Styles} from "./Styles";
import AppButton from "../../components/Application/AppButton/View";
import Globals from "../../utils/Globals";
import {CardItem} from "../../components/Application/CardItem/View";
import {useTheme} from "@react-navigation/native";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {CardContentItem} from "../../components/Application/CardContentItem/View";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const MyCreditCards = (props) => {

const [creditcardsLoading, setCreditcardsLoading] = useState(true);
const [mycreditcards, setMycreditcards] = useState([]);

    useEffect(() => {
    console.log("Error");
        Axios.get(ApiUrls.SERVICE_URL+ApiUrls.GET_CREDIT_CARD_BY_USER_ID_API + props.route.params.userid).then((succResp) =>{
        console.log("orderlist: ",succResp.data);
        setCreditcardsLoading(false);
            setMycreditcards(succResp.data.map((item) => {
             return {...item, spinValue : new Animated.Value(0)};
           }));
        },(errorresp) =>{
            console.log("From error")
            console.log((errorresp));
        })
    }, [])

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);

    //Internal states
    const [activeSections, setActiveSections] = useState([]);

    const renderCreditCardsHeader = (section, index, isActive) => {
         return <TouchableOpacity style={{height: hp("15.5%")}}
              onPress={() => {
              props.navigation.navigate(Routes.UPDATE_CREDIT_CARD, {
              creditcards: section,
              userId: props.route.params.userid
              });
         }}>
        <View>
        <CardItem
                isTouchable={false}
                showAnimatedIcon
                isActive={isActive}
                item={section}
                setMycreditcards = {setMycreditcards}
                userId= {props.route.params.userid}
            />
        </View>
        </TouchableOpacity>
    };

    const renderCreditCardsContent = section => {
        return <CardContentItem data={section}/>
    };

    const _updateSections = allActiveSections => {
        setActiveSections(allActiveSections)
    };

    return (

        <BaseView
            navigation={props.navigation}
            title={"Credit Cards"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                props.navigation.push(Routes.ADD_CREDIT_CARD, {
                    userId: props.route.params.userid
                })
            }}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>

                        <ScrollView showsVerticalScrollIndicator={false} style={screenStyles.scrollViewContainer}>
                        {creditcardsLoading &&
                              <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                            {!creditcardsLoading && !mycreditcards.length && (
                                <View>
                                <Text style = {{
                                     marginTop: hp(40),
                                     textAlign:"center",
                                     fontSize:20,
                                     }}>Add your credit cards</Text>
                                </View>
                                )}
                                <View style={{
                                    marginTop: hp("3")
                                }}>
                                    <FlatList
                                           showsVerticalScrollIndicator={false}
                                           data={mycreditcards}
                                           renderItem={({item, index}) => {
                                                   return renderCreditCardsHeader(item, index)
                                           }}
                                          />
                                </View>
                        </ScrollView>

                        {/*<View style={screenStyles.bottomContainer}>
                            <AppButton
                                title={'Save Settings'}
                                onPress={() => {
                                    props.navigation.goBack()
                                }}
                            />

                        </View>*/}

                    </View>


                );
            }}
        />

    );
}
