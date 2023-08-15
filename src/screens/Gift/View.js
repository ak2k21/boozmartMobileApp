import React, {useState, useEffect} from 'react';
import {FlatList, useColorScheme, View, TouchableOpacity, ScrollView, ImageBackground} from "react-native";

import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import {CartItem} from "../../components/Application/CartItem/View";
import {Divider, Text} from "react-native-elements";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import Config from "../../../branding/boozemart/configuration/Config";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {ReorderItem} from "../../components/Application/ReorderItem/View";
import {FoodItem} from "../../components/Application/FoodItem/View";
import Axios from 'axios';
import ApiUrls from "../../utils/ApiUrls";
import {SearchButton} from "../../components/Application/SearchButton/View";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
//import Video from 'react-native-video';
import * as Keychain from 'react-native-keychain';

export const Gift = (props) => {

const [userId, setUserId] = useState(-1);
const [gift, setGift] = useState([]);
    useEffect(() => {
        GoogleSignin.isSignedIn().then(isSignedIn => {
            if(isSignedIn){
                GoogleSignin.getCurrentUser().then(user => {
                    Axios.get(ApiUrls.SERVICE_URL+ ApiUrls.GET_USER_SERACH_BY_KEYWORD + user.user.email).then((succResp) => {
                         setUserId(succResp.data[0].id)
                    })
                });
            } else {
                Keychain.getGenericPassword().then(credentials => {
                    if (credentials) {
                        setUserId(credentials.username)
                    }
                })
            }
        });
    }, [])

    const [products, setProducts] = useState([]);
        useEffect(() => {
            if(userId != -1){
                Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_BY_PRODUCTS_API, {
                     headers: {
                                  user_id: userId
                              }
                }).then((succResp) =>{
                console.log(succResp.data[0].product_image);
                    setProducts(succResp.data);
                },(errorresp) =>{
                    console.log("From error")
                    console.log(JSON.stringify(errorresp));
                })
                Axios.post(ApiUrls.SERVICE_URL + ApiUrls.FILTER_URL, {
                    "minPrice": 150,
                }, {
                    headers: {
                        userId: userId
                    }
                }).then((succResp) => {
                    setGift(succResp.data);
                }, (errorresp) => {
                    console.log(JSON.stringify(errorresp));
                })
            }
        }, [userId])

    //Theme based styling and colors
    const {colors} = useTheme();
    const scheme = useColorScheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors);

    return (

        <View style={screenStyles.mainContainer}>
            <View style={[screenStyles.flatListContainer]}>
                <BaseView
                    showAppHeader={true}
                    title={"Gift -> 22334, Roswell Street, PA"}
                    headerWithBack={false}
                    applyBottomSafeArea={true}
                    navigation={props.navigation}
                    childView={() => {

                        return (
                            <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={screenStyles.contentContainerStyle}
                            contentInset = {{top: 0, left: 0, bottom: 0, right: 0}}>

                                <View>
                                <ImageBackground source={require("./Assets/gift_background.jpg")} resizeMode="cover" style={screenStyles.searchContainer}>
                                 <SearchButton placeholder="What are you gifting today?"
                                    onPress={() => props.navigation.navigate(Routes.SEARCH)}
                                 />
                                 </ImageBackground>
                                </View>

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={[{}, ...gift]}
                                    numColumns={2}
                                    keyExtractor={(item, index) => {
                                        return item.id||item.product_id;
                                    }}
                                    renderItem={({item, index}) =>
                                        index == 0 ? <View style={screenStyles.giftInspirationContent}>
                                             <Text style={screenStyles.giftInspirationText}>
                                                  Need Some Inspiration? Checkout our frequently gifted drinks.
                                              </Text>
                                             <SvgIcon style={screenStyles.giftInspirationIcon} type={IconNames.Champagne} width={80} height={80}
                                                  color={"#000000"}/>
                                         </View> :
                                         <FoodItem
                                             id={item.product_id}
                                             title={item.product_name}
                                             image={item.Image_Thumb_Nail}
                                             bigImage={item.product_image}
                                             price={item.price}
                                             weight={item.weight}
                                             discount={item.discount}
                                             cartCount={item.cartCount}
                                             isFavourite={item.isFavourite}
                                             detail={item.detail}
                                             review_count={item.review_count}
                                             ratingValue={item.ratingValue}
                                             userid={userId}
                                             cartCountChange={(count) => {
                                             }}
                                             favouriteChange={(favourite) => {
             //                                    if (favourite) {
             //                                        _favouriteSheet.open()
             //                                    }
                                             }}
                                             navigation={props.navigation}
                                         />
                                    }
                                />

{ /*                                <Video source={require("./Assets/gift.mp4")}   // Can be a URL or a localfile.
                                //                                       ref={(ref) => {
                                //                                         this.player = ref
                                //                                       }}                                      // Store reference
                                //                                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                //                                       onEnd={this.onEnd}                      // Callback when playback finishes
                                //                                       onError={this.videoError}               // Callback when video cannot be loaded
                                    resizeMode={"contain"}
                                    repeat={true}
                                    autoplay={true}
                                    paused={false}
                                   style={screenStyles.backgroundVideo} />
*/}
                                <View style={screenStyles.giftInstruction}>
                                    <Text style={screenStyles.giftInstructionHead}>How Does Gifting Work?</Text>

                                    <View style={screenStyles.giftDescText}>
                                        <SvgIcon style={screenStyles.giftDescIcon} type={IconNames.WineBottle} width={50} height={50}
                                             color={colors.subHeadingColor}/>
                                        <Text style={screenStyles.giftDescTextContent}>
                                            <Text style={screenStyles.giftDescHead}>You pick the items. </Text>
                                            <Text style={screenStyles.giftDescContent}>We have got literally thousands of drink possibilities. You can also write a note and pick out a digital card.</Text>
                                        </Text>
                                    </View>

                                    <View style={screenStyles.giftDescText}>
                                        <SvgIcon style={screenStyles.giftDescIcon} type={IconNames.CalendarAlt} width={50} height={50}
                                            color={colors.subHeadingColor}/>
                                        <Text style={screenStyles.giftDescTextContent}>
                                            <Text style={screenStyles.giftDescHead}>The recipient schedules the delivery. </Text>
                                            <Text style={screenStyles.giftDescContent}>The recipient will choose a time when they will be at home, but we will keep the items a surprise.</Text>
                                        </Text>
                                    </View>

                                    <View style={screenStyles.giftDescText}>
                                        <SvgIcon style={screenStyles.giftDescIcon} type={IconNames.Gift} width={50} height={50}
                                            color={colors.subHeadingColor}/>
                                        <Text style={screenStyles.giftDescTextContent}>
                                            <Text style={screenStyles.giftDescHead}>The gift gets delivered. </Text>
                                            <Text style={screenStyles.giftDescContent}>The gift is delivered at the scheduled time. FYI, the recipient will need to show a valid ID.</Text>
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate(Routes.POPULAR_DEALS, {userid:userId, title: "Frequently Gifted"});
                                }}>
                                    <View style={screenStyles.sectionHeading}>
                                        <Text style={screenStyles.sectionHeadingText}>Frequently Gifted</Text>
                                        <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                                 color={colors.subHeadingColor}/>
                                    </View>
                                </TouchableOpacity>

                                <View style={screenStyles.categoriesContainer}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={products}
                                        keyExtractor={(item, index) => {
                                            return item.id;
                                        }}
                                        renderItem={({item}) =>
                                            <View style={screenStyles.categoryItem}>
                                                <ReorderItem
                                                    navigation={props.navigation}
                                                    secondaryTitle={item.price}
                                                    ratingValue={item.ratingValue}
                                                    secondaryColor={item.secondaryColor}
                                                    primaryTitle={item.product_name}
                                                    primaryColor={item.primaryColor}
                                                    iconBgColor={item.iconBgColor}
                                                    iconURI={item.iconURI}
                                                    bgURI={item.bgURI}
                                                    img={item.product_image}
                                                    item={item}
                                                    id={item.product_id}
                                                    userid={userId}
                                                />
                                            </View>
                                        }
                                    />
                                </View>

                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate(Routes.POPULAR_DEALS, {userid:userId, title: "Similar buys"});
                                }}>
                                    <View style={screenStyles.sectionHeading}>
                                        <Text style={screenStyles.sectionHeadingText}>Customers also viewed</Text>
                                        <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                                 color={colors.subHeadingColor}/>
                                    </View>
                                </TouchableOpacity>

                                <View style={screenStyles.categoriesContainer}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={products}
                                        keyExtractor={(item, index) => {
                                            return item.id;
                                        }}
                                        renderItem={({item}) =>
                                            <View style={screenStyles.categoryItem}>
                                                <ReorderItem
                                                    navigation={props.navigation}
                                                    secondaryTitle={item.price}
                                                    ratingValue={item.ratingValue}
                                                    secondaryColor={item.secondaryColor}
                                                    primaryTitle={item.product_name}
                                                    primaryColor={item.primaryColor}
                                                    iconBgColor={item.iconBgColor}
                                                    iconURI={item.iconURI}
                                                    bgURI={item.bgURI}
                                                    img={item.product_image}
                                                    item={item}
                                                    id={item.product_id}
                                                    userid={userId}
                                                />
                                            </View>
                                        }
                                    />
                                </View>

                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate(Routes.POPULAR_DEALS, {userid:userId, title: "Few more you might like"});
                                }}>
                                    <View style={screenStyles.sectionHeading}>
                                        <Text style={screenStyles.sectionHeadingText}>View more</Text>
                                        <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                                 color={colors.subHeadingColor}/>
                                    </View>
                                </TouchableOpacity>

                                <View style={screenStyles.categoriesContainer}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={products}
                                        keyExtractor={(item, index) => {
                                            return item.id;
                                        }}
                                        renderItem={({item}) =>
                                            <View style={screenStyles.categoryItem}>
                                                <ReorderItem
                                                    navigation={props.navigation}
                                                    secondaryTitle={item.price}
                                                    ratingValue={item.ratingValue}
                                                    secondaryColor={item.secondaryColor}
                                                    primaryTitle={item.product_name}
                                                    primaryColor={item.primaryColor}
                                                    iconBgColor={item.iconBgColor}
                                                    iconURI={item.iconURI}
                                                    bgURI={item.bgURI}
                                                    img={item.product_image}
                                                    item={item}
                                                    id={item.product_id}
                                                    userid={userId}
                                                />
                                            </View>
                                        }
                                    />
                                </View>

                            </ScrollView>
                        );

                    }}
                />
            </View>
        </View>
    )
}
