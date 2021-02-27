import { StyleSheet } from "react-native";
import { colors } from "../../Styles/Styles";

export const amountInputStyles = StyleSheet.create({
    overlay: {
        height: "40%",
        width: "100%",
        position: "absolute",
        backgroundColor: colors.nearWhite,
        bottom: 0
    },
    buttonContainer: {
        height: "20%",
        width: "24%",
        justifyContent: "center",
        backgroundColor: "transparent",
        margin: "0.5%"
    },
    buttonTitleStyle:{
        color: "white"
    },
    buttonStyle: {
        height: "100%",
        width: "100%",
        textAlignVertical: "center"
    },

    topBar: {
        flexDirection: "row",
        height: "16%",
        width: "100%",
        alignItems: "center",
        marginBottom: "0.5%",
    },
    textInput: {
        width: "74.2%"
    },
    resultText: {
        width: "25.8%",
        flexWrap: "wrap",
    }
  })