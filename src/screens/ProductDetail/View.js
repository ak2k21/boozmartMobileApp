import React, {useEffect, useRef, useState} from "react";
import {Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View, Dimensions, Modal, ActivityIndicator, FlatList } from "react-native";
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
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import {FocusAwareStatusBar} from "../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import ImageZoom from 'react-native-image-pan-zoom';
import { ReorderItem } from "../../components/Application/ReorderItem/View";
import Close from "./Assets/close.svg"
import {commonDarkStyles} from "../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../branding/Boozemart2/styles/light/Style";
import AppConfig from "../../../branding/App_config";
import { useSelector } from "react-redux";

export const ProductDetail = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const fonts = AppConfig.fonts.default;
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    //Internal states
    const [isFavourite, setIsFavourite] = useState(props.route?.params?.item?.isFavourite);
    const [modalVisible, setModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    //References
    let sheetRef = useRef();

    //Props
    const {
        userid
    } = props.route.params

    const item = props.route.params.item
    const defaultAddress = useSelector(state => {
        return state.commonStore.userInfo.defaultAddress
    })

    const showAddToCartNotification = (message) => {
        showMessage({
            message: message,
            type: "danger",
        });
    }

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PRODUCTS_BY_CATEGORY_API+item.cat_id+"?items_per_page=24&page_number=1", {
            headers: {
                user_id: props.route.params.userid
            }
         }).then((succResp) =>{
                setProducts(succResp.data);
            },(errorresp) =>{
                console.log("From error")
                console.log(JSON.stringify(errorresp));
            })
    },[])

    return (
        <View style={screenStyles.container}>
            <FocusAwareStatusBar translucent backgroundColor={"transparent"} barStyle="dark-content"/>
            <FlashMessage floating={true} position="top" />
            {(props.route?.params?.item?.navigatedFrom == 'home') && <View style={{
                position:"absolute",
                zIndex: 3,
                elevation: 3,
                top: hp("6.8%"),
                left: wp("3%")
            }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.push(Routes.HOME_VARIANT3)
                }}>
                    <SvgIcon type={IconNames.ArrowLeft} width={25} height={25} color={"#000"}/>
                </TouchableOpacity>
            </View>}
            {defaultAddress.state && <Text style={{fontFamily: fonts.RUBIK_REGULAR,
                    color: colors.headingColor, marginBottom: 5, 
                    textAlign: 'center', justifyContent: 'center', 
                    paddingTop: hp("2%"), fontWeight: "bold",
                    marginHorizontal: wp("10%"), display: "flex",
                    fontSize: 15, marginTop: hp("2%"), width: wp("80%"),
                    position: "absolute", backgroundColor: "#FFF",
                    zIndex: 2, elevation: 2,top: hp("3"), height: hp("6%"), 
                    shadowColor: 'transparent',
                }} 
                    numberOfLines={1}>{(defaultAddress.city || "") + " " + (defaultAddress.society || "") + " " + (defaultAddress.state || "") + " " + (defaultAddress.pincode || "")}
            </Text>}
            <View style={{...screenStyles.imageContainer, backgroundColor: "#fff", position:"relative", marginBottom: hp("3")}}>
                <TouchableWithoutFeedback 
                    onPress={() => {
                            setModalVisible(!modalVisible)
                    }}>
                        <ImageZoom cropWidth={wp("100%")}
                            cropHeight={hp("42%")}
                            imageHeight={hp("47%")}
                            imageWidth={wp("100%")}>
                            <Image
                                source={{uri: (item.bigImage||item.product_image)}}
                                resizeMode={"cover"}
                                style={screenStyles.mainImage}
                            />
                        </ImageZoom>
                </TouchableWithoutFeedback>
                {(props.route?.params?.item?.navigatedFrom != 'home') && <AppHeader
                    navigation={props.navigation}
                    transparentHeader
                    headerWithBack
                    darkIcons
                    title={" "}
                />}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={screenStyles.bottomContainerMain}>
                    <View style={screenStyles.bottomContainerUpper}>
                        <View style={screenStyles.infoContainer}>
                            {/* <Text style={screenStyles.priceText}>$ {item.price}</Text> */}
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
                        {/* <Text style={screenStyles.weightText}>{item.weight}</Text> */}

                        <TouchableWithoutFeedback onPress={() => {
                            props.navigation.navigate(Routes.REVIEW_LIST)
                        }}>
                            <View style={screenStyles.ratingContainer}>
                                <Text style={screenStyles.ratingText}>{parseFloat(item.ratingValue).toFixed(1)}</Text>
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
                            numberOfLines={2}
                            style={screenStyles.detailText}>
                            {item.detail}
                        </ReadMore>

                        <View style={{display: "flex", gap: hp("1%"), marginTop: hp("2%")}}>
                            <View style={{display: "flex", gap: wp("2%"),flexDirection:"row"}}>
                                <View style={{display: "flex", flexDirection: "row", gap: wp("2%"), flexBasis:wp("40%")}}>
                                    <Text style={{fontWeight: "bold"}}>Region</Text>
                                    <Text>{item.region}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", gap: wp("2%"), flexBasis:wp("40%")}}>
                                    <Text style={{fontWeight: "bold"}}>Brand</Text>
                                    <Text>{item.brand2}</Text>
                                </View>
                            </View>
                            <View style={{display: "flex", gap: wp("2%"), flexDirection:"row"}}>
                                <View style={{display: "flex", flexDirection: "row", gap: wp("2%"), flexBasis:wp("40%")}}>
                                    <Text style={{fontWeight: "bold"}}>Category</Text>
                                    <Text>{item.type_Brand}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", gap: wp("2%"), flexBasis:wp("40%")}}>
                                    <Text style={{fontWeight: "bold"}}>ABV</Text>
                                    <Text>{item.ABV}</Text>
                                </View>
                            </View>
                            <View style={{display: "flex", flexDirection: "row", gap: wp("2%"), flexBasis:wp("40%")}}>
                                <Text style={{fontWeight: "bold"}}>Taste</Text>
                                <Text>{item.taste}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{...screenStyles.bottomContainerLower, height: viewMore? hp("25%"): ((Array.isArray(item.VARIENTS) && item.VARIENTS?.length >= 2) ? hp("13%"): hp("6%")), overflow: "hidden"}}>
                        {Array.isArray(item.VARIENTS) && item.VARIENTS?.map((variant, index) => {
                            return (
                                <View style={{...screenStyles.cartCounterContainer}}>
                                    <View style={{flexDirection: "row", marginLeft: hp("2%")}}>
                                        <Text style={{...screenStyles.cartCounterText, minWidth: wp("15%")}}>{variant.quantity}</Text>
                                        <Text style={screenStyles.cartCounterText}>- </Text>
                                        <Text style={{...screenStyles.cartCounterText, marginHorizontal: wp("2&"), 
                                            color: colors.activeColor}}>${variant.base_price}</Text>
                                        {variant.Deals?.deal_price && <><Text style={{...screenStyles.cartCounterText, 
                                            textDecorationLine: "line-through",
                                            marginHorizontal: wp("0.5%"),
                                            textDecorationColor: colors.subHeadingColor}}>(${parseFloat(variant.base_mrp).toFixed(2)})</Text>
                                        <Text style={{...screenStyles.cartCounterText,
                                            marginHorizontal: wp("0.5%")}}>({variant.Deals?.deal_price}%)</Text>
                                        </>}
                                    </View>
                                    <Counter isGift={props.route?.params?.item?.isGift} product_id={variant.product_id}  spacing={hp("4%")} varient_id={variant.varient_id}
                                        cartCount={variant.total_count} userId={item.userId||userid} action={showAddToCartNotification}/>
                                </View>
                            )
                        })}
                        
                       {/* <AppButton
                            title={'Add to Cart'}
                            onPress={() => {


                            }}
                        />*/}
                    </View>
                    {(item.VARIENTS?.length > 2) && <TouchableOpacity style={{
                        flexDirection: "row-reverse"
                    }}
                        onPress={() => {
                            setViewMore(!viewMore)
                        }}>
                        {!viewMore && <Text>View More</Text>}
                        {viewMore && <Text>View Less</Text>}
                    </TouchableOpacity>}
                </View>

                <View>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate(Routes.POPULAR_DEALS, {userId:userid}, {title: "Related Products"});
                    }}>
                        <View style={screenStyles.sectionHeading}>
                            <Text style={screenStyles.sectionHeadingText}>Related Products</Text>
                            <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                        color={colors.subHeadingColor}/>
                        </View>
                    </TouchableOpacity>
                    <View style={screenStyles.categoriesContainer}>

                    {!products.length &&
                            <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
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
                                userid={userid}
                            />
                            </View>
                        }
                    />
                    </View>
                </View>
            </ScrollView>
            <View style={screenStyles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <View style={screenStyles.centeredView}>
                            <TouchableOpacity style={{position: "absolute", top: hp("4%"), right: wp("4%"), display:"flex", 
                            flexDirection:"row", elevation:2, zIndex:2}}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text>Close </Text><Close width={20} height={20} color={colors.subHeadingColor} />
                            </TouchableOpacity>
                            <View style={screenStyles.modalView}>
                                <ImageZoom cropWidth={wp("100%")}
                                    cropHeight={hp("90%")}
                                    imageHeight={hp("95%")}
                                    imageWidth={wp("100%")}>
                                    <Image
                                        source={{uri: (item.bigImage||item.product_image)}}
                                        resizeMode={"cover"}
                                        style={{
                                            width: "70%",
                                            height: "100%",
                                            alignSelf: "center",
                                            resizeMode: "contain"
                                        }}
                                    />
                                </ImageZoom>
                            </View>
                        </View>
                </Modal>
            </View>
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
