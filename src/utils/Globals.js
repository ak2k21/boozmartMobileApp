import Routes from "../navigation/Routes";
import {Animated} from "react-native";
import AppConfig from "../../branding/App_config";
import assets from "../../branding/Boozemart2/assets/Assets";
import {CommonActions} from "@react-navigation/native";
import Config from "../../branding/Boozemart2/configuration/Config";
import IconNames from "../../branding/Boozemart2/assets/IconNames";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';
import store from '../store/index';
import { commonActions } from '../store/commonStore'
const dispatch = store.dispatch

const colors = AppConfig.lightColors.default;

/**
 * App Constants
 */
class Globals {


    static SAFE_AREA_INSET = {}

    //Variant 1 Intro
    static intro1Items = [
        {
            title: "Welcome to the Boozemart2 App!",
            subtitle: "Here, you can browse and purchase a wide variety of drinks from your favorite brands. Whether you're looking for a refreshing beer, a smooth whiskey, or a delicious cocktail, we've got you covered.",
            headerImg: assets.intro1
        },
        {
            title: "Explore the App",
            subtitle: "To get started, create an account with us. This will allow you to save your favorite drinks, view your purchase history, and receive personalized recommendations. Plus, creating an account makes checkout a breeze.",
            headerImg: assets.intro2
        },
        {
            title: "Browse and shop",
            subtitle: "Once you've created your account, you can start browsing and shopping for your favorite drinks. Use the search bar to find specific products, or browse by category to discover new options. When you find something you like, simply add it to your cart and proceed to checkout. Happy shopping!",
            headerImg: assets.intro3
        },
        {
            title: "Same Day and Scheduled Delivery",
            subtitle: "Explore our app and find the perfect drink for any occasion. From classic cocktails to trendy new blends, we have something for everyone. Shop now and have your favorite liquors delivered right to your doorstep. It's never been easier to stock up on your favorite drinks.",
            headerImg: assets.intro4
        },
    ];

    //Variant 2 Intro
    static intro2Items = [
        {
            title: "Welcome to the Boozemart2 App!",
            subtitle: "Here, you can browse and purchase a wide variety of drinks from your favorite brands. Whether you're looking for a refreshing beer, a smooth whiskey, or a delicious cocktail, we've got you covered.",
            headerImg: IconNames.BagShopping,
            theme: "green"
        },
        {
            title: "Explore the App",
            subtitle: "To get started, create an account with us. This will allow you to save your favorite drinks, view your purchase history, and receive personalized recommendations. Plus, creating an account makes checkout a breeze.",
            headerImg: IconNames.Fish,
            theme: "red"
        },
        {
            title: "Browse and shop",
            subtitle: "Once you've created your account, you can start browsing and shopping for your favorite drinks. Use the search bar to find specific products, or browse by category to discover new options. When you find something you like, simply add it to your cart and proceed to checkout. Happy shopping!",
            headerImg: IconNames.Truck,
            theme: "blue"
        },
        {
            title: "Same Day and Scheduled Delivery",
            subtitle: "Explore our app and find the perfect drink for any occasion. From classic cocktails to trendy new blends, we have something for everyone. Shop now and have your favorite liquors delivered right to your doorstep. It's never been easier to stock up on your favorite drinks.",
            headerImg: IconNames.MoneyBillWave,
            theme: "orange"
        },
    ];

    //Variant 3 Intro
    static intro3Items = [
        {
            title: "Welcome to the Boozemart2 App!",
            subtitle: "Here, you can browse and purchase a wide variety of drinks from your favorite brands. Whether you're looking for a refreshing beer, a smooth whiskey, or a delicious cocktail, we've got you covered.",
            headerImg: assets.intro2_img1
        },
        {
            title: "Explore the App",
            subtitle: "To get started, create an account with us. This will allow you to save your favorite drinks, view your purchase history, and receive personalized recommendations. Plus, creating an account makes checkout a breeze.",
            headerImg: assets.intro2_img2
        },
        {
            title: "Browse and shop",
            subtitle: "Once you've created your account, you can start browsing and shopping for your favorite drinks. Use the search bar to find specific products, or browse by category to discover new options. When you find something you like, simply add it to your cart and proceed to checkout. Happy shopping!",
            headerImg: assets.intro2_img3
        },
        {
            title: "Same Day and Scheduled Delivery",
            subtitle: "Explore our app and find the perfect drink for any occasion. From classic cocktails to trendy new blends, we have something for everyone. Shop now and have your favorite liquors delivered right to your doorstep. It's never been easier to stock up on your favorite drinks.",
            headerImg: assets.intro2_img4
        },
    ];

