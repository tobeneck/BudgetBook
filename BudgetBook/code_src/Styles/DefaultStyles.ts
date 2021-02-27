import { StyleSheet } from "react-native";
import { defaultBorderWidth, colors, defaultRadius } from "./Styles";


export const defaultButtonStyles = StyleSheet.create({//this only defines the color, borders and text styles. The height and width is defined elsewhere
    normalButtonStyle: {
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

    deleteButtonStyle: {
        backgroundColor: colors.deleteRed
    },
    deleteButtonText: {
        color: colors.deleteRed
    },
  })

  export const defaultTextInputStyles = StyleSheet.create({ //both for textInput and text represented components
    textInput: {
        alignSelf: "center",
        borderWidth: defaultBorderWidth,
        borderRadius: defaultRadius,
        borderColor: colors.grey, //TODO: remove these, maybe make it more grey
        alignContent:"center",
        color: colors.black,
        marginLeft: defaultBorderWidth //to cpmpensate for the border with
      },
      //TODO: the same thing for text
  })

  export const defaultTableStyles = StyleSheet.create({
    table: {
      backgroundColor: colors.nearWhite,
    },
    tableCell: {
        backgroundColor: colors.nearWhite
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomColor: colors.orange,
        alignItems: "center",
        alignSelf: "center",
      },
  });