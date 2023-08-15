import React, {useState, useEffect} from 'react';
import {FlatList, View, ActivityIndicator} from "react-native";

import {FoodItem} from "../../components/Application/FoodItem/View";
import BaseView from "../BaseView";
import Globals from "../../utils/Globals";
import ApiUrls from "../../utils/ApiUrls";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import style from "./Style";
import Axios from 'axios';

export const PopularDeals = (props) => {

const [products, setProducts] = useState([]);

    useEffect(() => {
        let productsURL = ApiUrls.GET_BY_PRODUCTS_API;
        if(props.route.params && props.route.params.title == 'Past Orders'){
            productsURL = ApiUrls.GET_USER_ORDER_PRODUCTS + props.route.params.userId
        }
        Axios.get(ApiUrls.SERVICE_URL + productsURL, {
             headers: {
                  user_id: props.route.params.userId
              }
        }).then((succResp) =>{
            setProducts(succResp.data);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })
    }, [])


    return (

        <BaseView
            navigation={props.navigation}
            title={(props.route.params && props.route.params.title)? props.route.params.title : "Popular Deals"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (
                    <>
                    {!products.length &&
                        <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products}
                        numColumns={2}
                        renderItem={({item, index}) => {

                            if (index === 0 || index === 1) {
                                return <View style={style.foodFirstItem}>

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
                                        userid={props.route.params.userId}
                                        cartCountChange={(count) => {
                                        }}
                                        favouriteChange={(favourite) => {
        //                                    if (favourite) {
        //                                        _favouriteSheet.open()
        //                                    }
                                        }}
                                        navigation={props.navigation}
                                    />

                                </View>
                            } else if (index === products.length - 1) {
                                return <View style={style.foodLastItem}>

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
                                        userid={props.route.params.userId}
                                        cartCountChange={(count) => {
                                        }}
                                        favouriteChange={(favourite) => {
        //                                    if (favourite) {
        //                                        _favouriteSheet.open()
        //                                    }
                                        }}
                                        navigation={props.navigation}
                                    />

                                </View>
                            } else {
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
                                    userid={props.route.params.userId}
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


                        }}
                    />
                    </>
                );
            }}
        />


    );
}
