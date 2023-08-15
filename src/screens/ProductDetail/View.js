import React, {useRef, useState} from "react";
import {Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View,} from "react-native";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Text} from 'react-native-elements';
import Routes from "../../navigation/Routes";
import {Styles} from "./Styles";
import AppHeader from "../../components/Application/AppHeader/View";
import {Counter} from "../../components/Global/Counter/View"
import StarRating from "react-native-star-rating";
//import {FavouritesBottomSheet} from "../../components/Application/FavouritesBottomSheet/View";
import RBSheet from "react-native-raw-bottom-sheet";
import ReadMore from "@fawazahmed/react-native-read-more";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import {FocusAwareStatusBar} from "../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';

export const ProductDetail = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);

    //Internal states
    const [isFavourite, setIsFavourite] = useState(props.route.params && props.route.params.item && props.route.params.item.isFavourite);

    //References
    let sheetRef = useRef();

    //Props
    const {
        item, userid
    } = props.route.params


    return (
        <View style={screenStyles.container}>
            <FocusAwareStatusBar translucent backgroundColor={"transparent"} barStyle="dark-content"/>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: hp("3")}}>

                <View style={{...screenStyles.imageContainer, backgroundColor: "#fff"}}>
                    <Image
                        source={{uri: (item.bigImage||item.product_image)}}
                        resizeMode={"cover"}
                        style={screenStyles.mainImage}
                    />


                    <AppHeader
                        navigation={props.navigation}
                        transparentHeader
                        headerWithBack
                        darkIcons
                        title={" "}
                    />
                </View>

                <View style={screenStyles.bottomContainerMain}>


                    <View style={screenStyles.bottomContainerUpper}>

                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={screenStyles.infoContainer}>
                                <Text style={screenStyles.priceText}>$ {item.price}</Text>
                                <View style={screenStyles.favouriteContainer}>

                                    <TouchableOpacity onPress={() => {
                                        setIsFavourite((isFavourite) => {
                                            if(!isFavourite)
                                                Axios.post(ApiUrls.SERVICE_URL+ ApiUrls.POST_ADD_FAVOUITES_API,{
                                                  "fav_id": 0,
                                                  "user_id": item.userId||userid,
                                                  "prod_id": item.id||item.product_id
                                                })
                                            else
                                                Axios.delete(ApiUrls.SERVICE_URL+ApiUrls.DELETE_FAVOUITES_BY_USERID_AND_PRODUCTID_API,{
                                                   data:{ "user_id": item.userId||userid,
                                                    "prod_id": item.id||item.product_id
                                                    }
                                                })
//                                            if (!isFavourite) {
//                                                sheetRef.open()
//                                            }
                                            return !isFavourite
                                        });

                                    }}>

                                        <SvgIcon
                                            type={isFavourite ? IconNames.HeartFilled : IconNames.Heart} width={20}
                                            height={20} color={isFavourite ? colors.heartFilled : colors.heartEmpty}/>

                                    </TouchableOpacity>

                                </View>
                            </View>


                            <Text style={screenStyles.nameText}>{item.title||item.product_name}</Text>
                            <Text style={screenStyles.weightText}>{item.weight}</Text>


                            <TouchableWithoutFeedback onPress={() => {
                                props.navigation.navigate(Routes.REVIEW_LIST)
                            }}>

                                <View style={screenStyles.ratingContainer}>
                                    <Text style={screenStyles.ratingText}>{item.ratingValue}</Text>


                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={item.ratingValue}
                                        starSize={hp(2)}
                                        fullStarColor={colors.ratingActiveColor}
                                        emptyStarColor={colors.ratingInActiveColor}
                                        selectedStar={(rating) => {
                                        }}
                                        containerStyle={{
                                            marginHorizontal: wp("1")
                                        }}
                                    />
                                    {props.review_count && <View style={{flexDirection: "row"}}>
                                        <Text style={screenStyles.reviewText}>[</Text>
                                        <Text style={screenStyles.reviewText}>{props.review_count} reviews</Text>
                                        <Text style={screenStyles.reviewText}>]</Text>
                                    </View>}

                                </View>

                            </TouchableWithoutFeedback>

                            <ReadMore
                                seeMoreText={"more"}
                                seeLessText={"less"}
                                seeMoreStyle={screenStyles.seeMoreStyle}
                                seeLessStyle={screenStyles.seeMoreStyle}
                                numberOfLines={3}
                                style={screenStyles.detailText}>
                                {item.detail}
                            </ReadMore>


                        </ScrollView>


                    </View>

                    <View style={screenStyles.bottomContainerLower}>
                        <View style={screenStyles.cartCounterContainer}>
                            <Text style={screenStyles.cartCounterText}>ADD/REMOVE FROM CART</Text>
                            <Counter product_id={item.id||item.product_id} cartCount={item.cartCount} userId={item.userId||userid}/>

                        </View>

                       {/* <AppButton
                            title={'Add to Cart'}
                            onPress={() => {


                            }}
                        />*/}

                    </View>

                </View>

            </ScrollView>

           {/* <RBSheet
                ref={ref => {
                    sheetRef = ref;
                }}
                height={hp(42)}
            >

                <FavouritesBottomSheet
                    onItemSelect={() => {
                        sheetRef.close()
                    }}
                />

            </RBSheet>*/}


        </View>
    );


}
