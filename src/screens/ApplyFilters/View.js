import React, { useRef, useState, useEffect } from "react";
import { TouchableOpacity, useColorScheme, View, useWindowDimensions, FlatList, SafeAreaView, Keyboard } from "react-native";
import { Text } from "react-native-elements";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import BaseView from "../BaseView";
import StarRating from "react-native-star-rating";
import { Styles } from "./Styles";
import ApiUrls from "../../utils/ApiUrls";
import AppButton from "../../components/Application/AppButton/View";
import { commonDarkStyles } from "../../../branding/Boozemart2/styles/dark/Style";
import { commonLightStyles } from "../../../branding/Boozemart2/styles/light/Style";
import { useTheme } from "@react-navigation/native";
import Axios from 'axios';
import Routes from "../../navigation/Routes";
import { TextInput } from "../../components/Global/TextInput/View";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const ApplyFilters = (props) => {

    //Input reference
    let inputRef = useRef();
    const layout = useWindowDimensions();
    //Theme based styling and colors
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const screenStyles = Styles(scheme, colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);

    //Internal states
    const [rating, setRating] = useState(5);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_BRANDS_API).then((succResp) => {
            succResp.data.sort((a, b) => a.title.localeCompare(b.title));
            // console.log("succResp.data: ",succResp.data)
            setBrands(succResp.data.map((item) => { return { ...item, checked: false } }));
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
   
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CATEGORY_LIST_API).then((succResp) => {
            setCategories(succResp.data.map((item) => { return { ...item, checked: false } }));
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
    }, [])


    const renderBrandItem = (item, index, showBottomBorder) => {
        let bgColor = item.checked ? colors.activeColor : colors.primaryBackground;
        let txtColor = item.checked ? "#FFFFFF" : "#000000";

        return <TouchableOpacity
            key={index}
            onPress={() => {
                console.log("brands", brands)
                setBrands((brands) => {
                    brands[index].checked = !brands[index].checked;
                    return [...brands];
                });

            }} style={[screenStyles.categoryParent,
            showBottomBorder && screenStyles.categoryParentBorder, { backgroundColor: bgColor }
            ]}>

            <View style={{ paddingLeft: 10 }}>
                <Text style={{ color: txtColor }}>{item.title}</Text>
            </View>
        </TouchableOpacity>;

    };

    const PriceRange = function () {
        return (
            <View style={screenStyles.priceContainer}>

                <TextInput
                    textInputRef={r => (inputRef = r)}
                    showLeftIcon={false}
                    placeholder={"Min"}
                    containerStyle={screenStyles.inputContainerStyle}
                    inputStyle={{
                        backgroundColor: colors.inputSecondaryBackground,
                    }}
                    value={minPrice}
                    onChangeText={(min) => {
                        console.log(min)
                        setMinPrice(min);
                    }}
                    keyboardType={"number-pad"}
                />

                <TextInput
                    textInputRef={r => (inputRef = r)}
                    showLeftIcon={false}
                    placeholder={"Max"}
                    containerStyle={screenStyles.inputContainerStyle}
                    inputStyle={{
                        backgroundColor: colors.inputSecondaryBackground,
                    }}
                    value={maxPrice}
                    onChangeText={(max) => {
                        setMaxPrice(max);
                    }}
                    keyboardType={"number-pad"}
                />

            </View>
        )
    }

    const Brands = function () {
        return (
            <SafeAreaView style={{flex:1}}>

                    <FlatList
                        style={{height: 78}}
                        showsVerticalScrollIndicator={false}
                        data={brands}
                        keyExtractor={(e, i) => i.toString()}
                        renderItem={({item, index}) => {
                            return renderBrandItem(
                                item, index, (!(index === brands.length - 2 || index === brands.length - 1)),
                            )
                        }}
                    />
            </SafeAreaView>
        )
    }


    const StarRatingFilter = function () {
        return (
            <View style={screenStyles.ratingContainerStyle}>

                <StarRating
                    maxStars={5}
                    rating={rating}
                    starSize={hp(3)}
                    fullStarColor={colors.ratingActiveColor}
                    emptyStarColor={colors.ratingInActiveColor}
                    selectedStar={(rating) => {
                        setRating(rating);
                    }}
                />

                <Text style={screenStyles.ratingTextStyle}>{rating + " Stars"}</Text>

            </View>
        )
    }
    // Linking content
    const FilterList = [
        {
            comp: PriceRange,
            status: "Price Range"
        },
        {
            comp: Brands,
            status: "Brands"
        },
        //              {
        //                comp: Flavors,
        //                status: "Flavors"
        //              },
        {
            comp: StarRatingFilter,
            status: "Star Rating"
        },
        //              {
        //                comp: Others,
        //                status: "Others"
        //              },
        //   {
        //     comp: Categories,
        //     status: "Categories"
        //   },
        //              {
        //                comp: Volumes,
        //                status: "Volumes"
        //              },
        //              {
        //                comp: ABV,
        //                status: "ABV"
        //              },
        //              {
        //                comp: ChooseYourColor,
        //                status: "ChooseYourColor"
        //              },
        //              {
        //                comp: CountryOfOrigin,
        //                status: "CountryOfOrigin"
        //              },
        //              {
        //                comp: Age,
        //                status: "Age"
        //              },
        //              {
        //                comp: Offers,
        //                status: "Offers"
        //              },
        //              {
        //                comp: Carbonated,
        //                status: "Carbonated"
        //              },
        //              {
        //                comp: DeliveryTime,
        //                status: "DeliveryTime"
        //              }
    ]

    const navigateToCategoryItems = () => {
        props.navigation.push(Routes.CATEGORY_ITEMS, {
            ...props.route?.params,
            rating: 5,
            brands: brands.filter(item => {
                if (item.checked) {
                    return item;
                }
            }).map(item => {
                if (item.checked) {
                    return item.brand_id
                }
            }).toString(),
            minPrice: minPrice,
            maxPrice: maxPrice,
            navigatedFrom: "applyFilters"
        })
    }

    const [status, setStatus] = useState('Price Range')
    const [dataList, setDataList] = useState(FilterList.filter(e => e.status === 'Price Range')[0])
    const setStatusFilter = status => {
        setDataList(FilterList.filter(e => e.status === status)[0])
        setStatus(status)
    }
    const renderItem = function ({ item, index }) {
        return (
            <View style={{ maxHeight: hp("75%") }}>
                <View key={index} style={screenStyles.itemContainer}>
                    {item.comp()}
                </View>
            </View>
        )
    }

    return (
        <BaseView
            navigation={props.navigation}
            title={"Apply Filters"}
            headerWithBack
            applyBottomSafeArea
            childContainerStyle={{
                ...globalStyles.baseViewStyles.childContainerStyle,
                width: wp("100%"),
            }}
            childView={() => {

                return (

                    <View style={screenStyles.mainContainer}>

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{
                            height: hp("90%")
                        }}>
                            <View style={[screenStyles.cardContainerStyle, screenStyles.firstCardContainerStyle]}>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: hp("5"),
                                }}>
                                    <View style={screenStyles.listTab}>
                                        {
                                            FilterList.map((e) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={[screenStyles.btnTab, status === e.status && screenStyles.btnTabActive]}
                                                        onPress={() => setStatusFilter(e.status)}
                                                    >
                                                        <View style={{ paddingLeft: 10 }}>
                                                            <Text numberOfLines={1} style={screenStyles.textTab, status === e.status && screenStyles.textTabActive}>{e.status}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>

                                    <View style={{
                                        paddingHorizontal: wp("4%"),
                                        paddingBottom: hp("4%"),
                                        height: hp("80%")
                                    }}>
                                        {dataList.comp()}
                                    </View>
                                </View>

                            </View>

                            <View style={{ ...screenStyles.bottomButtonContainer, ...{ paddingTop: 10, display: "flex", flexDirection: "row", gap: 2 } }}>
                                <AppButton
                                    style={{
                                        marginHorizontal: 10
                                    }}
                                    buttonWidth={wp("35%")}
                                    title={"Apply Filters"}
                                    onPress={() => {
                                        if(props.route?.params?.navigatedFrom == "categoryItems"){
                                            navigateToCategoryItems()
                                        } else {
                                            props.navigation.push(Routes.SEARCH, {
                                                userId: props.route?.params?.userId,
                                                searchtext: props.route?.params?.searchtext,
                                                rating: 5,
                                                categories: categories.filter(item => {
                                                    if (item.checked) {
                                                        return item;
                                                    }
                                                }).map(item => {
                                                    if (item.checked) {
                                                        return item.cat_id
                                                    } else return null
                                                }).toString(),
                                                brands: brands.filter(item => {
                                                    if (item.checked) {
                                                        return item;
                                                    }
                                                }).map(item => {
                                                    if (item.checked) {
                                                        return item.brand_id
                                                    }
                                                }).toString(),
                                                minPrice: minPrice,
                                                maxPrice: maxPrice
                                            });
                                        }
                                    }}
                                />

                                <AppButton
                                    style={{
                                        marginHorizontal: 10
                                    }}
                                    buttonWidth={wp("35%")}
                                    title={"Clear Filters"}
                                    onPress={() => {
                                        setBrands(brands.map(item => { return { ...brands, checked: false } }))
                                        setCategories(categories.map(item => { return { ...categories, checked: false } }))
                                        setMinPrice(0)
                                        setMaxPrice(10000)
                                        if(props.route?.params?.navigatedFrom == "categoryItems"){
                                            props.navigation.push(Routes.CATEGORY_ITEMS, {
                                                ...props.route?.params,
                                                navigatedFrom: "applyFilters"
                                            })
                                        } else {
                                            props.navigation.push(Routes.SEARCH, {
                                                searchtext: props.route?.params?.searchtext,
                                                userId: props.route?.params?.userId
                                            })
                                        }
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>

                    </View>


                );


            }}

        />

    );

};
