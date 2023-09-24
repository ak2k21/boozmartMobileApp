import React, {useRef, useState, useEffect} from "react";
import {Image, ScrollView, useColorScheme, View, FlatList, TouchableOpacity, ActivityIndicator} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Styles} from "./Styles";
import ApiUrls from "../../utils/ApiUrls";
import {FoodItem} from "../../components/Application/FoodItem/View";
import {Text} from "react-native-elements";
import BaseView from "../BaseView";
import Routes from "../../navigation/Routes";
import {useTheme} from "@react-navigation/native";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import {ReorderItem} from "../../components/Application/ReorderItem/View";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import {commonDarkStyles} from "../../../branding/Boozemart2/styles/dark/Style";
import {commonLightStyles} from "../../../branding/Boozemart2/styles/light/Style";
import Axios from 'axios';
import { useSelector } from "react-redux";

export const Favourites = (props) => {

const [favLoading, setFavLoading] = useState(true);
const [favourites, setFavourites] = useState([]);
const [cart, setCart] = useState([]);
const [products, setProducts] = useState([]);

const userid = useSelector(state => {
    return state.commonStore.userInfo.userId
})

    useEffect(() => {
        if(userid != -1){
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_FAVOURITE_PRODUCT_DETAILS_API + userid).then((succResp) =>{
                 setFavourites(succResp.data);
                 setFavLoading(false);
            },(errorresp) =>{
                 console.log(JSON.stringify(errorresp));
            })
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CART_LIST_API, {
                 headers: {
                     userId: userid
                 }
            }).then((succResp) =>{
                 setCart(succResp.data);
            })
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_BY_PRODUCTS_API, {
                 headers: {
                      user_id: userid
                  }
            }).then((succResp) =>{
                setProducts(succResp.data);
            },(errorresp) =>{
                console.log("From error")
                console.log(JSON.stringify(errorresp));
            })
        }
    },[userid])

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    //Constants
    const favouriteSheetHeight = hp(42);

    //Internal states
  //  const [favouritesList, setFavouritesList] = useState(Globals.favouriteItems);
    const [activeSections, setActiveSections] = useState([]);

    //References
    let sheetRef = useRef();

    return (

        <BaseView
            navigation={props.navigation}
            showAppHeader={true}
            title={"My Favourites"}
            headerWithBack={false}
            childView={() => {
                return (

                    <View style={screenStyles.container}>
                        <ScrollView style={screenStyles.container} showsVerticalScrollIndicator={false}>
                            <View style={screenStyles.categoriesContainer}>
                            {favLoading &&
                                    <View style={{marginTop: hp("1")}}><ActivityIndicator/></View>}
                               {!favLoading && !favourites.length && (
                               <View>
                               <Text style = {{
                                    textAlign:"center",
                                    fontSize:20,
                                    }}>Add your favourite items to view them here</Text>
                               </View>
                               )}
                                <FlatList
                                 showsVerticalScrollIndicator={false}
                                 data={favourites}
                                 numColumns={2}
                                 renderItem={({item, index}) => {
                                         return <FoodItem
                                         item={item}
                                             title={item.product.product_name}
                                             image={item.product.product_image}
                                             bigImage={item.product.product_image}
                                             price={item.product.price}
                                             weight={item.product.weight}
                                             discount={item.product.discount}
                                             cartCount={cart.filter(cartItem => cartItem.product_id == item.product.product_id)[0]?cart.filter(cartItem => cartItem.product_id == item.product.product_id)[0].c1.qty:0}
                                             isFavourite={true}
                                             detail={item.product.detail}
                                             review_count={item.product.review_count}
                                             ratingValue={item.product.ratingValue}
                                             id={item.product.product_id}
                                             userid={userid}
                                             cartCountChange={(count) => {
                                             }}
                                             favouriteChange={(favourite) => {
                                             }}
                                             navigation={props.navigation}
                                             setFavourites = {setFavourites}
                                         />
                                 }}
                                />

                            </View>

                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(Routes.POPULAR_DEALS, {userId:userid}, {title: "You Might also like"});
                            }}>
                                <View style={screenStyles.sectionHeading}>
                                    <Text style={screenStyles.sectionHeadingText}>You Might Also Like</Text>
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

                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(Routes.POPULAR_DEALS, {userId:userid}, {title: "Popular Deals"});
                            }}>
                                <View style={screenStyles.sectionHeading}>
                                    <Text style={screenStyles.sectionHeadingText}>Popular Orders</Text>
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
                        </ScrollView>

                       {/* <RBSheet
                            ref={ref => {
                                sheetRef = ref;
                            }}
                            height={favouriteSheetHeight}
                        >
                            <FavouritesBottomSheet
                                onItemSelect={() => {
                                    sheetRef.close();
                                }}
                            />
                        </RBSheet>*/}
                    </View>
                );
            }}
        />
    );
};
