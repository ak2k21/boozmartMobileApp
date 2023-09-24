import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AppConfig from "../../../branding/App_config";

const Fonts = AppConfig.fonts.default;
const Typography = AppConfig.typography.default;

export const Styles = function (colors) {

    return {
        mainContainer: {
            flex: 1
        },

        parentContainer: {
            flex: 0.9,
            marginTop: hp(3)
        },

        bottomButton: {
            flex: 0.1,
            justifyContent: "center",
            position: "absolute",
            bottom: hp("1%")
        },

        defaultText: {
            marginLeft: hp(1),
            alignSelf: "center",
            fontFamily: Fonts.RUBIK_REGULAR,
            fontSize: Typography.P4,
            color: colors.headingColor
        },

        switchContainer: {
            flexDirection: "row",
            marginTop: hp(1)
        },

        dropdown1BtnStyle: {
            width: '100%',
            height: 60,
            backgroundColor: '#FFF',
            borderRadius: 8,
            marginTop: 2
            // borderWidth: 1,
            // borderColor: '#444',
          },
          dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
          dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
          dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
          dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

    }

}

export default Styles;
