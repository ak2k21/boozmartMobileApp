import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";

const Typography = AppConfig.typography.default;
const Fonts = AppConfig.fonts.default;

export const Styles = function (scheme, colors) {


    return {
        mainContainer: {
            flex: 1,
        },

        cardContainerStyle: {
            width: "100%",
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground,
            paddingVertical: hp(2.5),
            borderBottomWidth: 1,
            borderBottomColor: colors.borderColorLight,
            height: hp("80%")
        },

        firstCardContainerStyle: {
            marginTop: hp(0.25),
            borderTopLeftRadius: hp(0.75),
            borderTopRightRadius: hp(0.75),

        },

        othersTitle: {
            marginHorizontal: wp(3),
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            color: colors.headingColor
        },


        checkCircleImage: {
            position: "absolute",
            right: 0,
        },

        othersCardContainerStyle: {
            marginBottom: hp(2),
            borderBottomLeftRadius: hp(0.75),
            borderBottomRightRadius: hp(0.75),
            borderBottomWidth: 0,
        },

        categoriesCardParentContainerStyle: {
            borderRadius: hp(0.75),
            borderBottomWidth: 0,
            marginBottom: hp(3)
        },

        categoriesCardContainerStyle: {
            flexDirection: "column",
        },

        categoryParent: {
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground,
            flexDirection: "row",
            alignItems: "center",
            width: wp("60%"),
            paddingVertical: hp("1.5"),
        },

        categoryParentBorder: {
            borderBottomWidth: 1,
            borderBottomColor: colors.borderColorLight
        },

        categoryTitle: {
            marginHorizontal: wp(3),
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            color: colors.headingColor
        },


        priceContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },

        titleStyle: {
            fontSize: Typography.P3,
            fontFamily: Fonts.RUBIK_MEDIUM,
            marginBottom: hp(1),
            color: colors.headingColor
        },

        inputContainerStyle: {
            width: wp(38),
            backgroundColor: colors.inputSecondaryBackground,
            justifyContent: "center"
        },

        ratingContainerStyle: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.inputSecondaryBackground,
            height: hp(5.9),
            borderRadius: hp(0.75),
            paddingHorizontal: wp(5)
        },

        ratingTextStyle: {
            fontSize: Typography.P5,
            fontFamily: Fonts.RUBIK_REGULAR,
            color: colors.headingColor,
            flex: 1,
            textAlign: "right"
        },

        othersItemContainerStyle: {
            backgroundColor: scheme === "dark" ? colors.secondaryBackground : colors.primaryBackground,
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: hp("1.5"),
            borderBottomColor: colors.borderColorLight
        },


        scrollViewContainer: {
            flex: 1
        },

        bottomButtonContainer: {
            flex: 0.1,
            justifyContent: "center"
        },

         container: {
             flex: 1,
             flexDirection: 'row',
             justifyContent: 'center'
           },
           listTab: {
             backgroundColor: '#fff',
             flexDirection: 'column',
             justifyContent: 'flex-start',
             marginTop: 5,
             height: hp("90%"),
             backgroundColor: colors.inputSecondaryBackground
           },
           btnTab: {
             width: hp("18%"),
             flexDirection: 'row',
             paddingVertical: 7,
             backgroundColor: colors.inputSecondaryBackground
           },
            textTab: {
             fontSize: 16,
             textAlign: "left",
             paddingLeft: hp("1")
           },
           btnTabActive: {
             backgroundColor: '#FFFFFF',
             borderRadius: 5
           },
           textTabActive: {
             color: '#000000',
           },
           itemContainer: {
             justifyContent: 'flex-end',
             paddingLeft: wp("3%"),
           },
           itemName: {
             fontWeight: 'bold',
             fontSize: 20,
             marginBottom: 5
           },

    }


}

export default Styles;
