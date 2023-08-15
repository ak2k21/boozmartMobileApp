import React, {useState, useEffect, useRef} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View} from "react-native";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import {TextInput} from "../../components/Global/TextInput/View";
import Routes from "../../navigation/Routes";
import ApiUrls from '../../utils/ApiUrls';
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {FoodItem} from "../../components/Application/FoodItem/View";
import {FlatList} from "react-native";
import {FocusAwareStatusBar} from "../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import Axios from 'axios';

export const Search = (props) => {

const [searchtext, setSearchtext] = useState("");
const [searchLoading, setSearchLoading] = useState(true);
const [search, setSearch] = useState([]);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_RECENT_LAST_7_SEARCH_BY_USER_ID_API,{
            headers: {
                userId: props.route.params.userId
            }
        }).then((succResp) =>{
            setSearch(succResp.data);
            setSearchLoading(false);
        },(errorresp) =>{
            console.log(JSON.stringify(errorresp));
        })

        if(props.route.params && props.route.params.searchtext){
            setSearchtext(props.route.params.searchtext)
            Axios.post(ApiUrls.SERVICE_URL + ApiUrls.FILTER_URL, {
                keyword: props.route.params.searchtext,
                rating: props.route.params.rating,
                categories: props.route.params.categories,
                brands: props.route.params.brands,
                minPrice: props.route.params.minPrice,
                maxPrice: props.route.params.maxPrice
            }).then((resp) => {
                setSearchproducts(resp.data);
            },(err) => {
                console.log("filter err", err)
            })
        }
    }, [])

    const addsearchlist = (text) => {
             Axios.post(ApiUrls.SERVICE_URL + ApiUrls.POST_RECENT_SEARCH_API, {
                                 "id": 0,
                                 "keyword": text,
                                 "user_id": props.route.params.userId
                          })
            }

    const [searchproducts, setSearchproducts] = useState([]);

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(scheme, globalStyles, colors);

    //References
    let inputRef = useRef();

    const renderCategoryTitle = (title, rightBtnText) => {
        return <TouchableOpacity
            onPress={() => {
          if(rightBtnText=="Clear"){
             Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_RECENT_SEARCH_API).then((deleteSearchResp) => {
                                    setSearch(deleteSearchResp.data)
                              })

           }
            }}>
            <View style={screenStyles.categoryTitleContainer}>
                <Text style={screenStyles.categoryTitleText}>{title}</Text>
                <Text style={screenStyles.categoryBtnText}>{rightBtnText}</Text>
            </View>
        </TouchableOpacity>
    }

    const renderHistoryItems = () => {
        return <View style={screenStyles.historyItemContainer}>
            {
                search.map((item, index) => {
                    return (
                    <TouchableOpacity onPress={() => {
                        setSearchproducts([]);
                        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.SEARCH_API + item.keyword + "?items_per_page=24&page_number=1").then((resp) => {
                               setSearchproducts(resp.data);
                           })
                    }}>
                        <View
                            key={index+item.keyword}
                            style={screenStyles.historyItemTextContainer}>
                            <Text
                                ellipsizeMode={'tail'}
                                style={screenStyles.historyItemText}>
                                {item.keyword}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    );
                })
            }
        </View>
    }

    return (

        <View style={screenStyles.container}>
            <FocusAwareStatusBar translucent backgroundColor={"transparent"} barStyle="dark-content"/>

            <View style={screenStyles.mainContainer}>

                <View style={[screenStyles.searchContainer, {paddingTop: Globals.SAFE_AREA_INSET.top + hp(1)}]}>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            props.navigation.goBack()
                        }}
                    >
                        <View style={screenStyles.searchLeftIconContainer}>
                            <SvgIcon type={IconNames.ArrowLeft} width={25} height={25} color={colors.headingColor}/>
                        </View>
                    </TouchableWithoutFeedback>

                    <TextInput
                        textInputRef={r => (inputRef = r)}
                        placeholder={"Search"}
                        placeholderTextColor={colors.headingColor}
                        rightIconSource={
                            IconNames.SlidersH
                        }
                        rightIconPress={() => {
                            props.navigation.navigate(Routes.APPLY_FILTERS, {searchtext: searchtext})
                        }}
                        rightIconTintColor={colors.inputColor}
                        leftIcon={
                            <SvgIcon width={20} height={20} type={IconNames.Search} color={colors.inputColor}/>
                        }
                        containerStyle={screenStyles.searchInputContainer}
                        leftIconContainerStyle={screenStyles.searchInputLeftIconContainer}
                        value={searchtext}
                        onChangeText={(value) => {
                            console.log("imcoming out")
                            if(value !== searchtext){
                                setSearchtext(value)
                                setSearchLoading(true)
//                                addsearchlist(value)
                                setSearchproducts([])
                                Axios.get(ApiUrls.SERVICE_URL + ApiUrls.SEARCH_API + value+"?items_per_page=24&page_number=1").then((succResp) =>{
                                    setSearchproducts(succResp.data);
                                    setSearchLoading(false)
                                },(errorresp) =>{
                                    console.log(JSON.stringify(errorresp));
                                })
                            }
                        }}
                        onEndEditing={(e) =>{
                                addsearchlist(e.nativeEvent.text)
                        }}
                    />
                </View>

                <View style={screenStyles.contentContainerStyle}>
                    {
                        renderCategoryTitle("Search History", "Clear")
                    }
                    {renderHistoryItems()}
                </View>

            </View>
                <View style ={{maxHeight: hp("64%"), marginHorizontal: hp("3%")}} >
                {searchLoading &&
                      <View style={{marginTop: hp("5")}}><ActivityIndicator/></View>}
                {!searchLoading && !searchproducts.length && (
                        <View>
                        <Text style = {{
                             textAlign:"center",
                             fontSize:20,
                             }}>Search any item</Text>
                        </View>
                        )}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={searchproducts}
                    numColumns={2}
                     keyExtractor={(item, index) => {
                        return index + item.product_name + "gfhgfh";
                    }}
                    renderItem={({item, index}) => {
                            console.log("rerendering")
                            return <FoodItem
                                title={item.product_name}
                                image={item.Image_Thumb_Nail}
                                bigImage={item.product_image}
                                price={item.price}
                                weight={item.weight}
                                discount={item.discount}
                                cartCount={item.cartCount}
                                isFavourite={item.isFavourite}
                                detail={"details"}
                                ratingValue={item.ratingValue}
                                cartCountChange={(count) => {
                                }}
                                favouriteChange={(favourite) => {
                                }}
                                navigation={props.navigation}
                            />
                    }}
                />
                </View>

            <View style={screenStyles.bottomButtonsContainer}>

                <TouchableOpacity style={screenStyles.imageSearchButton} onPress={() => {

                }}>

                    <View style={screenStyles.buttonContainer}>

                        <SvgIcon type={IconNames.Camera} width={18} height={18} color={colors.inputColor}
                                 style={screenStyles.buttonIcon}/>

                        <Text style={screenStyles.buttonText}>{"Image Search"}</Text>


                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={screenStyles.voiceSearchButton} onPress={() => {
                }}>

                    <View style={screenStyles.buttonContainer}>

                        <SvgIcon type={IconNames.Microphone} width={18} height={18} color={colors.inputColor}
                                 style={screenStyles.buttonIcon}/>

                        <Text style={screenStyles.buttonText}>{"Voice Search"}</Text>

                    </View>
                </TouchableOpacity>

            </View>

        </View>

    );

}