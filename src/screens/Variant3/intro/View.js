import React, {useRef, useState, createRef, useEffect} from "react";
import {ImageBackground, View, Image, Button, TouchableWithoutFeedback} from "react-native";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Text} from "react-native-elements";
import Routes from "../../../navigation/Routes";
import {StackActions} from "@react-navigation/native";
import {Styles} from "./Style";
import Globals from "../../../utils/Globals";
import AppButton from "../../../components/Application/AppButton/View";
import {commonLightStyles} from "../../../../branding/boozemart/styles/light/Style";
import AppConfig from "../../../../branding/App_config";
import {FocusAwareStatusBar} from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import Axios from 'axios';
import ApiUrls from "../../../utils/ApiUrls";
const fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const colors = AppConfig.lightColors.default;
import * as Keychain from 'react-native-keychain';

export const Variant3Intro = (props) => {

    //Theme based styling and colors
    const globalStyles = commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors);

    //Internal States
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [swipeCardData, setSwipeCardData] = useState([[{
        category_name: "N/A",
        category_Id: "0",
        description: "Your Favourite Products Coming UP!!!",
        image: ""
    }]]);

     useEffect(() => {
        setTimeout(() => {
            Axios.get(ApiUrls.SERVICE_URL + ApiUrls.GET_HSECREENS_API).then((succResp) =>{
                const scd = [[],[],[]];
                let catList = Array.from(new Set(succResp.data.map((item) => {return item.category_name})))
                catList.forEach((item, index) => {
                    scd[index] = succResp.data.filter((elem) => {
                        if(item === elem.category_name){
                            return elem;
                        }
                    })
                })
                console.log(scd[2])
                setSwipeCardData(scd);
            },(errorresp) =>{
                console.log("From error")
                console.log(JSON.stringify(errorresp));
            })
            }, 2000)
        }, [])

    //References
    let _carouselRef = useRef();

      const outerRef = createRef();
      const innerRefs = [];
      for (let i = 0; i < swipeCardData.length; i++) {
        innerRefs.push(createRef());
      }
      const renderRow = ({ item, index }) => {
        return (
          <Carousel
            loop={true}
            vertical={true}
            sliderHeight={hp("100%")}
            itemHeight= {hp("103.5%")}
            useScrollView={true}
            data={item}
            inactiveSlideScale={1}
            renderItem={(elem) => {
            const indexChild = elem.index;
            const itemChild = elem.item;
              return (
              <TouchableWithoutFeedback
                onPress={() => {
                      props.navigation.navigate(
                          Routes.CATEGORY_ITEMS, {
                              category: itemChild.category_name,
                              categoryId: itemChild.category_Id
                          }
                      );
                  }}>
                <View
                  style={{
                    flex: 1,
//                    width: wp("100%"),
                    height: hp("100%"),
                    backgroundColor:"#000"
                  }}>
                     {(indexChild != 0) &&
                     (<View style={{
                         width: wp("80%"),
                     }}><View style={{
                      position: "absolute",
                      backgroundColor: "#FFF",
                      opacity: 0.2,
                      height: hp("9"),
                      top: hp(5),
                      left: wp(10),
                      borderRadius: hp(2),
                      zIndex: 3, // works on ios
                        elevation: 3, // works on android
                      }}/>
                      <Text style={{
                      position: "absolute",
                      color: "#FFF",
                      fontWeight: 'bold',
                      top: hp(7.5),
                      left: wp(13),
                      fontSize: 20,
                      zIndex: 4, // works on ios
                        elevation: 4, // works on android
                      }}>{itemChild.description}</Text>
                      </View>) }

                      {(<Image
                          source={{uri: itemChild.image}}
                          style={{
                            width: undefined,
                            height: '100%',
                            aspectRatio: 1,
                            marginLeft: wp("-50%")
                          }}
                          resizeMode="contain"
                      />)}
                </View>
                </TouchableWithoutFeedback>
              );
            }}

            ref={innerRefs[index]}
          />
        );

      };
      return (
        <View style={screenStyles.container}>

                    <FocusAwareStatusBar translucent backgroundColor={"transparent"} barStyle="dark-content"/>

            {!(swipeCardData.length==1 && swipeCardData[0].length==1) && <Carousel
              loop={true}
              data={swipeCardData}
              inactiveSlideScale={1}
              renderItem={renderRow}
              sliderWidth={wp("100%")}
              itemWidth={wp("100%")}
              ref={outerRef}
                onSnapToItem={(index) => setActiveSlideIndex(index)}
            />}

            {(swipeCardData.length==1 && swipeCardData[0].length==1) &&
            <View style={{flex: 1,flexGrow: 1}}>
                        <Video source={require("./Assets/Splash.mp4")}   // Can be a URL or a localfile.
                                resizeMode={"cover"}
                                autoplay={true}
                                paused={false}
                                style={screenStyles.splashVideo}/>
                    </View>}




         <Pagination
         dotsLength={swipeCardData.length}
         activeDotIndex={activeSlideIndex}
         dotColor={colors.paginationDotActiveColor}
         inactiveDotColor={colors.primaryBackground}
         inactiveDotOpacity={0.8}
         inactiveDotScale={1}
         carouselRef={outerRef}
         dotStyle={screenStyles.paginationDotStyle}
         inactiveDotStyle={screenStyles.paginationInactiveDotStyle}
         containerStyle={screenStyles.paginationContainerStyle}
     />

             {/*</View>*/}

         {(swipeCardData.length>1) && <View style={screenStyles.introLowerContainer}>
             <AppButton
                 buttonStyle={{
                    width: wp("85%")
                 }}
                 title={activeSlideIndex === 0 ? "Get started" : "Skip"}
                 onPress={() => {
                    GoogleSignin.configure({
                         webClientId: '62455514535-pe322e7os1ok65ftturlepcim8mageu1.apps.googleusercontent.com',
                         offlineAccess: true,
                       });
                    GoogleSignin.hasPlayServices().then(() => {
                        GoogleSignin.isSignedIn().then(isSignedIn => {
                            if(isSignedIn)
                                props.navigation.dispatch(StackActions.replace(Routes.HOME_VARIANT3));
                            else{
                                try{
                                    Keychain.getGenericPassword().then(credentials => {
                                        if (credentials) {
                                              Axios.post(ApiUrls.SERVICE_URL + ApiUrls.VERIFY_JWT, null, {
                                                headers: {
                                                    userId: credentials.username,
                                                    token: "Bearer "+credentials.password
                                                }
                                              }).then(jwtAuthResp => {
                                                if(jwtAuthResp.data.status == 200){
                                                    props.navigation.dispatch(StackActions.replace(Routes.HOME_VARIANT3));
                                                } else {
                                                    props.navigation.dispatch(StackActions.replace(Routes.LOGIN_FORM_SCREEN3));
                                                }
                                              })
                                            } else {
                                                console.log('No credentials stored');
                                                props.navigation.dispatch(StackActions.replace(Routes.LOGIN_FORM_SCREEN3));
                                            }
                                    });
                                    } catch{
                                        console.log('No credentials stored');
                                        props.navigation.dispatch(StackActions.replace(Routes.LOGIN_FORM_SCREEN3));
                                    }
                                }
                        });
                    });

                 }}
             />
         </View>}

     </View>
);

};
