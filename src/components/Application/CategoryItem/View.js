import React from 'react';
import {Image, ImageBackground, TouchableWithoutFeedback, View} from 'react-native';

import {Text} from 'react-native-elements';
import Styles from "./Styles";
import Routes from "../../../navigation/Routes";
import {SvgIcon} from "../SvgIcon/View";

export const CategoryItem = (props) => {

    //Props
    const {
        primaryTitle,
        primaryColor,
        secondaryTitle,
        secondaryColor,
        iconBgColor,
        iconURI,
        bgURI,
        img,
        id
    } = props;

    return (

        <TouchableWithoutFeedback onPress={() => {
            props.navigation.navigate(Routes.CATEGORY_ITEMS, {
                category: primaryTitle,
                categoryId: id,
                userId: props.userId
            });
        }}>

            <View style={Styles.categoryItemContainer}>

                <View style={Styles.mainContainer}>

                    <Image source={{uri: img}} style={{height: "60%", width: "70%", resizeMode: "contain"}}/>
                    <Text style={[Styles.secondaryTitle, {color: secondaryColor}]}>{secondaryTitle}</Text>
                    <Text style={[Styles.primaryTitle, {fontWeight: 'bold'}]}>{primaryTitle}</Text>

                </View>
            </View>

        </TouchableWithoutFeedback>

    );
}
