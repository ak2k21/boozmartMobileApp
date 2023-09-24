import React from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native-elements';
import Styles from "./Styles";
import Routes from "../../../navigation/Routes";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/Boozemart2/assets/IconNames";

export const ReorderItem = (props) => {

    //Props
    const {
        primaryTitle,
        secondaryTitle,
        img,
        ratingValue
    } = props;

    return (

        <TouchableWithoutFeedback onPress={() => {
            props.navigation.navigate(Routes.PRODUCT_DETAIL, {
                category: primaryTitle,
                item: props.item,
                userid: props.userid
            });
        }}>

            <View style={Styles.categoryItemContainer}>
                <View style={Styles.mainContainer}>
                    {((typeof img) == 'string')?
                    <Image source={{uri: img}} style={{height: "50%", width: "70%", resizeMode: "contain"}}/>:
                    <Image source={img} style={{height: "50%", width: "70%", resizeMode: "contain"}}/>}
                    <Text numberOfLines={1} style={[Styles.primaryTitle]}>{primaryTitle}</Text>
                    <Text style={Styles.secondaryTitle}>${secondaryTitle}</Text>
                    <View style={Styles.foodItemBox_rating}>
                    <SvgIcon type={IconNames.StarFull} width={15} height={15}
                         color={"#ce890c"}/>
                    <Text>{parseFloat(ratingValue).toFixed(1)}</Text>
                    </View>
                </View>
            </View>

        </TouchableWithoutFeedback>
    );
}
