import React, {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, View, Text, TouchableOpacity, useColorScheme, ScrollView} from "react-native";
import {FoodItem} from "../../components/Application/FoodItem/View";
import {SubCategory} from "../../components/Application/SubCategory/View";
import BaseView from "../BaseView"
import Globals from "../../utils/Globals";
import ApiUrls from "../../utils/ApiUrls";
import {Styles} from "./Style";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {ReorderItem} from "../../components/Application/ReorderItem/View";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Routes from "../../navigation/Routes";
import Axios from 'axios';



export const CategoryItems = (props) => {

const [subcategories, setSubcategories] = useState([]);
const [products, setProducts] = useState([]);
const [cate, setCate] = useState([]);
const [subCategory, setSubCategory] = useState(-1);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CHILDREN_BY_CART_ID_API+props.route.params.categoryId).then((succResp) =>{
            setSubcategories(succResp.data);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })

     Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PRODUCTS_BY_CATEGORY_API+props.route.params.categoryId+"?items_per_page=24&page_number=1", {
        headers: {
            user_id: props.route.params.userId
        }
     }).then((succResp) =>{
        console.log("categories data: ",succResp.data);
            setProducts(succResp.data);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })


     Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_BY_PRODUCTS_API, {
         headers: {
                      user_id: props.route.params.userId
                  }
     }).then((succResp) =>{
            setCate(succResp.data);
        },(errorresp) =>{
            console.log(JSON.stringify(errorresp));
        })

    }, [])

    useEffect(()=> {
      if(subCategory != -1){
      Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_PRODUCTS_BY_CATEGORY_API+subCategory+"?items_per_page=20&page_number=1", {
          headers: {
              user_id: props.route.params.userId
          }
       }).then((succResp) =>{
              console.log("subCategory",subCategory);
                  setProducts(succResp.data);
              },(errorresp) =>{
                  console.log("From error")
                  console.log(JSON.stringify(errorresp));
              })
      }
    },[subCategory])

     const {colors} = useTheme();
      const scheme = useColorScheme();
      const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
      const screenStyles = Styles(globalStyles, colors);

    return (

        <BaseView
            navigation={props.navigation}
            title={props.route.params.category}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (
                    <>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <View style={{width: wp("80%")}}>
                            {!subcategories.length &&
                                  <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={subcategories}
                                    horizontal={true}
                                    keyExtractor={(item, index) => {
                                        return item.id;
                                    }}
                                    renderItem={({item, index}) =>
                                    <TouchableOpacity
                                    onPress={() => {
                                            setSubCategory(item.cat_id)
                                     }}>
                                        <SubCategory subCategory={item.title}></SubCategory>
                                     </TouchableOpacity>
                                    }
                                    style={{marginVertical: 10}}
                                />
                            </View>
                            <TouchableOpacity style={{
                                marginVertical: hp("2.5%"),
                                marginHorizontal: wp("2%"),
                                paddingVertical: hp("1%"),
                                paddingLeft: wp("3"),
                                height: hp("5%"),
                                width: wp("10%"),
                                borderRadius: hp(0.75),
                                textAlign: "center",
                                shadowOffset: { width: -10, height: 10 },
                                shadowColor: 'black',
                                shadowOpacity: 1,
                                elevation: 3,
                                backgroundColor: colors.primaryBackground,
                            }}
                            onPress={() => {
                                props.navigation.navigate(Routes.APPLY_FILTERS)
                            }}>
                                <SvgIcon type={IconNames.SlidersH} width={20} height={20} color={colors.inputColor}
                                                     style={{

                                                     }}/>
                            </TouchableOpacity>
                        </View>

                         <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={screenStyles.contentContainerStyle}
                            contentInset = {{top: 0, left: 0, bottom: 0, right: 0}}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={products}
                                numColumns={2}
                                keyExtractor={(item, index) => {
                                    return item.id;
                                }}
                                renderItem={({item, index}) => {

                                    if (index === 0 || index === 1) {
                                        return <View style={screenStyles.foodFirstItem}>

                                            <FoodItem
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
                                                     userid={props.route.params.userId}
                                                     cartCountChange={(count) => {
                                                     }}
                                                     favouriteChange={(favourite) => {
                                                     }}
                                                     navigation={props.navigation}
                                                 />


                                        </View>
                                    } else if (index === products.length - 1) {
                                        return <View style={screenStyles.foodLastItem}>

                                            <FoodItem
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
                                                     userid={props.route.params.userId}
                                                     cartCountChange={(count) => {
                                                     }}
                                                     favouriteChange={(favourite) => {
                                                     }}
                                                     navigation={props.navigation}
                                                 />

                                        </View>
                                    } else {
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
                                                 userid={props.route.params.userId}
                                                 cartCountChange={(count) => {
                                                 }}
                                                 favouriteChange={(favourite) => {
                                                 }}
                                                 navigation={props.navigation}
                                             />
                                    }

                                }}
                            />

                            <TouchableOpacity onPress={() => {
                                    props.navigation.navigate(Routes.POPULAR_DEALS, {userid:props.route.params.userId});
                                }}>
                                    <View style={screenStyles.sectionHeading}>
                                        <Text style={screenStyles.sectionHeadingText}>Customers also viewed</Text>
                                        <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                                 color={colors.subHeadingColor}/>
                                    </View>
                                </TouchableOpacity>


                                <View style={screenStyles.categoriesContainer}>
                                {!cate.length &&
                                     <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={cate}
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
                                                    userid={props.route.params.userId}
                                                />
                                            </View>
                                        }
                                    />
                                </View>

                            <TouchableOpacity onPress={() => {
                                    props.navigation.navigate(Routes.POPULAR_DEALS, {userid:props.route.params.userId});
                                }}>
                                    <View style={screenStyles.sectionHeading}>
                                        <Text style={screenStyles.sectionHeadingText}>View More</Text>
                                        <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                                 color={colors.subHeadingColor}/>
                                    </View>
                                </TouchableOpacity>

                                <View style={screenStyles.categoriesContainer}>
                                {!cate.length &&
                                     <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={cate}
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
                                                    userid={props.route.params.userId}
                                                />
                                            </View>
                                        }
                                    />
                                </View>
                         </ScrollView>
                    </>
                );
            }}
        />

    );
}
