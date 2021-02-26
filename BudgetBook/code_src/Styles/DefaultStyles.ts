import { StyleSheet } from "react-native";
import { defaultBorderWidth, DefaultColors, defaultRadius } from "./Styles";


export const defaultButtonStyles = StyleSheet.create({//this only defines the color, borders and text styles. The height and width is defined elsewhere
    normalButtonStyle: {
        backgroundColor: DefaultColors.darkBlue
    },
    normalTitleStyle: {
        color: DefaultColors.white
    },

    specialButtonStyle: {
        backgroundColor: DefaultColors.orange
    },
    specialTitleStyle: {
        color: DefaultColors.black
    },

    deleteButtonStyle: {
        backgroundColor: DefaultColors.deleteRed
    },
    deleteButtonText: {
        color: DefaultColors.deleteRed
    },
  })

  export const defaultTextInputStyles = StyleSheet.create({ //both for textInput and text represented components
    textInput: {
        alignSelf: "center",
        borderWidth: defaultBorderWidth,
        borderRadius: defaultRadius,
        borderColor: DefaultColors.grey, //TODO: remove these, maybe make it more grey
        alignContent:"center",
        color: DefaultColors.black,
        marginLeft: defaultBorderWidth //to cpmpensate for the border with
      },
      //TODO: the same thing for text
  })