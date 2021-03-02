import { StyleSheet } from "react-native";
import { defaultBorderWidth, colors, defaultRadius } from "./Styles";


export const defaultButtonStyles = StyleSheet.create({//this only defines the color, borders and text styles. The height and width is defined elsewhere
    buttonStyles: {
        backgroundColor: colors.darkBlue
    },
    normalTitleStyle: {
        color: colors.white
    },

    specialButtonStyle: {
        backgroundColor: colors.orange
    },
    specialTitleStyle: {
        color: colors.black
    },
  })