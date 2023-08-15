import React, {useRef, useState, useEffect} from "react";
import {ScrollView, TouchableOpacity, useColorScheme, View, useWindowDimensions, StyleSheet, Dimensions, FlatList, SafeAreaView} from "react-native";
import {Text} from "react-native-elements";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import BaseView from "../BaseView";
import StarRating from "react-native-star-rating";
import {Styles} from "./Styles";
import ApiUrls from "../../utils/ApiUrls";
import AppInput from "../../components/Application/AppInput/View";
import AppButton from "../../components/Application/AppButton/View";
import Globals from "../../utils/Globals";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import {useTheme} from "@react-navigation/native";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import Axios from 'axios';
import Routes from "../../navigation/Routes";

export const ApplyFilters = (props) => {

    //Input reference
    let inputRef = useRef();
    const layout = useWindowDimensions();
    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);

    //Internal states
    const [rating, setRating] = useState(5);
//    const [otherItems, setOtherItems] = useState(Globals.otherFilters);
//    const [flavors, setFlavors] = useState(Globals.flavors);
//    const [volumes, setVolume] = useState(Globals.volumes);
//    const [colorsOfAlcohol, setColorsOfAlcohol] = useState(Globals.colors);
//    const [countryOfOrigin, setCountryOfOrigin] = useState(Globals.countryOfOrigin);
//    const [alcoholAge, setAlcoholAge] = useState(Globals.alcohol_age);
//    const [offers, setOffers] = useState(Globals.offers);
//    const [carbonated, setCarbonated] = useState(Globals.carbonated);
//    const [deliveryTime, setDeliveryTime] = useState(Globals.deliveryTime);
//    const [abv, setAbv] = useState(Globals.abv);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const [brands, setBrands] = useState([]);
    useEffect(() => {
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_BRANDS_API).then((succResp) =>{
                setBrands(succResp.data.map((item) => {return {...item, checked:false}}));
            },(errorresp) =>{
                console.log(JSON.stringify(errorresp));
            })
        }, [])

    const [categories, setCategories] = useState([]);
    useEffect(() => {
                Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_CATEGORY_LIST_API).then((succResp) =>{
                    setCategories(succResp.data.map((item) => {return {...item, checked:false}}));
                },(errorresp) =>{
                    console.log(JSON.stringify(errorresp));
                })
            }, [])

    //Flatlist renderItem for Others type
    const renderOthersItem = (item, index) => {
        return <TouchableOpacity
            key={index}
            onPress={() => {

                setOtherItems((otherItems) => {
                    otherItems[index].checked = !otherItems[index].checked;
                    return [...otherItems];
                });

            }} style={[
            screenStyles.othersItemContainerStyle,
            {
                borderBottomWidth: index === otherItems.length - 1 ? 0 : 1,
                paddingBottom: index === 2 ? hp(1) : hp(1.5)
            }]}>

            <SvgIcon type={item.leftIcon} width={20} height={20}
                     color={item.checked ? colors.activeColor : colors.inactiveColor}/>

            <Text style={screenStyles.othersTitle}>{item.title}</Text>

            <SvgIcon
                type={IconNames.CheckCircle}
                width={20}
                height={20}
                color={item.checked ? colors.activeColor : colors.inactiveColor}
                style={screenStyles.checkCircleImage}
            />


        </TouchableOpacity>;
    };

    //Flatlist renderItem for Categories
    const renderCategoryItem = (item, index, showBottomBorder) => {
         let bgColor = item.checked ? colors.activeColor : colors.primaryBackground;
         let txtColor = item.checked ? "#FFFFFF" : "#000000";

          return <TouchableOpacity
            key={index}
            onPress={() => {

                setCategories((categories) => {
                    categories[index].checked = !categories[index].checked;
                    return [...categories];
                });

            }} style={[screenStyles.categoryParent,
            showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
        ]}>

        { /*   <SvgIcon type={item.leftIcon} width={20} height={20}
            color={item.checked ? colors.activeColor : colors.inactiveColor}/>
        */}

            <View style={{paddingLeft: 10}}>
                <Text style={{color: txtColor}}>{item.title}</Text>
            </View>

        </TouchableOpacity>;

    };

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
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.title}</Text>
                </View>
            </TouchableOpacity>;

        };

        const renderFlavorItem = (item, index, showBottomBorder) => {
            let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
            let txtColor = item.selected ? "#FFFFFF" : "#000000";

            return <TouchableOpacity
                key={index}
                onPress={() => {

                    setFlavors((flavors) => {
                        flavors[index].selected = !flavors[index].selected;
                        return [...flavors];
                    });

                }} style={[screenStyles.categoryParent,
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.name}</Text>
                </View>
            </TouchableOpacity>;

        };

        const renderVolumeItem = (item, index, showBottomBorder) => {
            let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
            let txtColor = item.selected ? "#FFFFFF" : "#000000";

            return <TouchableOpacity
                key={index}
                onPress={() => {

                    setVolume((volumes) => {
                        volumes[index].selected = !volumes[index].selected;
                        return [...volumes];
                    });

                }} style={[screenStyles.categoryParent,
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.name}</Text>
                </View>
            </TouchableOpacity>;

        };

        const renderAbvItem = (item, index, showBottomBorder) => {
                    let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
                    let txtColor = item.selected ? "#FFFFFF" : "#000000";

                    return <TouchableOpacity
                        key={index}
                        onPress={() => {

                            setAbv((abv) => {
                                abv[index].selected = !abv[index].selected;
                                return [...abv];
                            });

                        }} style={[screenStyles.categoryParent,
                        showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
                    ]}>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{color: txtColor}}>{item.name}-{item.abv_range}</Text>
                        </View>
                    </TouchableOpacity>;

                };

        const renderColorsOfAlcoholItem = (item, index, showBottomBorder) => {
            let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
            let txtColor = item.selected ? "#FFFFFF" : "#000000";

            return <TouchableOpacity
                key={index}
                onPress={() => {

                    setColorsOfAlcohol((colorsOfAlcohol) => {
                        colorsOfAlcohol[index].selected = !colorsOfAlcohol[index].selected;
                        return [...colorsOfAlcohol];
                    });

                }} style={[screenStyles.categoryParent,
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.name}</Text>
                </View>
            </TouchableOpacity>;

        };

        const renderCountryOfOriginItem = (item, index, showBottomBorder) => {
            let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
            let txtColor = item.selected ? "#FFFFFF" : "#000000";

            return <TouchableOpacity
                key={index}
                onPress={() => {

                    setCountryOfOrigin((countryOfOrigin) => {
                        countryOfOrigin[index].selected = !countryOfOrigin[index].selected;
                        return [...countryOfOrigin];
                    });

                }} style={[screenStyles.categoryParent,
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.country}</Text>
                </View>
            </TouchableOpacity>;

        };

        const renderAlcoholAgeItem = (item, index, showBottomBorder) => {
            let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
            let txtColor = item.selected ? "#FFFFFF" : "#000000";

            return <TouchableOpacity
                key={index}
                onPress={() => {

                    setAlcoholAge((alcoholAge) => {
                        alcoholAge[index].selected = !alcoholAge[index].selected;
                        return [...alcoholAge];
                    });

                }} style={[screenStyles.categoryParent,
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.name}</Text>
                </View>
            </TouchableOpacity>;

        };

        const renderOffersItem = (item, index, showBottomBorder) => {
            let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
            let txtColor = item.selected ? "#FFFFFF" : "#000000";

            return <TouchableOpacity
                key={index}
                onPress={() => {

                    setOffers((offers) => {
                        offers[index].selected = !offers[index].selected;
                        return [...offers];
                    });

                }} style={[screenStyles.categoryParent,
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.discount}</Text>
                </View>
            </TouchableOpacity>;

        };

        const renderCarbonatedItem = (item, index, showBottomBorder) => {
                    let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
                    let txtColor = item.selected ? "#FFFFFF" : "#000000";

                    return <TouchableOpacity
                        key={index}
                        onPress={() => {

                            setCarbonated((carbonated) => {
                                carbonated[index].selected = !carbonated[index].selected;
                                return [...carbonated];
                            });

                        }} style={[screenStyles.categoryParent,
                        showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
                    ]}>

                        <View style={{paddingLeft: 10}}>
                            <Text style={{color: txtColor}}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>;

                };

        const renderDeliveryTimeItem = (item, index, showBottomBorder) => {
            let bgColor = item.selected ? colors.activeColor : colors.primaryBackground;
            let txtColor = item.selected ? "#FFFFFF" : "#000000";

            return <TouchableOpacity
                key={index}
                onPress={() => {

                    setDeliveryTime((deliveryTime) => {
                        deliveryTime[index].selected = !deliveryTime[index].selected;
                        return [...deliveryTime];
                    });
                }} style={[screenStyles.categoryParent,
                showBottomBorder && screenStyles.categoryParentBorder, {backgroundColor:bgColor}
            ]}>

                <View style={{paddingLeft: 10}}>
                    <Text style={{color: txtColor}}>{item.name}</Text>
                </View>
            </TouchableOpacity>;

        };

         const PriceRange = function(){
                return (
                    <View style={screenStyles.priceContainer}>

                        <AppInput
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

                        <AppInput
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

      const Brands = function(){
        return (
            <View style={[screenStyles.cardContainerStyle, screenStyles.categoriesCardParentContainerStyle]}>

              <View style={screenStyles.categoriesCardContainerStyle}>
                  {
                      brands.map((item, index) => {
                          return renderBrandItem(
                              item, index, (!(index === brands.length - 2 || index === brands.length - 1)),
                          );
                      })
                  }
              </View>
          </View>
        )
      }

      const Flavors = function(){
        return (
            <View  style={[screenStyles.cardContainerStyle, screenStyles.categoriesCardParentContainerStyle]}>

              <View style={screenStyles.categoriesCardContainerStyle}>
                  {
                      flavors.map((item, index) => {
                          return renderFlavorItem(
                              item, index, (!(index === flavors.length - 2 || index === flavors.length - 1)),
                          );
                      })
                  }
              </View>
          </View>

        )
      }

      const StarRatingFilter = function(){
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
      const Others = function(){
       return (<View>
           {
             otherItems.map((item, index) => {
             return renderOthersItem(item, index);
              })
        }
        </View>
        )
      }

      const Categories = function(){
      return (
      <View style={screenStyles.categoriesCardContainerStyle}>
         {
            categories.map((item, index) => {
            return renderCategoryItem(
            item, index, (!(index === categories.length - 2 || index === categories.length - 1)),
            );
            })
          }
      </View>
      )
      }

      const Volumes = function(){
      return (
      <View style={screenStyles.categoriesCardContainerStyle}>
      {
            volumes.map((item, index) => {
            return renderVolumeItem(
            item, index, (!(index === volumes.length - 2 || index === volumes.length - 1)),
            );
            })
      }
      </View>
      )
      }

      const ABV = function(){
      return (
           <View style={screenStyles.categoriesCardContainerStyle}>
           {
                  abv.map((item, index) => {
                  return renderAbvItem(
                  item, index, (!(index === abv.length - 2 || index === abv.length - 1)),
                  );
                  })
            }
            </View>
      )
      }

      const ChooseYourColor = function(){
      return (
           <View style={screenStyles.categoriesCardContainerStyle}>
           {
                    colorsOfAlcohol.map((item, index) => {
                    return renderColorsOfAlcoholItem(
                    item, index, (!(index === colorsOfAlcohol.length - 2 || index === colorsOfAlcohol.length - 1)),
                         );
                     })
           }
           </View>
      )
      }

      const CountryOfOrigin = function(){
      return (
           <View style={screenStyles.categoriesCardContainerStyle}>
           {
                 countryOfOrigin.map((item, index) => {
                 return renderCountryOfOriginItem(
                 item, index, (!(index === countryOfOrigin.length - 2 || index === countryOfOrigin.length - 1)),
                          );
                  })
           }
          </View>
      )
      }

      const Age = function(){
      return (
          <View style={screenStyles.categoriesCardContainerStyle}>
          {
               alcoholAge.map((item, index) => {
               return renderAlcoholAgeItem(
               item, index, (!(index === alcoholAge.length - 2 || index === alcoholAge.length - 1)),
                    );
               })
          }
      </View>
      )
      }

      const Offers = function(){
      return (
         <View style={screenStyles.categoriesCardContainerStyle}>
         {
              offers.map((item, index) => {
              return renderOffersItem(
              item, index, (!(index === offers.length - 2 || index === offers.length - 1)),
                );
            })
         }
         </View>
      )
      }

      const Carbonated = function(){
      return (
          <View style={screenStyles.categoriesCardContainerStyle}>
          {
              carbonated.map((item, index) => {
                   return renderCarbonatedItem(
                   item, index, (!(index === carbonated.length - 2 || index === carbonated.length - 1)),
                   );
              })
          }
          </View>
      )
      }

      const DeliveryTime = function(){
      return (
         <View style={screenStyles.categoriesCardContainerStyle}>
         {
              deliveryTime.map((item, index) => {
                  return renderDeliveryTimeItem(
                    item, index, (!(index === deliveryTime.length - 2 || index === deliveryTime.length - 1)),
                  );
              })
         }
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
              {
                comp: Categories,
                status: "Categories"
              },
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

       const [status, setStatus] = useState('Price Range')
       const [dataList, setDataList] = useState([...FilterList.filter(e => e.status === 'Price Range')])
        const setStatusFilter = status => {
            setDataList([...FilterList.filter(e => e.status === status)])
          setStatus(status)
        }
        const renderItem = function({item, index}) {
              return (
              <ScrollView showsVerticalScrollIndicator={false}
              contentInset = {{top: 0, left: 0, bottom: 0, right: 0}}
              style={{maxHeight: hp("75%")}}>
                <View key={index} style={screenStyles.itemContainer}>
                  {item.comp()}
                </View>
                </ScrollView>
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

                            <View style={[screenStyles.cardContainerStyle, screenStyles.firstCardContainerStyle]}>

                                <View style={{display: "flex",
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
                                                  <View style={{paddingLeft: 10}}>
                                                    <Text numberOfLines={1} style={screenStyles.textTab, status === e.status && screenStyles.textTabActive}>{e.status}</Text>
                                                  </View>
                                                  </TouchableOpacity>
                                                )
                                              })
                                            }
                                      </View>

                                      <View>
                                          <FlatList
                                            data={dataList}
                                            keyExtractor={(e,i) => i.toString()}
                                            renderItem={renderItem}
                                          />
                                      </View>
                                </View>

                            </View>

                        <View style={{...screenStyles.bottomButtonContainer, ...{paddingTop: 10, display: "flex", flexDirection: "row", gap: 2}}}>
                            <AppButton
                            style={{
                                marginHorizontal: 10,
                            }}
                                title={"Apply Filters"}
                                onPress={() => {
                                    props.navigation.push(Routes.SEARCH, {
                                        searchtext: props.route.params.searchtext,
                                        rating: 5,
                                        categories: categories.filter(item => {
                                            if(item.checked){
                                               return item;
                                           }
                                        }).map(item => {
                                            if(item.checked){
                                                return item.cat_id
                                            }else return null
                                        }).toString(),
                                        brands: brands.filter(item => {
                                              if(item.checked){
                                                 return item;
                                             }
                                          }).map(item => {
                                            if(item.checked){
                                                return item.brand_id
                                            }
                                        }).toString(),
                                        minPrice: minPrice,
                                        maxPrice: maxPrice
                                    });
                                }}
                            />

                            <AppButton
                                style={{
                                    marginHorizontal: 10,
                                }}
                                title={"Clear Filters"}
                                onPress={() => {
                                    setBrands(brands.map(item => {return {...brands, checked: false}}))
                                    setCategories(categories.map(item => {return {...categories, checked: false}}))
                                    setMinPrice(0)
                                    setMaxPrice(10000)
                                    props.navigation.push(Routes.SEARCH, {
                                        searchtext: props.route.params.searchtext
                                    })
                                }}
                            />
                        </View>


                    </View>


                );


            }}

        />

    );

};
