import React, { useRef, useState, useEffect, useContext } from 'react';
import { FlatList, Image, Text, TouchableOpacity, useColorScheme, View, ScrollView, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import { FoodItem } from "../../../components/Application/FoodItem/View";
import { SearchButton } from "../../../components/Application/SearchButton/View";
import { Styles } from "./Styles";
import Routes from "../../../navigation/Routes";
import ApiUrls from "../../../utils/ApiUrls";
import RBSheet from "react-native-raw-bottom-sheet";
//import {FavouritesBottomSheet} from "../../../components/Application/FavouritesBottomSheet/View";
import { CategoryItem } from "../../../components/Application/CategoryItem/View";
import { useTheme } from "@react-navigation/native";
import { commonDarkStyles } from "../../../../branding/Boozemart2/styles/dark/Style";
import { commonLightStyles } from "../../../../branding/Boozemart2/styles/light/Style";
import { SvgIcon } from "../../../components/Application/SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";
import { FocusAwareStatusBar } from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import { ReorderItem } from "../../../components/Application/ReorderItem/View";
import Axios from 'axios';
import Context from '../../../utils/context'
import store from '../../../store/index';
import { commonActions } from '../../../store/commonStore'
import { useSelector } from 'react-redux';
import AppConfig from "../../../../branding/App_config";
const Typography = AppConfig.typography.default;
const dispatch = store.dispatch
let commonStore = store.getState().commonStore
store.subscribe(function () {
    commonStore = store.getState().commonStore
})

export const Variant3Home = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const fonts = AppConfig.fonts.default;
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    //Internal States
    const [products, setProducts] = useState([]);
    const [scotch, setScotch] = useState([]);
    const [banners, setBanners] = useState([]);
    const [readCategory, setreadCategory] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [recentOrderedProducts, setRecentOrderedProducts] = useState([]);
    const [recentOrderId, setRecentOrderId] = useState(0);
    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);

    const userId = useSelector(state => {
        return state.commonStore.userInfo.userId
    })

    const defaultAddress = useSelector(state => {
        return state.commonStore.userInfo.defaultAddress
    })

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PROMOTIONAL_PRODUCTS_API).then((succResp) => {
            setBanners(succResp.data);
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CATEGORY_LIST_API).then((succResp) => {
            setreadCategory(succResp.data);
        }, (errorresp) => {
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })
    }, [])

    useEffect(() => {
        if (userId != -1) {
            setInfiniteScrollLoading(true)
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PAGINATION_API + pageCurrent, {
                headers: {
                    user_id: userId
                }
            }).then((succResp) => {
                setInfiniteScrollLoading(false)
                setProducts([...products, ...succResp.data]);
            }, (errorresp) => {
                setInfiniteScrollLoading(false)
                console.log(JSON.stringify(errorresp));
            })
        }
    }, [pageCurrent]);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PRODUCTS_FOODITEMS_API + "?items_per_page=24&page_number=" + pageCurrent, {
            headers: {
                user_id: userId
            }
        }).then((succResp) => {
            setProducts(succResp.data);
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
        if (userId != -1) {
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_BY_ADDRESS_ALL_API, {
                headers: {
                    userId: userId
                }
            }).then((succResp) => {
                if (succResp.data.length)
                    succResp.data.forEach((item, index) => {
                        if (item.is_default)
                            dispatch(commonActions.setDefaultAddress(item))
                    })
            }, (errorresp) => {
                console.log("From error")
                console.log((errorresp));
            })
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_RECENT_ORDER, {
                headers: {
                    userId: userId
                }
            }).then((succResp) => {
                setRecentOrderId(succResp.data[0].order_id)
                if (succResp.data?.length && succResp.data[0]?.order_DETAILS?.length){
                    setRecentOrderedProducts(succResp.data[0].order_DETAILS)
                }
            })
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CART_LIST_API, {
                headers: {
                    userId: userId
                }
            }).then((CartData) => {
                let quantity = 0;
                for (let item in CartData.data) {
                    quantity += CartData.data[item].c1.qty;
                }
                dispatch(commonActions.setCartCount(quantity));
            }, err => {
                console.log("cart err", err)
            })
        }
    }, [userId])

    const contextData = useContext(Context)
    //References
    const _carousel = useRef();
    let _favouriteSheet = useRef();

    const renderPromotionSlider = () => {
        return (
            <>
                <View style={{ ...screenStyles.promotionSliderContainer, marginVertical: hp("2%"), marginBottom: hp("5%") }}>
                    <Carousel
                        ref={_carousel}
                        data={banners}
                        inactiveSlideScale={1}
                        renderItem={({ item }) => {

                            return (
                                <Image
                                    style={{
                                        height: hp("25"),
                                        width: hp("50")
                                    }}
                                    source={{ uri: item.product_image }}
                                />

                            )
                        }}
                        sliderWidth={hp("50%")}
                        itemWidth={hp("50%")}
                        loop
                    />

                </View>
                <View>

                </View>
            </>
        );

    }

    const [offset, setOffset] = useState(0);
    const [direction, setDirection] = useState("");
    const onScrollHandler = (e) => {
        //        console.log(e.nativeEvent.contentOffset.y)
        // const currentOffset = e.nativeEvent.contentOffset.y;
        // const offsetDiff = (currentOffset - offset)
        // setOffset(currentOffset);
        // var currentDirection = "";
        // if (offsetDiff > 0)
        //     currentDirection = "down";
        // else
        //     currentDirection = "up";
        // if (direction !== currentDirection) {
        //     setDirection(currentDirection);
        //     if (direction === "down") {
        //         console.log("down")
        //         contextData.setStateData({
        //             common: {
        //                 isTabBarVisible: true
        //             }
        //         })
        //     } else {
        //         console.log("up")
        //         contextData.setStateData({
        //             common: {
        //                 isTabBarVisible: false
        //             }
        //         })
        //     }
        // }
        const SCROLL_THRESHOLD = 100; // Adjust this threshold as needed

        if (
            Math.floor(e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height - SCROLL_THRESHOLD) <=
            Math.floor(e.nativeEvent.contentOffset.y)
        ) {
            setPageCurrent(pageCurrent + 1);
        }
    };

    return (

        <View style={[screenStyles.mainWrapper]}>

            <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <View style={screenStyles.mainContainer}>
                {(userId != -1 && defaultAddress.state) &&<Text style={{
                    fontFamily: fonts.RUBIK_REGULAR,
                    color: colors.headingColor, marginBottom: 5,
                    textAlign: 'center', justifyContent: 'center',
                    paddingTop: hp("1%"), fontWeight: "bold",
                    marginHorizontal: wp("5%"),
                    fontSize: 15, marginTop: hp("2%")
                }}
                    numberOfLines={1}>{(defaultAddress.city || "") + " " + (defaultAddress.society || "") + " " + (defaultAddress.state || "") + " " + (defaultAddress.pincode || "")}
                    </Text>}
                <SearchButton
                    onPress={() => props.navigation.push(Routes.SEARCH, { userId: userId })}
                />

                <ScrollView showsVerticalScrollIndicator={false}
                    onScroll={onScrollHandler}
                    scrollEventThrottle={400}>
                    <Text style={screenStyles.categoriesTitle}>What would you like to have?</Text>

                    {!readCategory.length &&
                        <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={readCategory}
                        keyExtractor={(item, index) => {
                            return index + "gfhgfh";
                        }}
                        renderItem={({ item }) =>
                            <CategoryItem
                                navigation={props.navigation}
                                secondaryTitle={item.secondaryTitle}
                                secondaryColor={item.secondaryColor}
                                primaryTitle={item.title}
                                primaryColor={item.primaryColor}
                                iconBgColor={item.iconBgColor}
                                iconURI={item.iconURI}
                                bgURI={item.bgURI}
                                img={item.image}
                                id={item.cat_id}
                                userId={userId}
                            />
                        }
                    />

                    {renderPromotionSlider()}

                    {(recentOrderedProducts.length > 0) && <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate(Routes.CART_SUMMARY, {
                                userId: userId,
                                orderId: recentOrderId,
                                action: "repeatLastOrder"
                            });
                        }}
                    >
                        <View style={screenStyles.sectionHeading}>
                            <Text style={screenStyles.BuyAgainTitle}>Repeat Last Order</Text>

                            <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                top={-10} color={colors.subHeadingColor} />
                        </View>
                    </TouchableOpacity>}

                    <View style={screenStyles.categoriesContainer}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={recentOrderedProducts}
                            keyExtractor={(item, index) => {
                                return item.id;
                            }}
                            renderItem={({ item }) => {
                                const varientInfo = item.varients_info ? item.varients_info : item.Associated_Varients;
                                const productInfo = item.product_info ? item.product_info : item;
                                return <View style={screenStyles.categoryItem}>
                                    <ReorderItem
                                        navigation={props.navigation}
                                        secondaryTitle={parseFloat(varientInfo[0]?.base_price).toFixed(2)}
                                        ratingValue={productInfo.ratingValue}
                                        secondaryColor={item.secondaryColor}
                                        primaryTitle={productInfo.product_name}
                                        primaryColor={item.primaryColor}
                                        iconBgColor={item.iconBgColor}
                                        iconURI={item.iconURI}
                                        bgURI={productInfo.bgURI}
                                        img={productInfo.product_image}
                                        item={{ ...productInfo, 
                                                cartCount: 0,
                                                VARIENTS: varientInfo.map(varientItem => {
                                                    return {...varientItem, total_count:0} 
                                                })
                                            }}
                                        id={productInfo.product_id}
                                        userid={userId}
                                    />
                                </View>
                            }}
                        />
                    </View>

                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate(Routes.POPULAR_DEALS, { userId: userId });
                    }}>
                        <View style={screenStyles.sectionHeading}>
                            <Text style={screenStyles.sectionHeadingText}>Popular Deals</Text>
                            <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                color={colors.subHeadingColor} />
                        </View>
                    </TouchableOpacity>

                    {!products.length &&
                        <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>}

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products}
                        numColumns={2}
                        keyExtractor={(item, index) => {
                            return item.id + item.product_name;
                        }}
                        renderItem={({ item }) => {
                            return <FoodItem
                                item={item}
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
                                }}
                                navigation={props.navigation}
                                navigatedFrom={"home"}
                            />
                        }
                        }
                    />
                    {infiniteScrollLoading &&
                        <View style={{ marginVertical: hp("5") }}><ActivityIndicator /></View>}
                </ScrollView>
            </View>
        </View>

    );

}
