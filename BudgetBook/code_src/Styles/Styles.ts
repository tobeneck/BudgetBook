import { PixelRatio, StyleSheet } from "react-native"
import { BottomSheet } from "react-native-elements"

export const defaultRadius: number = 3
export const defaultBorderWidth: number = 1//0.5

export const defaultSpacingPercent: number = 0.5

export const colors = {
  lightGreen: "#9BC53D", //Android green
  green: "#6E8D2A",
  red: "#C3423F", //Madder Lake
  yellow: "#FDE74C", //??

  //color palete of the app: https://coolors.co/16697a-489fb5-82c0cc-ede7e3-ffa62b
  orange: "#FFA62B", //Orange Peel
  nearWhite: "#EDE7E3", //isabeline
  lightBlue: "#82C0CC",
  normalBlue: "#489FB5", //pacific blue
  darkBlue: "#16697A", //ming

  lightGrey: "#D3D3D3",
  grey: "grey",

  disabled: "#00000040", //the last two digits mean 25% opacity

  white: "white",
  black: "black",

  deleteRed: "red",
}

export const defaultColors = {
  backgroundColor: colors.nearWhite,
  primaryColor: colors.darkBlue,
  highlightColor: colors.orange,

  darkTextColor: colors.black,
  lightTextColor: colors.white,
  redTextColor: colors.red,
  greenTextColor: colors.green,

  disabled: colors.disabled,

  separatorColor: colors.lightGrey

}

export const headerStyles = StyleSheet.create({
  headerContainer: {
    height: "10%",
    width: "100%",
    backgroundColor: colors.darkBlue,
    alignItems: "center",
  },
  headerStyle: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  }
})

export const tableStyles = StyleSheet.create({
  table: {
    backgroundColor: colors.nearWhite,
    height: "90%" //header height is 10%
  },
  tableHeader: {
    flexDirection: 'row',
    minHeight: 40,
    width: "98%",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.primaryColor,
    justifyContent: "center"
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.separatorColor,
    minHeight: 40,
    width: "100%"
  },
  tableContent: { //this only exists for the margins left and right

    height: "100%",
    width: "98%", //98% width for margins left and right
    alignSelf: "center",
  },
  tableText: {
    fontSize: 14,
    color: "black",
  },
  tableButton: {
    backgroundColor: defaultColors.backgroundColor,
    height: 42,
    width: "98%",
    margin: defaultSpacingPercent,
    alignSelf: "center",
  }
});

export const bigPopupStyles = StyleSheet.create({
  overlay: {
    height: "92%",
    width: "100%",
    backgroundColor: colors.nearWhite,
    top: "4%",
    //bottomm: "5%"
  },
  text: {
    width: "99%",
    height: "6%",
    alignSelf: "flex-start",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
    alignItems: "flex-start",
    justifyContent:"center",
    textAlignVertical: "center"
  },
  iconAndText: {
    flexDirection: 'row',
  },
  textInput: {
    width: "99%",
    height: "6%",
    alignSelf: "center",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
    alignContent:"center"
  },
  textField: {
    width: "99%",
    height: "36%",
    alignSelf: "center",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
    alignItems: "flex-start"
  },
  headline: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "black"
  },
  subHeadline: {
    alignSelf: "center",
    textAlign: "center",
    color: "black"
  },
})


const smallPopupHeightPercentage: number = 30
export const smallPopupStyles = StyleSheet.create({
  overlay: {
    height: smallPopupHeightPercentage+"%",
    width: "70%",
    backgroundColor: colors.nearWhite,
    top: "-6%",
  },
  headline: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "black"
  },
  errorHeadline: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: colors.red
  },
  text: {
    alignSelf: "center",
    textAlign: "center"
  },
  picker: {
    width: "99%",
    height: "18%",
    alignSelf: "center",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
  },
})

export const spacings = StyleSheet.create({
  defaultHorizontalSpacing: {
    height: defaultSpacingPercent+"%",
    width: "100%",
  },
  doubleHorizontalSpacing: {
    height: defaultSpacingPercent*2+"%",
    width: "100%",
  },

  defaultVerticalSpacing: {
    width: defaultSpacingPercent+"%",
  },
  doubleVerticalSpacing: {
    width: defaultSpacingPercent*2+"%",
  },
})

// buttonContainer: {
//   height: "20%",
//   width: "24%",
//   justifyContent: "center",
//   backgroundColor: "transparent",
//   margin: "0.5%"
// },
// buttonTitleStyle:{
//   color: "white"
// },
// buttonStyle: {
//   height: "100%",
//   width: "100%",
//   textAlignVertical: "center"
// },

export const buttonStyles = StyleSheet.create({
  orangeButtonStyle: {
    backgroundColor: defaultColors.highlightColor,
    height: 42,
  },
  orangeButtonText: {
    color: defaultColors.darkTextColor,
    fontSize: 16
  },

  darkBlueButtonStyle: {
    backgroundColor: colors.darkBlue,
    height: 42
  },
  darkBlueButtonText: {
    color: defaultColors.lightTextColor,
    fontSize: 16
  },

  deleteButtonOutlineStyle: {
    borderColor: "red",
    borderWidth: defaultBorderWidth,
  },
  deleteButtonOutlineText: {
    color: "red"
  },
  deleteButtonOutlineDisabledStyle: {
    borderColor: colors.disabled,
    borderWidth: defaultBorderWidth,
  },
  deleteButtonOutlineDisabledText: {
    color: colors.disabled
  },

  deleteButtonStyle: {
    borderColor: "red",
    borderWidth: defaultBorderWidth,
    backgroundColor: "red"
  },
  deleteButtonText: {
    color: "white"
  },

  saveButtonStyle: {
    borderColor: colors.orange,
    borderWidth: defaultBorderWidth,
    backgroundColor: colors.orange
  },
  saveButtonText: {
    color: defaultColors.darkTextColor
  },

  cancelButtonStyle: {
    borderColor: colors.darkBlue,
    borderWidth: defaultBorderWidth,
    backgroundColor: colors.darkBlue,
  },
  cancelButtonText: {
    color: defaultColors.lightTextColor
  },
})

export const overlayStyles = StyleSheet.create({
  overlay: {
    height: "60%",
    width: "70%",
    backgroundColor: colors.nearWhite
  },
  smallOverlay: {
    height: "30%",
    width: "70%",
    backgroundColor: colors.nearWhite
  }
})