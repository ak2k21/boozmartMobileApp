import React, { useRef, useState, useEffect, useContext } from 'react';
import { FlatList, Image, Text, TouchableOpacity, useColorScheme, View, ScrollView, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CommonActions } from "@react-navigation/native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FoodItem } from "../../../components/Application/FoodItem/View";
import { SearchButton } from "../../../components/Application/SearchButton/View";
import { Styles } from "./Styles";
import Routes from "../../../navigation/Routes";
import Globals from "../../../utils/Globals";
import ApiUrls from "../../../utils/ApiUrls";
import RBSheet from "react-native-raw-bottom-sheet";
//import {FavouritesBottomSheet} from "../../../components/Application/FavouritesBottomSheet/View";
import { CategoryItem } from "../../../components/Application/CategoryItem/View";
import { useTheme } from "@react-navigation/native";
import { commonDarkStyles } from "../../../../branding/boozemart/styles/dark/Style";
import { commonLightStyles } from "../../../../branding/boozemart/styles/light/Style";
import { SvgIcon } from "../../../components/Application/SvgIcon/View";
import IconNames from "../../../../branding/boozemart/assets/IconNames";
import { FocusAwareStatusBar } from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import { ReorderItem } from "../../../components/Application/ReorderItem/View";
import Axios from 'axios';
import Context from '../../../utils/context'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';

export const Variant3Home = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    //Internal States
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(-1);
    const [scotch, setScotch] = useState([]);
    const [banners, setBanners] = useState([]);
    const [readCategory, setreadCategory] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [buyAgainOrders, setBuyAgainOrders] = useState([]);
    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);

    useEffect(() => {
        GoogleSignin.isSignedIn().then(isSignedIn => {
            if (isSignedIn) {
                GoogleSignin.getCurrentUser().then(user => {
                    Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_USER_SERACH_BY_KEYWORD + user.user.email).then((succResp) => {
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
        if(userId != -1){
            setInfiniteScrollLoading(true)
            console.log("setInfiniteScrollLoading", infiniteScrollLoading)
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
        if (userId != -1) {
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PRODUCTS_FOODITEMS_API + "?items_per_page=24&page_number=" + pageCurrent, {
                headers: {
                    user_id: userId
                }
            }).then((succResp) => {
                setProducts(succResp.data);
            }, (errorresp) => {
                console.log(JSON.stringify(errorresp));
            })
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_SCOTCH_PRODUCT_BY_CATEGORY_ID_API, {
                headers: {
                    user_id: userId
                }
            }).then((succResp) => {
                setScotch(succResp.data);
            }, (errorresp) => {
                console.log("scotch error: ", ApiUrls.SERVICE_URL + ApiUrls.GET_SCOTCH_PRODUCT_BY_CATEGORY_ID_API ,JSON.stringify(errorresp));
            })
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_USER_ORDER_PRODUCTS + userId).then((succResp) => {
                setBuyAgainOrders(succResp.data);
            }, (errorresp) => {
                console.log("From error")
                console.log(JSON.stringify(errorresp));
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
        const currentOffset = e.nativeEvent.contentOffset.y;
        const offsetDiff = (currentOffset - offset)
        setOffset(currentOffset);
        var currentDirection = "";
        if (offsetDiff > 0)
            currentDirection = "down";
        else
            currentDirection = "up";
        if (direction !== currentDirection) {
            setDirection(currentDirection);
            if (direction === "down") {
                console.log("down")
                contextData.setStateData({
                    common: {
                        isTabBarVisible: true
                    }
                })
            } else {
                console.log("up")
                contextData.setStateData({
                    common: {
                        isTabBarVisible: false
                    }
                })
            }
        }
        if (Math.floor(e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height) == Math.floor(e.nativeEvent.contentOffset.y)) {
                     setPageCurrent(pageCurrent+1);
        }
    };

    return (

        <View style={[screenStyles.mainWrapper]}>

            <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <View style={screenStyles.mainContainer}>
                <SearchButton
                    onPress={() => props.navigation.push(Routes.SEARCH, { userId: userId })}
                />

                <ScrollView showsVerticalScrollIndicator={false}
                    onScroll={onScrollHandler}>
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

                    {(buyAgainOrders.length > 0) && <TouchableOpacity onPress={() => {
                        props.navigation.navigate(Routes.POPULAR_DEALS, { userId: userId, title: "Past Orders" });
                    }}>
                        <View style={screenStyles.sectionHeading}>
                            <Text style={screenStyles.BuyAgainTitle}>Buy Again From Previous Orders</Text>

                            <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                top={-10} color={colors.subHeadingColor} />
                        </View>
                    </TouchableOpacity>}
                    <View style={screenStyles.categoriesContainer}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={buyAgainOrders}
                            keyExtractor={(item, index) => {
                                return item.id;
                            }}
                            renderItem={({ item }) =>
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

                    {(scotch.length != 0) && <Text style={{ ...screenStyles.categoriesTitle, marginVertical: hp("2") }}>Checkout Our Top Sellers</Text>}

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={scotch}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return <FoodItem
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
                                id={item.product_id}
                                userid={userId}
                                cartCountChange={(count) => {
                                }}
                                favouriteChange={(favourite) => {
                                }}
                                navigation={props.navigation}
                            />
                        }}
                    />

                    <Text style={screenStyles.categoriesTitle}>Checkout Our Frequently Ordered Drinks</Text>

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
