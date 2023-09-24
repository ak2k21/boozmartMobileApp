import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View, TouchableHighlight, Image, Platform } from "react-native";
import { Styles } from "./Styles";
import Globals from "../../utils/Globals";
import { TextInput } from "../../components/Global/TextInput/View";
import Routes from "../../navigation/Routes";
import ApiUrls from '../../utils/ApiUrls';
import { useTheme } from "@react-navigation/native";
import { commonDarkStyles } from "../../../branding/Boozemart2/styles/dark/Style";
import { commonLightStyles } from "../../../branding/Boozemart2/styles/light/Style";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SvgIcon } from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/Boozemart2/assets/IconNames";
import { FoodItem } from "../../components/Application/FoodItem/View";
import { FlatList } from "react-native";
import { FocusAwareStatusBar } from "../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Voice from '@react-native-community/voice';

export const Search = (props) => {

    const [searchtext, setSearchtext] = useState("");
    const [searchLoading, setSearchLoading] = useState(true);
    const [search, setSearch] = useState([]);
    const [searchSelection, setSearchSelection] = useState([]);

    //voice search
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState(false);
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]);

    const onSpeechStart = (e) => {
        setStarted(true)
    };
    const onSpeechEnd = () => {
        setStarted(false);
        setEnd(true);
        setSearchLoading(false);
    };
    const onSpeechError = (e) => {
        setError(JSON.stringify(e.error));
    };
    const onSpeechResults = async (e) => {
        if(e.value?.length) {
            await Voice.stop();
            setSearchtext(e.value[0])
            setSearchproducts([])
            setSearchSelection([])
            performSearch(e.value[0], 24)
            addsearchlist(e.value[0])
        }
        setStarted(false)
        setResults(e.value)
    };
    const onSpeechPartialResults = (e) => {
        setPartialResults(e.value)
    };
    const onSpeechVolumeChanged = (e) => {
        setPitch(e.value)
    };

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_RECENT_LAST_7_SEARCH_BY_USER_ID_API, {
            headers: {
                userId: props.route.params.userId
            }
        }).then((succResp) => {
            setSearch(succResp.data);
            setSearchLoading(false);
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })

        if (props.route.params && props.route.params.searchtext) {
            console.log("search text: ", props.route.params, ApiUrls.FILTER_URL)
            setSearchtext(props.route.params.searchtext)
            Axios.post(ApiUrls.SERVICE_URL + ApiUrls.FILTER_URL, {
                keyword: props.route.params.searchtext,
                rating: props.route.params.rating,
                categories: props.route.params.categories,
                brands: props.route.params.brands,
                minPrice: Number.parseFloat(props.route.params.minPrice),
                maxPrice: Number.parseFloat(props.route.params.maxPrice)
            }, {
                headers: {
                    userId: props.route.params.userId
                }
            }).then((resp) => {
                setSearchproducts(resp.data);
            }, (err) => {
                console.log("filter err", err)
            })
        }

        //voice search changes
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
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
    const { colors } = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(scheme, globalStyles, colors);

    //References
    let inputRef = useRef();

    const renderCategoryTitle = (title, rightBtnText) => {
        return <TouchableOpacity
            onPress={() => {
                if (rightBtnText == "Clear") {
                    Axios.delete(ApiUrls.SERVICE_URL + ApiUrls.DELETE_RECENT_SEARCH_API + props.route.params.userId).then((deleteSearchResp) => {
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
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={search}
                horizontal={true}
                keyExtractor={(item, index) => {
                    return index + item.keyword + 8;
                }}
                renderItem={({ item, index }) =>
                    <TouchableOpacity
                        onPress={() => {
                            setSearchtext(item.keyword);
                            setSearchproducts([]);
                            setSearchLoading(true);
                            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.SEARCH_API + item.keyword + "?items_per_page=24&page_number=1").then((resp) => {
                                setSearchLoading(false);
                                setSearchproducts(resp.data);
                            })
                        }}>
                        <View
                            key={index + item.keyword}
                            style={screenStyles.historyItemTextContainer}>
                            <Text
                                ellipsizeMode={'tail'}
                                style={screenStyles.historyItemText}>
                                {item.keyword}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        </View>
    }

    const performSearch = (searchText, itemCount) => {
        Axios.get(ApiUrls.SERVICE_URL + ApiUrls.SEARCH_API + searchText + "?items_per_page=" + itemCount + "&page_number=1").then((succResp) => {
            setSearchproducts(succResp.data);
            setSearchLoading(false)
        }, (errorresp) => {
            console.log(JSON.stringify(errorresp));
        })
    }

    const startSpeechRecognizing = async () => {
        setSearchLoading(true)
        setStarted(true)
        setResults([])
        try {
            if (Voice.isAvailable()) {
                await Voice.start('en-US');
            }
        } catch (e) {
            console.log("voice error")
            console.error(e);
        }
    };
    const stopSpeechRecognizing = async () => {
        try {
            await Voice.stop();
            setStarted(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <View style={screenStyles.container}>
            <FocusAwareStatusBar translucent backgroundColor={"transparent"} barStyle="dark-content" />

            <View style={{ ...screenStyles.mainContainer, zIndex: 1, elevation: 1 }}>

                <View style={[screenStyles.searchContainer, {
                    paddingTop: Globals.SAFE_AREA_INSET.top + hp(1), position: "relative",
                    elevation: 100000,
                    zIndex: 100000
                }]}>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            props.navigation.goBack()
                        }}
                    >
                        <View style={screenStyles.searchLeftIconContainer}>
                            <SvgIcon type={IconNames.ArrowLeft} width={25} height={25} color={colors.headingColor} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TextInput
                        textInputRef={r => (inputRef = r)}
                        placeholder={"Search"}
                        placeholderTextColor={colors.headingColor}
                        returnKeyType="search"
                        rightIconSource={
                            IconNames.SlidersH
                        }
                        rightIconPress={() => {
                            props.navigation.navigate(Routes.APPLY_FILTERS, {
                                searchtext: searchtext,
                                userId: props.route.params.userId
                            })
                        }}
                        rightIconTintColor={colors.inputColor}
                        leftIcon={
                            <SvgIcon width={20} height={20} type={IconNames.Search} color={colors.inputColor} />
                        }
                        containerStyle={screenStyles.searchInputContainer}
                        leftIconContainerStyle={screenStyles.searchInputLeftIconContainer}
                        value={searchtext}
                        onChangeText={(value) => {
                            console.log("imcoming out")
                            if (value !== searchtext) {
                                setSearchtext(value)
                                setSearchLoading(true)
                                Axios.get(ApiUrls.SERVICE_URL + ApiUrls.SEARCH_API + value + "?items_per_page=5&page_number=1").then((succResp) => {
                                    setSearchSelection(succResp.data)
                                }, (errorresp) => {
                                    console.log(JSON.stringify(errorresp));
                                })
                            }
                        }}
                        onEndEditing={(e) => {
                            if (e.nativeEvent.text.trim()) {
                                setSearchLoading(true)
                                setSearchproducts([])
                                setSearchSelection([])
                                performSearch(e.nativeEvent.text.trim(), 24)
                                addsearchlist(e.nativeEvent.text.trim())
                            }
                        }}
                    />
                    {searchLoading && <View style={{
                        position: 'absolute', top: hp("15%"),
                        shadowOffset: { width: -2, height: 2 },
                        shadowColor: 'black',
                        shadowOpacity: 1,
                        elevation: 100000,
                        zIndex: 100000,
                        width: wp("80%"),
                        marginLeft: wp("15%"),
                        borderRadius: wp("2%"),
                        maxHeight: hp("35%"),
                        display: "flex",
                        backgroundColor: "#FFF"
                    }}>
                        {searchSelection.map(searchSelectItem => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss()
                                    setSearchSelection([])
                                    setSearchtext(searchSelectItem.product_name)
                                    performSearch(searchSelectItem.product_name, 24)
                                }}
                                    style={{
                                        paddingVertical: hp("2"), paddingHorizontal: wp("4"),
                                        backgroundColor: "#FFF", borderBottomWidth: 1, borderBottomColor: "#ccc"
                                    }}>
                                    <Text>{searchSelectItem.product_name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>}
                </View>

                <View style={screenStyles.contentContainerStyle}>
                    {
                        renderCategoryTitle("Search History", "Clear")
                    }
                    {renderHistoryItems()}
                </View>

            </View>
            <View style={{ maxHeight: hp("64%"), marginHorizontal: hp("3%") }} >
                {searchLoading &&
                    <View style={{ marginTop: hp("5") }}><ActivityIndicator /></View>}
                {!searchLoading && !searchproducts.length && (
                    <View>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
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
                    renderItem={({ item, index }) => {
                        return <FoodItem
                            item={item}
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
                            userid={props.route.params.userId}
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
                {!started && <TouchableOpacity style={screenStyles.imageSearchButton} onPress={() => {
                    startSpeechRecognizing()
                }}>
                    <View style={screenStyles.buttonContainer}>
                        <SvgIcon type={IconNames.Microphone} width={18} height={18} color={colors.inputColor}
                            style={screenStyles.buttonIcon} />
                        <Text style={screenStyles.buttonText}>{"Start"}</Text>
                    </View>
                </TouchableOpacity>}

                {started && <TouchableOpacity style={screenStyles.voiceSearchButton} onPress={() => {
                    stopSpeechRecognizing()
                }}>
                    <View style={screenStyles.buttonContainer}>
                        <SvgIcon type={IconNames.Microphone} width={18} height={18} color={colors.inputColor}
                            style={screenStyles.buttonIcon} />
                        <Text style={screenStyles.buttonText}>{"Stop"}</Text>
                    </View>
                </TouchableOpacity>}
            </View>
        </View>
    );
}