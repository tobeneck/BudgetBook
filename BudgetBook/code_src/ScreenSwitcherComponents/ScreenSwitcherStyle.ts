import { StyleSheet } from "react-native"
import { colors } from "./../Styles/Styles"

const defaultRadius: number = 3
const defaultBorderWidth: number = 1//0.5

const defaultSpacingPercent: number = 0.5


export const ScreenSwitcherStyles = StyleSheet.create({
    background: {
        height: "92%",
        width: "100%",
        color: colors.nearWhite,
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
        backgroundColor: colors.darkBlue,
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