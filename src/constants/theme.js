import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#C1AA73",
  secondary: "#9aa2b8",
  gray: "#7785AC",
  gray2: "#7D8597",
  lightGray: "#eeeeee",
  background: "#fffdff",
  tabBackground: "#fefefe",
  text: "#FFFFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#AFAFAF",
  black: "#23293b",
  dark: "#10002B",
  blue: "#1874BF",
  white: "#fefefe",
  red: "#ED2525",
  yellow: "#fdc202",
  green: "#7bbb3a",
  photos: "#9de8d3",
  ping: "#FF21E9",
  download: "#38B000",
  upload: "#2176FF",
  contact: "#956af5",
  calendar: "#665af0",
  album: "#5688f7",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  iconWidth: 24,
  iconLarge: 28,

  // font sizes
  largeTitle: 50,
  mediumTitle: 40,
  smallTitle: 30,
  h1: 20,
  h2: 18,
  h3: 16,
  h4: 14,
  body1: 20,
  body2: 18,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  w900: { fontWeight: '900', fontFamily: "Montserrat-Black" },
  w800: { fontWeight: '800', fontFamily: "Montserrat-ExtraBold" },
  w700: { fontWeight: '700', fontFamily: "Montserrat-Bold" },
  w600: { fontWeight: '600', fontFamily: "Montserrat-SemiBold" },
  w500: { fontWeight: '500', fontFamily: "Montserrat-Medium", },
  w400: { fontWeight: '400', fontFamily: "Montserrat-Regular", },
  w300: { fontWeight: '300', fontFamily: "Montserrat-Light", },
  w200: { fontWeight: '200', fontFamily: "Montserrat-ExtraLight", },
  w100: { fontWeight: '100', fontFamily: "Montserrat-Thin", },

  title: { fontFamily: "Montserrat-Bold", fontSize: 22, color: COLORS.black },
  menu: { fontFamily: "Montserrat-SemiBold", fontSize: 18, color: COLORS.black },
  submenu: { fontFamily: "Montserrat-Regular", fontSize: 14, color: COLORS.black },
  chart: { fontFamily: "Montserrat-Medium", fontSize: 14, color: COLORS.black },
  tabLabel: { fontFamily: "Montserrat-Regular", fontSize: 11, color: COLORS.black },

  largeTitle: { fontFamily: "Montserrat-Bold", fontSize: SIZES.largeTitle },// weight: 700
  h1: { fontFamily: "Montserrat-Bold", fontSize: SIZES.h1 },          // weight: 700
  h2: { fontFamily: "Montserrat-SemiBold", fontSize: SIZES.h2 },      // weight: 600
  h3: { fontFamily: "Montserrat-SemiBold", fontSize: SIZES.h3 },      // weight: 600
  h4: { fontFamily: "Montserrat-SemiBold", fontSize: SIZES.h4 },      // weight: 600
  body1: { fontFamily: "Montserrat-Medium", fontSize: SIZES.body1 },  // weight: 500
  body2: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body2 }, // weight: 400
  body3: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body3 }, // weight: 400
  body4: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body4 }, // weight: 400
};

export const STYLES = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  textShadow: {
    textShadowColor: COLORS.black + '60',
    textShadowOffset: {
      width: 0,
      height: 2
    },
    textShadowRadius: 2
  }
});

const appTheme = { COLORS, SIZES, FONTS, STYLES };

export default appTheme;
