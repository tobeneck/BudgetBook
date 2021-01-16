import { StyleSheet } from "react-native"
import { DefaultColors } from "./../Styles/Styles"

const defaultRadius: number = 3
const defaultBorderWidth: number = 1//0.5

const defaultSpacingPercent: number = 0.5


export const ScreenSwitcherStyles = StyleSheet.create({
    background: {
        height: "92%",
        width: "100%",
        color: DefaultColors.nearWhite,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems:"center"
    },

    text: {
        color: "white"
    },

    screenPickerTile: {
        height: "10%",
        width: "99%",
        borderRadius: defaultRadius,
        backgroundColor: DefaultColors.darkBlue,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    screenPickerTileDisabled: {
        height: "10%",
        width: "99%",
        borderRadius: defaultRadius,
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
})