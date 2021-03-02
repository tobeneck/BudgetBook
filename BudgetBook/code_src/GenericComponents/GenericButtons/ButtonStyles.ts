import { StyleSheet } from "react-native";
import { defaultBorderWidth, defaultColors } from "../../Styles/Styles";


export const orangeButtonStyle = StyleSheet.create({
    buttonStyle: {
        backgroundColor: defaultColors.highlightColor,
        minHeight: 42,
        minWidth: 60
    },
    titleStyle: {
        color: defaultColors.darkTextColor,
        fontSize: 16,
    },
    containerStyle: {
        margin: 1
    }
})

export const darkBlueButtonStyle = StyleSheet.create({
    buttonStyle: {
        backgroundColor: defaultColors.primaryColor,
        minHeight: 42,
        minWidth: 60
    },
    titleStyle: {
        color: defaultColors.lightTextColor,
        fontSize: 16,
    },
    containerStyle: {
        margin: 1
    }
})

export const deleteButtonStyle = StyleSheet.create({
    outlineButtonStyle: {
        borderColor:   defaultColors.deleteRed,
        borderWidth: defaultBorderWidth,
        minHeight: 42,
        minWidth: 60
    },
    outlineTitleStyle: {
        color: defaultColors.deleteRed
    },

    // outlineButtonDisabledStyle: {
    //     borderColor: defaultColors.disabled,
    //     borderWidth: defaultBorderWidth,
    //     minHeight: 42,
    //     minWidth: 60
    // },
    // outlineButtonDisabledTitle: {
    //     color: defaultColors.disabled
    // },

    buttonStyle: {
        borderColor: defaultColors.deleteRed,
        backgroundColor: defaultColors.deleteRed,
        minHeight: 42,
        minWidth: 60
    },
    titleStyle: {
        color: defaultColors.lightTextColor,
    },

    buttonContainer: {
        margin: 1
    }
})