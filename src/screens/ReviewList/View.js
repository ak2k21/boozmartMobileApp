import React, {useState, useEffect} from 'react';
import {Text, FlatList, View, ActivityIndicator} from "react-native";
import {ReviewItem} from "../../components/Application/ReviewItem/View";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import Globals from "../../utils/Globals";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';

export const ReviewList = (props) => {

const [reviewsLoading, setReviewsLoading] = useState(true);
const [reviews, setReviews] = useState([]);

    useEffect(() => {
    console.log("error");
        Axios.get(ApiUrls.SERVICE_URL+ApiUrls.GET_PRODUCTS_BY_RATINGS_API).then((succResp) =>{
        console.log("reviewlist: ",succResp.data);
            setReviews(succResp.data);
            setReviewsLoading(false);
        },(errorresp) =>{
            console.log("From error")
            console.log((errorresp));
        })
    }, [])


    return (

        <BaseView
            navigation={props.navigation}
            title={"Reviews"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                props.navigation.navigate(Routes.ADD_REVIEW)
            }}
            headerWithBack
            applyBottomSafeArea
            childView={() => {

                return (
                <>
                {reviewsLoading &&
                     <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                {!reviewsLoading && !reviews.length &&
                        <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                    {!reviews.length && (
                              <View>
                              <Text style = {{
                                   marginTop: hp(40),
                                   textAlign:"center",
                                   fontSize:20,
                                   }}>No reviews to display</Text>
                              </View>
                              )}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={reviews}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                        renderItem={({item, index}) => {

                            if (index === 0) {
                                return <View style={{
                                    marginTop: hp(3)
                                }}>
                                    <ReviewItem
                                        profileImage={item.product_image}
//                                      fullName={item.fullName}
                                        reviewTime={new Date(item.updated_at).toDateString()}
                                        rating={item.rating}
                                        comment={item.description}
                                    />
                                </View>
                            } else {
                                return <ReviewItem
                                    profileImage={item.product_image}
//                                  fullName={item.fullName}
                                    reviewTime={new Date(item.updated_at).toDateString()}
                                    rating={item.rating}
                                    comment={item.description}
                                />
                            }

                        }}
                    />

                    </>

                );
            }}

        />

    )

}