    //Grocery Products
    static foodItems = [
        {
            id: 1,
            title: "Don Julio 1942 Anejo Tequila",
            image: require("../components/Application/FoodItem/Assets/Images/one.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/one.jpeg"),
            price: "$1.22",
            weight: "1.25 L",
            discount: "15%",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 2,
            title: "Bareksten Navy Strength Gin",
            image: require("../components/Application/FoodItem/Assets/Images/two.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/two.jpeg"),
            price: "$2.35",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 3,
            title: "Earl Stevens Mangoscato",
            image: require("../components/Application/FoodItem/Assets/Images/three.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/three.png"),
            price: "$1.22",
            weight: "E-40 Wine",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 4,
            title: "Buffalo Trace Bourbon Whiskey",
            image: require("../components/Application/FoodItem/Assets/Images/four.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/four.png"),
            price: "$4.99",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 5,
            title: "Crown Royal Peach Whiskey",
            image: require("../components/Application/FoodItem/Assets/Images/v1.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/v1.jpeg"),
            price: "$1.22",
            weight: "1.25 L",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 6,
            title: "Tequila Clase Azul Reposado",
            image: require("../components/Application/FoodItem/Assets/Images/six.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/six.png"),
            price: "$8.99",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 7,
            title: "Don Julio 1942 Anejo Tequila",
            image: require("../components/Application/FoodItem/Assets/Images/one.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/one.jpeg"),
            price: "$1.22",
            weight: "1.25 L",
            discount: "15%",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 8,
            title: "Bareksten Navy Strength Gin",
            image: require("../components/Application/FoodItem/Assets/Images/two.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/two.jpeg"),
            price: "$2.35",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 9,
            title: "Earl Stevens Mangoscato",
            image: require("../components/Application/FoodItem/Assets/Images/three.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/three.png"),
            price: "$1.22",
            weight: "E-40 Wine",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 10,
            title: "Buffalo Trace Bourbon Whiskey",
            image: require("../components/Application/FoodItem/Assets/Images/four.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/four.png"),
            price: "$4.99",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 11,
            title: "Crown Royal Peach Whiskey",
            image: require("../components/Application/FoodItem/Assets/Images/v1.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/v1.jpeg"),
            price: "$1.22",
            weight: "1.25 L",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 12,
            title: "Tequila Clase Azul Reposado",
            image: require("../components/Application/FoodItem/Assets/Images/six.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/six.png"),
            price: "$8.99",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 13,
            title: "Don Julio 1942 Anejo Tequila",
            image: require("../components/Application/FoodItem/Assets/Images/one.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/one.jpeg"),
            price: "$1.22",
            weight: "1.25 L",
            discount: "15%",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 14,
            title: "Bareksten Navy Strength Gin",
            image: require("../components/Application/FoodItem/Assets/Images/two.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/two.jpeg"),
            price: "$2.35",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 15,
            title: "Earl Stevens Mangoscato",
            image: require("../components/Application/FoodItem/Assets/Images/three.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/three.png"),
            price: "$1.22",
            weight: "E-40 Wine",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 16,
            title: "Buffalo Trace Bourbon Whiskey",
            image: require("../components/Application/FoodItem/Assets/Images/four.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/four.png"),
            price: "$4.99",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 17,
            title: "Crown Royal Peach Whiskey",
            image: require("../components/Application/FoodItem/Assets/Images/v1.jpeg"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/v1.jpeg"),
            price: "$1.22",
            weight: "1.25 L",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        },
        {
            id: 18,
            title: "Tequila Clase Azul Reposado",
            image: require("../components/Application/FoodItem/Assets/Images/six.png"),
            bigImage: require("../components/Application/FoodItem/Assets/Images/six.png"),
            price: "$8.99",
            weight: "750 ml",
            cartCount: 0,
            isFavourite: false,
            detail: "Our wine bottle is made from high-quality materials and designed to enhance the taste and aroma of the wine within. The bottle is carefully crafted to ensure that it is both elegant and functional, with a sleek and modern design that will look great on any table or wine rack. So why wait? Order your bottle of wine today and experience the perfect combination of flavor, elegance, and sophistication that only the finest wines can offer.",
            ratingValue: "4.5 (1300)"
        }
    ];

    static categoryList = [

            {
                id: 1,
                secondaryTitle: "",
                secondaryColor: "#7ad228",
                primaryTitle: "Beer",
                primaryColor: "#519610",
                iconBgColor: "#7ad027",
                iconURI:IconNames.Beer,
                bgURI: require('../screens/Variant3/Home/Assets/img/beer.png'),
                selected: true,
            },
            {
                id: 2,
                secondaryTitle: "",
                secondaryColor: "#FF4344",
                primaryTitle: "Wine",
                primaryColor: "#DD2021",
                iconBgColor: "#ff4244",
                iconURI:IconNames.Wine,
                bgURI: require('../screens/Variant3/Home/Assets/img/wine1.jpeg'),
                selected: false,
            },
            {
                id: 3,
                secondaryTitle: "",
                secondaryColor: "#ffa200",
                primaryTitle: "Whiskey",
                primaryColor: "#ee7b00",
                iconBgColor: "#ffa200",
                iconURI:IconNames.Whiskey,
                bgURI: require('../screens/Variant3/Home/Assets/img/whiskey.png'),
                selected: false,
            },
            {
                id: 4,
                secondaryTitle: "",
                secondaryColor: "#1faaff",
                primaryTitle: "Vodka",
                primaryColor: "#0076be",
                iconBgColor: "#20a9ff",
                iconURI: IconNames.Vodka,
                bgURI: require('../screens/Variant3/Home/Assets/img/vodka.png'),
                selected: false,
            },
            {
                id: 5,
                secondaryTitle: "",
                secondaryColor: "#18e2d6",
                primaryTitle: "Tequila",
                primaryColor: "#09bcb1",
                iconBgColor: "#1ae1d5",
                iconURI:IconNames.Tequila,
                bgURI: require('../screens/Variant3/Home/Assets/img/tequila.png'),
                selected: false,
            },
            {
                id: 6,
                secondaryTitle: "",
                secondaryColor: "#D250E9",
                primaryTitle: "Rum",
                primaryColor: "#A627BC",
                iconBgColor: "#d24fe9",
                iconURI:IconNames.Rum,
                bgURI: require('../screens/Variant3/Home/Assets/img/rum.png'),
                selected: false,
            },
            {
                id: 7,
                secondaryTitle: "",
                secondaryColor: "#E26D3F",
                primaryTitle: "Gin",
                primaryColor: "#B24E27",
                iconBgColor: "#e26e3e",
                iconURI: IconNames.Gin,
                bgURI: require('../screens/Variant3/Home/Assets/img/gin.png'),
                selected: false,
            },
            {
                id: 8,
                secondaryTitle: "",
                secondaryColor: "#9DB6CF",
                primaryTitle: "Mezcal",
                primaryColor: "#7A91A8",
                iconBgColor: "#9db5cf",
                iconURI: IconNames.Mezcal,
                bgURI: require('../screens/Variant3/Home/Assets/img/mezcal.png'),
                selected: false,
            },
            {
                id: 9,
                secondaryTitle: "",
                secondaryColor: "#7AD228",
                primaryTitle: "Liqueur",
                primaryColor: "#519610",
                iconBgColor: "#a3db19",
                iconURI: IconNames.Liqueur,
                bgURI: require('../screens/Variant3/Home/Assets/img/liqueur.png'),
                selected: false,
            },
            {
                id: 10,
                secondaryTitle: "",
                secondaryColor: "#B6833D",
                primaryTitle: "Brandy",
                primaryColor: "#A26E27",
                iconBgColor: "#b5833b",
                iconURI: IconNames.Brandy,
                bgURI: require('../screens/Variant3/Home/Assets/img/brandy.png'),
                selected: false,
            },
            {
                id: 11,
                secondaryTitle: "",
                secondaryColor: "#C5150C",
                primaryTitle: "Soda",
                primaryColor: "#A8130B",
                iconBgColor: "#c6160c",
                iconURI:IconNames.Soda,
                bgURI: require('../screens/Variant3/Home/Assets/img/soda.png'),
                selected: false,
            },
            {
                id: 12,
                secondaryTitle: "",
                secondaryColor: "#2A56F5",
                primaryTitle: "Mixers",
                primaryColor: "#1E40BD",
                iconBgColor: "#2a56f5",
                iconURI: IconNames.Mixers,
                bgURI: require('../screens/Variant3/Home/Assets/img/mixers.png'),
                selected: false,
            }
        ];

    //Product Categories
    static categoryItems = [

        {
            id: 1,
            secondaryTitle: "",
            secondaryColor: "#7ad228",
            primaryTitle: "Beer",
            primaryColor: "#519610",
            iconBgColor: "#7ad027",
            iconURI:IconNames.Beer,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Beer.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Beer1.png'),
            selected: true,
        },
        {
            id: 2,
            secondaryTitle: "",
            secondaryColor: "#FF4344",
            primaryTitle: "Wine",
            primaryColor: "#DD2021",
            iconBgColor: "#ff4244",
            iconURI:IconNames.Wine,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Wine.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/w3.jpeg'),
            selected: false,
        },
        {
            id: 3,
            secondaryTitle: "",
            secondaryColor: "#ffa200",
            primaryTitle: "Whiskey",
            primaryColor: "#ee7b00",
            iconBgColor: "#ffa200",
            iconURI:IconNames.Whiskey,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Whiskey.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/wine1.jpeg'),
            selected: false,
        },
        {
            id: 4,
            secondaryTitle: "",
            secondaryColor: "#1faaff",
            primaryTitle: "Vodka",
            primaryColor: "#0076be",
            iconBgColor: "#20a9ff",
            iconURI: IconNames.Vodka,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Vodka.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Vodka1.png'),
            selected: false,
        },
        {
            id: 5,
            secondaryTitle: "",
            secondaryColor: "#18e2d6",
            primaryTitle: "Tequila",
            primaryColor: "#09bcb1",
            iconBgColor: "#1ae1d5",
            iconURI:IconNames.Tequila,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Tequila.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Tequila1.png'),
            selected: false,
        },
        {
            id: 6,
            secondaryTitle: "",
            secondaryColor: "#D250E9",
            primaryTitle: "Rum",
            primaryColor: "#A627BC",
            iconBgColor: "#d24fe9",
            iconURI:IconNames.Rum,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Rum.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Rum1.png'),
            selected: false,
        },
        {
            id: 7,
            secondaryTitle: "",
            secondaryColor: "#E26D3F",
            primaryTitle: "Gin",
            primaryColor: "#B24E27",
            iconBgColor: "#e26e3e",
            iconURI: IconNames.Gin,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Gin.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Gin1.png'),
            selected: false,
        },
        {
            id: 8,
            secondaryTitle: "",
            secondaryColor: "#9DB6CF",
            primaryTitle: "Mezcal",
            primaryColor: "#7A91A8",
            iconBgColor: "#9db5cf",
            iconURI: IconNames.Mezcal,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Mezcal.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Mezcal1.png'),
            selected: false,
        },
        {
            id: 9,
            secondaryTitle: "",
            secondaryColor: "#7AD228",
            primaryTitle: "Liqueur",
            primaryColor: "#519610",
            iconBgColor: "#a3db19",
            iconURI: IconNames.Liqueur,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Liqueur.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/liqueur1.png'),
            selected: false,
        },
        {
            id: 10,
            secondaryTitle: "",
            secondaryColor: "#B6833D",
            primaryTitle: "Brandy",
            primaryColor: "#A26E27",
            iconBgColor: "#b5833b",
            iconURI: IconNames.Brandy,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Brandy.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Brandy1.png'),
            selected: false,
        },
        {
            id: 11,
            secondaryTitle: "",
            secondaryColor: "#C5150C",
            primaryTitle: "Soda",
            primaryColor: "#A8130B",
            iconBgColor: "#c6160c",
            iconURI:IconNames.Soda,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Soda.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Soda1.png'),
            selected: false,
        },
        {
            id: 12,
            secondaryTitle: "",
            secondaryColor: "#2A56F5",
            primaryTitle: "Mixers",
            primaryColor: "#1E40BD",
            iconBgColor: "#2a56f5",
            iconURI: IconNames.Mixers,
            bgURI: require('../components/Application/CategoryItem/Assets/Images/Mixers.png'),
            img: require('../components/Application/CategoryItem/Assets/Images/Mixers1.png'),
            selected: false,
        }
    ];

    //Addresses
    static addressItems = [
        {
            id: 0,
            isDefault: true,
            name: 'William Crown',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            city: "California",
            state: "United States",
            postalCode: "77547",

            isActive: false,

            spinValue: new Animated.Value(0)
        },
        {
            id: 1,
            isDefault: false,
            name: 'John Doe',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            city: "California",
            state: "United States",
            postalCode: "77547",

            isActive: false,

            spinValue: new Animated.Value(0)

        },
        {
            id: 2,
            isDefault: false,
            name: 'William Crown',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            city: "California",
            state: "United States",
            postalCode: "77547",

            isActive: false,

            spinValue: new Animated.Value(0)

        },
        {
            id: 3,
            isDefault: false,
            name: 'John Doe',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            isActive: false,

            city: "California",
            state: "United States",
            postalCode: "77547",

            spinValue: new Animated.Value(0)
        },
        {
            id: 4,
            isDefault: false,
            name: 'William Crown',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            isActive: false,

            city: "California",
            state: "United States",
            postalCode: "77547",

            spinValue: new Animated.Value(0)
        },
        {
            id: 5,
            isDefault: false,
            name: 'John Doe',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            isActive: false,

            city: "California",
            state: "United States",
            postalCode: "77547",

            spinValue: new Animated.Value(0)
        }
    ];

    //Self Pickup Addresses
    static selfPickupAddresses = [
        {
            id: 1,
            isDefault: false,
            name: 'Boozemart2 Bay Area',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            city: "California",
            state: "United States",
            postalCode: "77547",

            isActive: false,

            spinValue: new Animated.Value(0)

        },
        {
            id: 2,
            isDefault: false,
            name: 'Boozemart2 Downtown',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            city: "California",
            state: "United States",
            postalCode: "77547",

            isActive: false,

            spinValue: new Animated.Value(0)

        },
        {
            id: 3,
            isDefault: false,
            name: 'Boozemart2 5th Avenue',
            address: "2811 Crescent Day, LA Port California, United States, 77511",
            phone: "+1 122 541 1234",

            isActive: false,

            city: "California",
            state: "United States",
            postalCode: "77547",

            spinValue: new Animated.Value(0)
        }
    ];

    //Payment Methods
    static paymentMethodItems = {

        cardItems: [
            {
                id: 0,
                isDefault: true,
                isActive: true,

                type: 'Master Card',
                cardNo: "XXXX XXXX XXXX 3694",
                completeCardNo: "1234 5678 1234 5678",
                cardHolderName: "John Doe",
                expiry: "01/25",
                CVV: "512",

                spinValue: new Animated.Value(0)
            },
            {
                id: 1,
                isDefault: false,
                isActive: false,


                type: 'Visa Card',
                cardNo: "XXXX XXXX XXXX 3694",
                completeCardNo: "5678 1234 5678 1234",
                cardHolderName: "William Crown",
                expiry: "01/25",
                CVV: "512",

                spinValue: new Animated.Value(0)
            },
            {
                id: 2,
                isDefault: false,
                isActive: false,

                type: 'Master Card',
                cardNo: "XXXX XXXX XXXX 3694",
                completeCardNo: "1234 5678 1234 5678",
                cardHolderName: "John Doe",
                expiry: "01/25",
                CVV: "512",

                spinValue: new Animated.Value(0)
            },
            {
                id: 3,
                isDefault: false,
                isActive: false,

                type: 'Visa Card',
                cardNo: "XXXX XXXX XXXX 3694",
                completeCardNo: "5678 1234 5678 1234",
                cardHolderName: "William Crown",
                expiry: "01/25",
                CVV: "512",

                spinValue: new Animated.Value(0)
            },
            {
                id: 4,
                isDefault: false,
                isActive: false,


                type: 'Master Card',
                cardNo: "XXXX XXXX XXXX 3694",
                completeCardNo: "1234 5678 1234 5678",
                cardHolderName: "John Doe",
                expiry: "01/25",
                CVV: "512",

                spinValue: new Animated.Value(0)
            },
            {
                id: 5,
                isDefault: false,
                isActive: false,


                type: 'Visa Card',
                cardNo: "XXXX XXXX XXXX 3694",
                completeCardNo: "5678 1234 5678 1234",
                cardHolderName: "William Crown",
                expiry: "01/25",
                CVV: "512",

                spinValue: new Animated.Value(0)
            }
        ],
        paypalItems: [
            {
                id: 0,
                isDefault: true,
                isActive: true,

                company: 'Paypal',
                name: 'Katherine Muguel',
                email: "gfx********@gmail.com",
                addedOn: "11/07/2020",

                spinValue: new Animated.Value(0)

            },
            {
                id: 1,
                isDefault: false,
                isActive: false,

                company: 'Paypal',
                name: 'William J Brown',
                email: "gfx********@gmail.com",
                addedOn: "11/07/2020",

                spinValue: new Animated.Value(0)

            },
            {
                id: 2,
                isDefault: false,
                isActive: false,

                company: 'Paypal',
                name: 'Jasson Blue',
                email: "gfx********@gmail.com",
                addedOn: "11/07/2020",

                spinValue: new Animated.Value(0)

            },
            {
                id: 3,
                isDefault: false,
                isActive: false,

                company: 'Paypal',
                name: 'Katherine Muguel',
                email: "gfx********@gmail.com",
                addedOn: "11/07/2020",

                spinValue: new Animated.Value(0)

            },
            {
                id: 4,
                isDefault: false,
                isActive: false,

                company: 'Paypal',
                name: 'William J Brown',
                email: "gfx********@gmail.com",
                addedOn: "11/07/2020",

                spinValue: new Animated.Value(0)

            },
            {
                id: 5,
                isDefault: false,
                isActive: false,

                company: 'Paypal',
                name: 'Jasson Blue',
                email: "gfx********@gmail.com",
                addedOn: "11/07/2020",

                spinValue: new Animated.Value(0)

            }
        ],
        paymentMethods: [
            {
                id: 1,
                isActive: true,
                icon: IconNames.CreditCard,
                type: 'Credit Card',
            },
            {
                id: 2,
                isActive: false,
                icon: IconNames.Apple,
                type: 'Apple Pay',
            },
            {
                id: 3,
                isActive: false,
                icon: IconNames.MoneyBillWave,
                type: 'Cash on Delivery',
            },

        ]

    }

    //Favourite List
    static favouritesList = [
        {
            id: 1,
            backgroundColor: "#6cc51d",
            itemLabel: "Wine",
            selected: false
        },
        {
            id: 2,
            backgroundColor: "#bf0d3f",
            itemLabel: "Champagne",
            selected: true
        },
        {
            id: 3,
            backgroundColor: "#f88e11",
            itemLabel: "Lemon-Lime Soda",
            selected: false
        },
        {
            id: 4,
            backgroundColor: "#efb019",
            itemLabel: "Beer",
            selected: false
        },
        {
            id: 5,
            backgroundColor: "#b71dc5",
            itemLabel: "Vodka",
            selected: false
        },
        {
            id: 6,
            backgroundColor: "#1d68c5",
            itemLabel: "Tequila",
            selected: false
        },
        {
            id: 7,
            backgroundColor: "#1dafc5",
            itemLabel: "Rum",
            selected: false
        },
        {
            id: 8,
            backgroundColor: "#ccb7cc",
            itemLabel: "Gin",
            selected: false
        }
    ]


    //Favourite Products
    static favouriteItems = [
        {
            id: 0,
            name: 'Wine',
            totalItems: "4",
            addedOn: "11/07/2020",
            color: colors.activeColor,
            img: require("../components/Application/CategoryItem/Assets/Images/Beer1.png"),
            items: Globals.foodItems.slice(0, 4),

            spinValue: new Animated.Value(0)
        },
        {
            id: 1,
            name: 'Champagne',
            totalItems: "6",
            addedOn: "11/07/2020",
            color: colors.red,
            img: require("../components/Application/CategoryItem/Assets/Images/Tequila1.png"),
            items: Globals.foodItems.slice(0, 6),

            spinValue: new Animated.Value(0)
        },
        {
            id: 2,
            name: 'Lemon-Lime Soda',
            totalItems: "2",
            addedOn: "11/07/2020",
            color: colors.orange,
            img: require("../components/Application/CategoryItem/Assets/Images/w3.jpeg"),
            items: Globals.foodItems.slice(0, 2),

            spinValue: new Animated.Value(0)
        },
        {
            id: 3,
            name: 'Beer',
            totalItems: "7",
            addedOn: "11/07/2020",
            color: colors.purple,
            img: require("../components/Application/CategoryItem/Assets/Images/Mixers1.png"),
            items: Globals.foodItems.slice(0, 7),

            spinValue: new Animated.Value(0)
        },
    ]

    //Search History
    static searchHistoryItems = [
        "Bacardi Classic",
        "Champagne",
        "Columbia Crest",
        "Kim Crawford",
        "Apothic Red",
        "Avey Brewing",
    ]

    //Transactions
    static transactionItems = [
        {
            id: 1,
            type: 'Master Card',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 2,
            type: 'Visa',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 3,
            type: 'Paypal',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 4,
            type: 'Master Card',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 5,
            type: 'Paypal',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 6,
            type: 'Visa',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 7,
            type: 'Master Card',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 8,
            type: 'Visa',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 9,
            type: 'Paypal',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 10,
            type: 'Visa',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 11,
            type: 'Master Card',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 12,
            type: 'Master Card',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 13,
            type: 'Paypal',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 14,
            type: 'Visa',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        },
        {
            id: 15,
            type: 'Master Card',
            date: "Dec 10, 2020 at 10:00 PM",
            price: "$16.99",
        }
    ];

    //Orders
    static ordersItems = [
        {
            id: 1,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: true,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: true,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: true,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Pending",
            isOrderDelivered: false,
            orderDelivered: "Pending",

            spinValue: new Animated.Value(0)
        },
        {
            id: 2,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: true,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: true,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: true,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Pending",
            isOrderDelivered: false,
            orderDelivered: "Pending",

            spinValue: new Animated.Value(0)

        },
        {
            id: 3,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: true,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: true,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: true,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Pending",
            isOrderDelivered: false,
            orderDelivered: "Pending",

            spinValue: new Animated.Value(0)

        },
        {
            id: 4,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: true,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: true,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: true,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Pending",
            isOrderDelivered: false,
            orderDelivered: "Pending",

            spinValue: new Animated.Value(0)

        },
        {
            id: 5,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: true,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: true,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: true,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Pending",
            isOrderDelivered: false,
            orderDelivered: "Pending",

            spinValue: new Animated.Value(0)

        },
        {
            id: 6,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: true,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: true,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: true,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Pending",
            isOrderDelivered: false,
            orderDelivered: "Pending",

            spinValue: new Animated.Value(0)

        },
        {
            id: 7,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: false,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: false,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: false,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Dec 10, 2022",
            isOrderDelivered: true,
            orderDelivered: "Dec 10, 2022",

            spinValue: new Animated.Value(0)

        },
        {
            id: 8,
            title: 'First',
            orderNo: "Order # 44698",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',

            isOrderPlaced: false,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: false,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: false,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Dec 10, 2022",
            isOrderDelivered: true,
            orderDelivered: "Dec 10, 2022",

            spinValue: new Animated.Value(0)

        },
        {
            id: 9,
            title: 'First',
            orderNo: "Order # 4469812",
            dateTime: "Placed on December 15, 2022",
            items: '10',
            total: '$16.99',


            isOrderPlaced: false,
            orderPlaced: "Dec 10, 2022",
            isOrderConfirmed: false,
            orderConfirmed: "Dec 10, 2022",
            isOrderShipped: false,
            orderShipped: "Dec 10, 2022",
            isOrderOutOfDelivery: false,
            outOfDelivery: "Dec 10, 2022",
            isOrderDelivered: true,
            orderDelivered: "Dec 10, 2022",


            spinValue: new Animated.Value(0)

        },
    ];

    //Product Reviews List
    static reviewsList = [
        {
            id: 1,
            profileImage: require('../screens/ReviewList/Assets/Images/review_author_img1.png'),
            fullName: "David Martin",
            reviewTime: "32 minutes ago",
            rating: 4.5,
            comment: "Boozemart2 team is fast and always deliver drinks. Highly Recommend!"
        },
        {
            id: 2,
            profileImage: require('../screens/ReviewList/Assets/Images/review_author_img2.png'),
            fullName: "David Martin",
            reviewTime: "32 minutes ago",
            rating: 3.5,
            comment: "Best apples on the market hands down. I almost order them everyday."
        },
        {
            id: 3,
            profileImage: require('../screens/ReviewList/Assets/Images/review_author_img3.png'),
            fullName: "David Martin",
            reviewTime: "32 minutes ago",
            rating: 5,
            comment: "Boozemart2 team is fast and always deliver drinks. Highly Recommend!"
        },
        {
            id: 4,
            profileImage: require('../screens/ReviewList/Assets/Images/review_author_img4.png'),
            fullName: "David Martin",
            reviewTime: "32 minutes ago",
            rating: 4,
            comment: "Best apples on the market hands down. I almost order them everyday."
        },
        {
            id: 5,
            profileImage: require('../screens/ReviewList/Assets/Images/review_author_img1.png'),
            fullName: "David Martin",
            reviewTime: "32 minutes ago",
            rating: 4.5,
            comment: "Boozemart2 team is fast and always deliver fresh fruits. Highly Recommend!"
        }


    ]

    //Profile List
    static profileList = (navigation, userid) => {
        return [
            {
                id: 1,
                icon: IconNames.SimpleUserFull,
                title: "About me",
                color: "black",
                onPress: () => navigation.push(Routes.ABOUT_ME,{userid: userid})
            },
            {
                id: 2,
                icon: IconNames.ShoppingBagsFull,
                title: "My Orders",
                color: "blue",
                onPress: () => navigation.push(Routes.MY_ORDERS,{userid})
            },
            {
                id: 3,
                icon: IconNames.LocationDotFull,
                title: "My Addresses",
                color: "blue",
                onPress: () => navigation.push(Routes.My_Address,{userid})
            },
            {
                id: 4,
                icon: IconNames.CreditCardFull,
                title: "Credit Cards",
                color: "blue",
                onPress: () => navigation.push(Routes.My_CREDIT_CARDS,{userid})
            },
            {
                id: 5,
                icon: IconNames.Cash,
                title: "Transactions",
                color: "green",
                onPress: () => navigation.push(Routes.TRANSACTIONS,{userid})
            },
            {
                id: 6,
                icon: IconNames.BellFull,
                title: "Notifications",
                color: "red",
                onPress: () => navigation.push(Routes.NOTIFICATIONS,{userid})
            },
//            {
//                id: 7,
//                icon: IconNames.CategoriesFull,
//                title: "Categories",
//                color: "blue",
//                onPress: () => navigation.navigate(Routes.CATEGORY_LIST)
//            },
            {
                id: 8,
                icon: IconNames.LogoffFull,
                title: "Sign out",
                color: "red",
                onPress: async () => {
                    await GoogleSignin.signOut();
                    await Keychain.resetGenericPassword();
                    await dispatch(commonActions.setUserGoogleData({
                        photo: "",
                        name: "",
                        email: ""
                    }));
                    await dispatch(commonActions.setUserTokenCredentials({
                        username: "",
                        password: ""
                    }));
                    await dispatch(commonActions.setCartCount(0))
                    await dispatch(commonActions.setUserId(-1));
                    navigation.dispatch(CommonActions.reset({
                        index: 1,
                        routes: [
                            {name: Routes.LOGIN_FORM_SCREEN3},
                        ],
                    }))
                }
            },
            {
                id: 9,
                icon: IconNames.LogoffFull,
                title: "Sign in",
                color: "red",
                onPress: () => {
                    navigation.dispatch(CommonActions.reset({
                        index: 1,
                        routes: [
                            {name: Routes.LOGIN_FORM_SCREEN3},
                        ],
                    }))
                }
            },
        ]
    }

    //Filter Other Items
    static otherFilters = [
        {
            id: 1,
            leftIcon: IconNames.Tag,
            title: "Discount",
            checked: false
        },
        {
            id: 2,
            leftIcon: IconNames.ParachuteBox,
            title: "Same Day Delivery",
            checked: false
        },
        {
            id: 3,
            leftIcon: IconNames.Truck,
            title: "Free Shipping",
            checked: false
        }

    ]

    //Filter Categories
    static filterCategories = [
        {
            id: 1,
            leftIcon: IconNames.Lemon,
            title: "Beer",
            checked: false
        },
        {
            id: 2,
            leftIcon: IconNames.Turkey,
            title: "Wine",
            checked: false
        },
        {
            id: 3,
            leftIcon: IconNames.BreadSlice,
            title: "Whiskey",
            checked: false
        },
        {
            id: 4,
            leftIcon: IconNames.Fish,
            title: "Vodka",
            checked: false
        },
        {
            id: 5,
            leftIcon: IconNames.Carrot,
            title: "Tequila",
            checked: false
        },
        {
            id: 6,
            leftIcon: IconNames.Salad,
            title: "Rum",
            checked: false
        },
        {
            id: 7,
            leftIcon: IconNames.HeartBeat,
            title: "Gin",
            checked: false
        },
        {
            id: 8,
            leftIcon: IconNames.Dog,
            title: "Mezcal",
            checked: false
        },
        {
            id: 9,
            leftIcon: IconNames.BirthdayCake,
            title: "Liqueur",
            checked: false
        },
        {
            id: 10,
            leftIcon: IconNames.PizzaSlice,
            title: "Brandy",
            checked: false
        },
        {
            id: 11,
            leftIcon: IconNames.BabyCarriage,
            title: "Soda",
            checked: false
        },
        {
            id: 12,
            leftIcon: IconNames.TableTennis,
            title: "Mixers",
            checked: false
        }
    ];

    static subCategories = {
      "beer": [
        {"id": 0, "name": "Ale"},
        {"id": 1, "name": "Lager"},
        {"id": 2, "name": "Stout"},
        {"id": 3, "name": "Pilsner"},
        {"id": 4, "name": "IPA"}
      ],
      "wine": [
        {"id": 0, "name": "Red Wine"},
        {"id": 1, "name": "White Wine"},
        {"id": 2, "name": "Rose Wine"},
        {"id": 3, "name": "Sparkling Wine"},
        {"id": 4, "name": "Dessert Wine"}
      ],
      "whiskey": [
        {"id": 0, "name": "Bourbon"},
        {"id": 1, "name": "Scotch"},
        {"id": 2, "name": "Irish Whiskey"},
        {"id": 3, "name": "Canadian Whiskey"},
        {"id": 4, "name": "Japanese Whiskey"}
      ],
      "vodka": [
        {"id": 0, "name": "Plain Vodka"},
        {"id": 1, "name": "Flavored Vodka"},
        {"id": 2, "name": "Potato Vodka"},
        {"id": 3, "name": "Wheat Vodka"},
        {"id": 4, "name": "Rye Vodka"}
      ],
      "tequila": [
        {"id": 0, "name": "Blanco Tequila"},
        {"id": 1, "name": "Reposado Tequila"},
        {"id": 2, "name": "Anejo Tequila"},
        {"id": 3, "name": "Extra Anejo Tequila"},
        {"id": 4, "name": "Mezcal Tequila"}
      ],
      "rum": [
        {"id": 0, "name": "White Rum"},
        {"id": 1, "name": "Dark Rum"},
        {"id": 2, "name": "Spiced Rum"},
        {"id": 3, "name": "Gold Rum"},
        {"id": 4, "name": "Overproof Rum"}
      ],
      "gin": [
        {"id": 0, "name": "London Dry Gin"},
        {"id": 1, "name": "Plymouth Gin"},
        {"id": 2, "name": "Old Tom Gin"},
        {"id": 3, "name": "Genever Gin"},
        {"id": 4, "name": "New Western Dry Gin"}
      ],
      "mezcal": [
        {"id": 0, "name": "Joven Mezcal"},
        {"id": 1, "name": "Reposado Mezcal"},
        {"id": 2, "name": "Anejo Mezcal"},
        {"id": 3, "name": "Extra Anejo Mezcal"}
      ],
      "liqueur": [
        {"id": 0, "name": "Coffee Liqueur"},
        {"id": 1, "name": "Orange Liqueur"},
        {"id": 2, "name": "Amaretto Liqueur"},
        {"id": 3, "name": "Irish Cream Liqueur"},
        ],
        "brandy": [
        {"id": 1, "name": "Cognac"},
        {"id": 2, "name": "Armagnac"},
        {"id": 3, "name": "American brandy"},
        {"id": 4, "name": "fruit brandy"},
        {"id": 5, "name": "grape brandy"}
        ],
        "soda": [
        {"id": 1, "name": "cola"},
        {"id": 2, "name": "lemon-lime soda"},
        {"id": 3, "name": "orange soda"},
        {"id": 4, "name": "root beer"},
        {"id": 5, "name": "ginger ale"},
        {"id": 6, "name": "tonic water"},
        {"id": 7, "name": "club soda"}
        ],
        "mixers": [
        {"id": 1, "name": "sour mix"},
        {"id": 2, "name": "simple syrup"},
        {"id": 3, "name": "grenadine"},
        {"id": 4, "name": "bitters"},
        {"id": 5, "name": "vermouth"},
        {"id": 6, "name": "fruit juice"},
        {"id": 7, "name": "soda water"},
        {"id": 8, "name": "energy drinks"}
        ]
    };

    static brands = {
        "beer": [
            {
                "id": 1,
                "name": "Budweiser",
                "selected": false
            },
            {
                "id": 2,
                "name": "Heineken",
                "selected": false
            },
            {
                "id": 3,
                "name": "Guinness",
                "selected": false
            },
            {
                "id": 4,
                "name": "Corona",
                "selected": false
            },
            {
                "id": 5,
                "name": "Stella Artois",
                "selected": false
            },
            {
                "id": 6,
                "name": "Becks",
                "selected": false
            },
            {
                "id": 7,
                "name": "Miller Lite",
                "selected": false
            },
            {
                "id": 8,
                "name": "Coors Light",
                "selected": false
            },
            {
                "id": 9,
                "name": "Dos Equis",
                "selected": false
            },
            {
                "id": 10,
                "name": "Sierra Nevada",
                "selected": false
            }
        ],
        "wine": [
            {
                "id": 1,
                "name": "Beringer",
                "selected": false
            },
            {
                "id": 2,
                "name": "Yellow Tail",
                "selected": false
            },
            {
                "id": 3,
                "name": "Kendall-Jackson",
                "selected": false
            },
            {
                "id": 4,
                "name": "Robert Mondavi",
                "selected": false
            },
            {
                "id": 5,
                "name": "Coppola",
                "selected": false
            },
            {
                "id": 6,
                "name": "Kim Crawford",
                "selected": false
            },
            {
                "id": 7,
                "name": "Chateau Ste. Michelle",
                "selected": false
            },
            {
                "id": 8,
                "name": "Cakebread",
                "selected": false
            },
            {
                "id": 9,
                "name": "Francis Ford Coppola",
                "selected": false
            },
            {
                "id": 10,
                "name": "Ruffino",
                "selected": false
            }
        ],
        "whiskey": [
            {
                "id": 1,
                "name": "Jack Daniels",
                "selected": false
            },
            {
                "id": 2,
                "name": "Jameson",
                "selected": false
            },
            {
                "id": 3,
                "name": "Crown Royal",
                "selected": false
            },
            {
                "id": 4,
                "name": "Jim Beam",
                "selected": false
            },
            {
                "id": 5,
                "name": "Wild Turkey",
                "selected": false
            },
            {
                "id": 6,
                "name": "Knob Creek",
                "selected": false
            },
            {
                "id": 7,
                "name": "Bulleit",
                "selected": false
            },
            {
                "id": 8,
                "name": "Maker's Mark",
                "selected": false
            },
            {
                "id": 9,
                "name": "Glenlivet",
                "selected": false
            },
            {
                "id": 10,
                "name": "Chivas Regal",
                "selected": false
            }
        ],
        "vodka": [
            {
                "id": 1,
                "name": "Absolut",
                "selected": false
            },
            {
                "id": 2,
                "name": "Grey Goose",
                "selected": false
            },
            {
                "id": 3,
                "name": "Smirnoff",
                "selected": false
            },
            {
                "id": 4,
                "name": "Ketel One",
                "selected": false
            },
            {
                "id": 5,
                "name": "Belvedere",
                "selected": false
            },
            {
                "id": 6,
                "name": "Stolichnaya",
                "selected": false
            },
            {
                "id": 7,
                "name": "Tito's",
                "selected": false
            },
            {
                "id": 8,
                "name": "Ciroc",
                "selected": false
            },
            {
                "id": 9,
                "name": "Skyy",
                "selected": false
            },
            {
                "id": 10,
                "name": "Finlandia",
                "selected": false
            }
        ],
        "tequila": [
            {
                "id": 0,
                "name": "Patron",
                "selected": false
            },
            {
                "id": 1,
                "name": "Don Julio",
                "selected": false
            },
            {
                "id": 2,
                "name": "Casamigos",
                "selected": false
            },
            {
                "id": 3,
                "name": "Herradura",
                "selected": false
            },
            {
                "id": 4,
                "name": "Espolón",
                "selected": false
            }
        ],
        "rum": [
            {
                "id": 0,
                "name": "Bacardi",
                "selected": false
            },
            {
                "id": 1,
                "name": "Captain Morgan",
                "selected": false
            },
            {
                "id": 2,
                "name": "Malibu",
                "selected": false
            },
            {
                "id": 3,
                "name": "Mount Gay",
                "selected": false
            },
            {
                "id": 4,
                "name": "Myers's",
                "selected": false
            }
        ],
        "gin": [
            {
                "id": 0,
                "name": "Tanqueray",
                "selected": false
            },
            {
                "id": 1,
                "name": "Bombay Sapphire",
                "selected": false
            },
            {
                "id": 2,
                "name": "Hendrick's",
                "selected": false
            },
            {
                "id": 3,
                "name": "Beefeater",
                "selected": false
            },
            {
                "id": 4,
                "name": "Gordon's",
                "selected": false
            }
        ],
        "mezcal": [
            {
                "id": 0,
                "name": "Del Maguey",
                "selected": false
            },
            {
                "id": 1,
                "name": "Ilegal",
                "selected": false
            },
            {
                "id": 2,
                "name": "Vida",
                "selected": false
            },
            {
                "id": 3,
                "name": "Montelobos",
                "selected": false
            },
            {
                "id": 4,
                "name": "Los Amantes",
                "selected": false
            }
        ],
        "liqueur": [
            {
                "id": 0,
                "name": "Cointreau",
                "selected": false
            },
            {
                "id": 1,
                "name": "Bailey's",
                "selected": false
            },
            {
                "id": 2,
                "name": "Grand Marnier",
                "selected": false
            },
            {
                "id": 3,
                "name": "Kahlua",
                "selected": false
            },
            {
                "id": 4,
                "name": "Chambord",
                "selected": false
            }
        ],
        "brandy": [
            {
                "id": 0,
                "name": "Hennessy",
                "selected": false
            },
            {
                "id": 1,
                "name": "Remy Martin",
                "selected": false
            },
            {
                "id": 2,
                "name": "Courvoisier",
                "selected": false
            },
            {
                "id": 3,
                "name": "Martell",
                "selected": false
            },
            {
                "id": 4,
                "name": "Hine",
                "selected": false
            }
        ],
        "soda": [
            {
                "id": 0,
                "name": "Coca-Cola",
                "selected": false
            },
            {
                "id": 1,
                "name": "Pepsi",
                "selected": false
            },
            {
                "id": 2,
                "name": "Sprite",
                "selected": false
            },
            {
                "id": 3,
                "name": "7-Up",
                "selected": false
            },
            {
                "id": 4,
                "name": "Ginger Ale",
                "selected": false
            }
        ],
        "mixers": [
            {
                "id": 0,
                "name": "Sour mix",
                "selected": false
            },
            {
                "id": 1,
                "name": "Simple syrup",
                "selected": false
            },
            {
                "id": 2,
                "name": "Grenadine",
                "selected": false
            },
            {
                "id": 3,
                "name": "Angostura bitters",
                "selected": false
            },
            {
                "id": 4,
                "name": "Vermouth",
                "selected": false
            },
            {
                "id": 5,
                "name": "Orange juice",
                "selected": false
            },
            {
                "id": 6,
                "name": "Cranberry juice",
                "selected": false
            },
            {
                "id": 7,
                "name": "Soda water",
                "selected": false
            },
            {
                "id": 8,
                "name": "Tonic water",
                "selected": false
            }
        ]
    }

        static brandsArray = [
         {
             "id": 0,
             "name": "Budweiser",
             "selected": false
         },
         {
             "id": 1,
             "name": "Heineken",
             "selected": false
         },
         {
             "id": 2,
             "name": "Corona",
             "selected": false
         },
         {
             "id": 3,
             "name": "Stella Artois",
             "selected": false
         },
         {
             "id": 4,
             "name": "Guinness",
             "selected": false
         },
         {
             "id": 5,
             "name": "Chimay",
             "selected": false
         },
         {
             "id": 6,
             "name": "Jacob's Creek",
             "selected": false
         },
         {
             "id": 7,
             "name": "Barefoot",
             "selected": false
         },
         {
             "id": 8,
             "name": "Yellow Tail",
             "selected": false
         },
         {
             "id": 9,
             "name": "Jack Daniel's",
             "selected": false
         },
         {
             "id": 10,
             "name": "Jim Beam",
             "selected": false
         },
         {
             "id": 11,
             "name": "Johnnie Walker",
             "selected": false
         },
         {
             "id": 12,
             "name": "Chivas Regal",
             "selected": false
         },
         {
             "id": 13,
             "name": "Absolut",
             "selected": false
         },
         {
             "id": 14,
             "name": "Grey Goose",
             "selected": false
         },
         {
             "id": 15,
             "name": "Belvedere",
             "selected": false
         },
         {
             "id": 16,
             "name": "Patrón",
             "selected": false
         },
         {
             "id": 17,
             "name": "Sauza",
             "selected": false
         },
         {
             "id": 18,
             "name": "Jose Cuervo",
             "selected": false
         },
         {
             "id": 19,
             "name": "Captain Morgan",
             "selected": false
         },
         {
             "id": 20,
             "name": "Bacardi",
             "selected": false
         },
         {
             "id": 21,
             "name": "Havana Club",
             "selected": false
         },
         {
             "id": 22,
             "name": "Bombay Sapphire",
             "selected": false
         },
         {
             "id": 23,
             "name": "Tanqueray",
             "selected": false
         },
         {
             "id": 24,
             "name": "Beefeater",
             "selected": false
         },
         {
             "id": 25,
             "name": "Del Maguey",
             "selected": false
         },
         {
             "id": 26,
             "name": "Ilegal Mezcal",
             "selected": false
         },
         {
             "id": 27,
             "name": "Montelobos",
             "selected": false
         },
         {
             "id": 28,
             "name": "Grand Marnier",
             "selected": false
         },
         {
             "id": 29,
             "name": "Baileys",
             "selected": false
         },
         {
             "id": 30,
             "name": "Kahlúa",
             "selected": false
         },
         {
             "id": 31,
             "name": "Cointreau",
             "selected": false
         },
         {
             "id": 32,
             "name": "Campari",
             "selected": false
         },
         {
             "id": 33,
             "name": "Angostura Bitters",
             "selected": false
         },
         {
             "id": 34,
             "name": "Peychaud's Bitters",
             "selected": false
         },
         {
             "id": 35,
             "name": "Martini & Rossi",
             "selected": false
         },
         {
             "id": 36,
             "name": "Schweppes",
             "selected": false
         },
         {
             "id": 37,
             "name": "Coca-Cola",
             "selected": false
         },
         {
             "id": 38,
             "name": "Pepsi",
             "selected": false
         },
         {
             "id": 39,
             "name": "7-Up",
             "selected": false
         },
         {
             "id": 40,
             "name": "Sprite",
             "selected": false
         },
         {
             "id": 41,
             "name": "Ginger Ale",
             "selected": false
         },
         {
             "id": 42,
             "name": "Club Soda",
             "selected": false
         },
         {
             "id": 43,
             "name": "Tonic Water",
             "selected": false
         },
         {
             "id": 44,
             "name": "Orange Juice",
             "selected": false
         },
         {
             "id": 45,
             "name": "Cranberry Juice",
             "selected": false
         },
         {
             "id": 46,
             "name": "Pineapple Juice",
             "selected": false
         },
         {
             "id": 47,
             "name": "Grapefruit Juice",
             "selected": false
         },
         {
             "id": 48,
             "name": "Lemon Juice",
             "selected": false
         },
         {
             "id": 49,
             "name": "Lime Juice",
             "selected": false
         },
         {
             "id": 50,
             "name": "Grenadine",
             "selected": false
         },
         {
             "id": 51,
             "name": "Simple Syrup",
             "selected": false
         }
     ];

     static flavors =  [
         {"id": 0, "name": "Spicy", "selected": false},
         {"id": 1, "name": "Fruity", "selected": false},
         {"id": 2, "name": "Earthy", "selected": false},
         {"id": 3, "name": "Smoky", "selected": false},
         {"id": 4, "name": "Sweet", "selected": false},
         {"id": 5, "name": "Bitter", "selected": false},
         {"id": 6, "name": "Sour", "selected": false},
         {"id": 7, "name": "Floral", "selected": false},
         {"id": 8, "name": "Herbal", "selected": false},
         {"id": 9, "name": "Nutty", "selected": false}
       ];

     static volumes = [
                {"id": 0, "name": "50 ml", "selected": false},
                {"id": 1, "name": "100 ml", "selected": false},
                {"id": 2, "name": "200 ml", "selected": false},
                {"id": 3, "name": "375 ml", "selected": false},
                {"id": 4, "name": "500 ml", "selected": false},
                {"id": 5, "name": "750 ml", "selected": false},
                {"id": 6, "name": "1 liter", "selected": false},
                {"id": 7, "name": "1.5 liters", "selected": false},
                {"id": 8, "name": "2 liters", "selected": false},
                {"id": 9, "name": "3 liters", "selected": false},
                {"id": 10, "name": "4 liters", "selected": false},
                {"id": 11, "name": "5 liters", "selected": false}
              ];

     static abv = [
           {
            "type": "low",
            "id": 0,
            "name": "Low ABV",
            "abv_range": "0-4.9%",
            "selected": false
          },
          {
            "type": "medium",
            "id": 1,
            "name": "Medium ABV",
            "abv_range": "5-9.9%",
            "selected": false
          },
          {
            "type": "high",
            "id": 2,
            "name": "High ABV",
            "abv_range": "10% or higher",
            "selected": false
          }
     ];

       static colors = [
         {
           "id": 0,
           "name": "Red",
           "selected": false
         },
         {
           "id": 1,
           "name": "Green",
           "selected": false
         },
         {
           "id": 2,
           "name": "Blue",
           "selected": false
         },
         {
           "id": 3,
           "name": "Yellow",
           "selected": false
         },
         {
           "id": 4,
           "name": "Purple",
           "selected": false
         },
         {
           "id": 5,
           "name": "Orange",
           "selected": false
         },
         {
           "id": 6,
           "name": "Pink",
           "selected": false
         },
         {
           "id": 7,
           "name": "Brown",
           "selected": false
         },
         {
           "id": 8,
           "name": "Black",
           "selected": false
         },
         {
           "id": 9,
           "name": "White",
           "selected": false
         }
       ];

     static countryOfOrigin = [
         {"id": 0, "country": "United States", "selected": false},
         {"id": 1, "country": "Canada", "selected": false},
         {"id": 2, "country": "Mexico", "selected": false},
         {"id": 3, "country": "United Kingdom", "selected": false},
         {"id": 4, "country": "Ireland", "selected": false},
         {"id": 5, "country": "France", "selected": false},
         {"id": 6, "country": "Spain", "selected": false},
         {"id": 7, "country": "Italy", "selected": false},
         {"id": 8, "country": "Germany", "selected": false},
         {"id": 9, "country": "Russia", "selected": false},
         {"id": 10, "country": "Japan", "selected": false},
         {"id": 11, "country": "China", "selected": false},
         {"id": 12, "country": "Australia", "selected": false},
         {"id": 13, "country": "New Zealand", "selected": false}
      ]

     static alcohol_age = [
        {"id": 0, "name": "Non-Aged", "selected": false},
        {"id": 1, "name": "Aged up to 3 years", "selected": false},
        {"id": 2, "name": "Aged 4-6 years", "selected": false},
        {"id": 3, "name": "Aged 7-9 years", "selected": false},
        {"id": 4, "name": "Aged 10+ years", "selected": false},
        {"id": 5, "name": "Aged 15+ years", "selected": false},
        {"id": 6, "name": "Aged 20+ years", "selected": false}
      ]

     static offers = [
         {
           "id": 1,
           "discount": "10%",
           "start_date": "2023-04-01",
           "end_date": "2023-04-15",
           "selected": false
         },
         {
           "id": 2,
           "discount": "15%",
           "start_date": "2023-04-05",
           "end_date": "2023-04-20",
           "selected": false
         },
         {
           "id": 3,
           "discount": "20%",
           "start_date": "2023-04-10",
           "end_date": "2023-04-30",
           "selected": false
         }
       ];

    static carbonated = [
      {
        "id": 1,
        "name": "Carbonated",
        "selected": false
      },
      {
        "id": 2,
        "name": "Non-carbonated",
        "selected": false
      }];

    static deliveryTime = [
      {
          "id": 1,
          "name": "1 hour delivery",
          "selected": false
      },
      {
          "id": 2,
          "name": "2 hour delivery",
          "selected": false
      },
      {
          "id": 3,
          "name": "3 hour delivery",
          "selected": false
      },
      {
          "id": 4,
          "name": "4 hour delivery",
          "selected": false
      },
      {
          "id": 5,
          "name": "5 hour delivery",
          "selected": false
      },
      {
          "id": 6,
          "name": "6 hour delivery",
          "selected": false
      },
      {
          "id": 7,
          "name": "7 hour delivery",
          "selected": false
      },
      {
          "id": 8,
          "name": "8 hour delivery",
          "selected": false
      },
      {
          "id": 9,
          "name": "9 hour delivery",
          "selected": false
      },
      {
          "id": 10,
          "name": "10 hour delivery",
          "selected": false
      },
      {
          "id": 11,
          "name": "11 hour delivery",
          "selected": false
      },
      {
          "id": 12,
          "name": "12 hour delivery",
          "selected": false
      }
  ];

  static usStates = [
    { name: 'Alabama', index: 0 },
    { name: 'Alaska', index: 1 },
    { name: 'Arizona', index: 2 },
    { name: 'Arkansas', index: 3 },
    { name: 'California', index: 4 },
    { name: 'Colorado', index: 5 },
    { name: 'Connecticut', index: 6 },
    { name: 'Delaware', index: 7 },
    { name: 'Florida', index: 8 },
    { name: 'Georgia', index: 9 },
    { name: 'Hawaii', index: 10 },
    { name: 'Idaho', index: 11 },
    { name: 'Illinois', index: 12 },
    { name: 'Indiana', index: 13 },
    { name: 'Iowa', index: 14 },
    { name: 'Kansas', index: 15 },
    { name: 'Kentucky', index: 16 },
    { name: 'Louisiana', index: 17 },
    { name: 'Maine', index: 18 },
    { name: 'Maryland', index: 19 },
    { name: 'Massachusetts', index: 20 },
    { name: 'Michigan', index: 21 },
    { name: 'Minnesota', index: 22 },
    { name: 'Mississippi', index: 23 },
    { name: 'Missouri', index: 24 },
    { name: 'Montana', index: 25 },
    { name: 'Nebraska', index: 26 },
    { name: 'Nevada', index: 27 },
    { name: 'New Hampshire', index: 28 },
    { name: 'New Jersey', index: 29 },
    { name: 'New Mexico', index: 30 },
    { name: 'New York', index: 31 },
    { name: 'North Carolina', index: 32 },
    { name: 'North Dakota', index: 33 },
    { name: 'Ohio', index: 34 },
    { name: 'Oklahoma', index: 35 },
    { name: 'Oregon', index: 36 },
    { name: 'Pennsylvania', index: 37 },
    { name: 'Rhode Island', index: 38 },
    { name: 'South Carolina', index: 39 },
    { name: 'South Dakota', index: 40 },
    { name: 'Tennessee', index: 41 },
    { name: 'Texas', index: 42 },
    { name: 'Utah', index: 43 },
    { name: 'Vermont', index: 44 },
    { name: 'Virginia', index: 45 },
    { name: 'Washington', index: 46 },
    { name: 'West Virginia', index: 47 },
    { name: 'Wisconsin', index: 48 },
    { name: 'Wyoming', index: 49 }
  ];

    static newJerseyTrentonZipcodes = [{ "place name": "Trenton", "longitude": "-74.712", "post code": "08601", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08602", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08603", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08604", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08605", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08606", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08607", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.7622", "post code": "08608", "latitude": "40.2204" }, { "place name": "Trenton", "longitude": "-74.741", "post code": "08609", "latitude": "40.2248" }, { "place name": "Trenton", "longitude": "-74.705", "post code": "08610", "latitude": "40.2016" }, { "place name": "Trenton", "longitude": "-74.7416", "post code": "08611", "latitude": "40.1967" }, { "place name": "Trenton", "longitude": "-74.7821", "post code": "08618", "latitude": "40.2377" }, { "place name": "Trenton", "longitude": "-74.6962", "post code": "08619", "latitude": "40.2418" }, { "place name": "Trenton", "longitude": "-74.6488", "post code": "08620", "latitude": "40.167" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08625", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.8168", "post code": "08628", "latitude": "40.2655" }, { "place name": "Trenton", "longitude": "-74.7334", "post code": "08629", "latitude": "40.2196" }, { "place name": "Trenton", "longitude": "-74.7627", "post code": "08638", "latitude": "40.251" }, { "place name": "Trenton", "longitude": "-74.6052", "post code": "08640", "latitude": "40.0098" }, { "place name": "Trenton", "longitude": "-74.588", "post code": "08641", "latitude": "40.027" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08645", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08646", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08647", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.6912", "post code": "08648", "latitude": "40.2795" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08650", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08666", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08677", "latitude": "40.2805" }, { "place name": "Trenton", "longitude": "-74.6576", "post code": "08690", "latitude": "40.2336" }, { "place name": "Trenton", "longitude": "-74.5939", "post code": "08691", "latitude": "40.2197" }, { "place name": "Trenton", "longitude": "-74.712", "post code": "08695", "latitude": "40.2805" }];

    static orderStatus = {
        PENDING: "Pending",
        PLACED: "Placed",
        SHIPPED: "Shipped",
        CANCELLED: "Cancelled",
        DELIVERED: "Delivered"
    };
  
}

export default Globals;
