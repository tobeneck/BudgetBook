import { StatusBarProps, StyleSheet } from "react-native"

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

  separatorColor: colors.lightGrey,

  deleteRed: "red" //TODO: change
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
  tableHeader: {
    flexDirection: 'row',
    minHeight: 40,
    width: "100%",
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

export const textStyles = StyleSheet.create({
  normal: {
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
    color: defaultColors.darkTextColor
  },
  headline: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    color: defaultColors.darkTextColor
  },
  smallTitle: {
    fontSize: 14,
    textAlign: "left",
    textAlignVertical: "center",
    color: defaultColors.darkTextColor
  },
})

export const interactionElements = StyleSheet.create({ //for interactions, for example a text input or a editable text
  text: {
    width: "99%",
    height: 42,
    alignSelf: "flex-start",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
    alignItems: "flex-start",
    justifyContent:"center",
    textAlignVertical: "center",
    color:defaultColors.darkTextColor,
    fontSize: 14
  },
  textInput: {
    width: "99%",
    height: 42,
    alignSelf: "center",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
    alignContent:"center",
    color: defaultColors.darkTextColor,
    fontSize: 14
  },
  textField: {
    width: "99%",
    height: 42*2,
    alignSelf: "center",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
    alignItems: "flex-start",
    color: defaultColors.darkTextColor,
    fontSize: 14
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

export const statusBarProps: StatusBarProps =   {
  barStyle: 'light-content',
  backgroundColor: defaultColors.primaryColor
}

export const defaultViewStyles = StyleSheet.create({
  simpleFlexStart: {
    justifyContent: "flex-start"
  },
  simpleRow: {
    flexDirection: "row"
  },
  bottomButtonRow:{
    //width: "100%", //TODO: what if there was no width? Could we circumvent the +50%?
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  //TODO: bottomRow buttons with delete
  bottomButtonRowWithDelete:{
    width: "100%",
    flexDirection: "row",
    justifyContent:"space-between"
  },

  containerWithPadding:{
    width: "98%",
    height: "99.7%", //magic numbers that look good together at my pixel2XL
    alignSelf: "center",
    justifyContent: "center"
  },


  header: { //style of the header
    height: "10%",
    width: "100%",
    backgroundColor: defaultColors.primaryColor,
    alignItems: "flex-end"
  },
  content: { //style of the content zone. The content itself is placed into the contentContainer
    height: "90%",
    width: "100%",
    backgroundColor: defaultColors.backgroundColor
  },
})