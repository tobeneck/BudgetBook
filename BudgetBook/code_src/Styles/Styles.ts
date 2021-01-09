import { StyleSheet } from "react-native"

const defaultRadius: number = 3
const defaultBorderWidth: number = 1//0.5

const defaultSpacingPercent: number = 0.5

export const DefaultColors = {
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
}

export const headerStyles = StyleSheet.create({
  header: {
    height: "8%",
    width: "100%",
    backgroundColor: DefaultColors.darkBlue,
  }
})

export const tableStyles = StyleSheet.create({
  table: {
    backgroundColor: DefaultColors.nearWhite,
    height: "92%"
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomColor: DefaultColors.orange,
    height: "4%",
    width: "99%",
    alignItems: "center",
    alignSelf: "center",
  },
  tableRow: {
    flexDirection: 'row',
    //justifyContent: "space-between",
    alignItems: 'center',

    backgroundColor: "white",

    flexWrap: "nowrap",
    borderRadius: defaultRadius,
    marginVertical: defaultSpacingPercent,
    marginHorizontal: defaultSpacingPercent
  },
  tableContent: {
    height: "82%", //magic number: this is set with the "Add" button and the "Header" space in mind
    width: "99%",
    alignSelf: "center",
    backgroundColor: DefaultColors.nearWhite,
  },
  tableButton: {
    backgroundColor: DefaultColors.nearWhite,
    height: "6%",
    width: "99%",
    margin: defaultSpacingPercent,
    alignSelf: "center",
  }
});

export const bigPopupStyles = StyleSheet.create({
  overlay: {
    height: "60%",
    width: "70%",
    backgroundColor: DefaultColors.nearWhite,
    top: "-6%",
    // bottomm: "5%"
  },
  text: {
    width: "99%",
    height: "9%",
    alignSelf: "center",
    borderWidth: defaultBorderWidth,
    borderRadius: defaultRadius,
    borderColor: "grey", //TODO: remove these, maybe make it more grey
    textAlignVertical: "center"
  },
  textInput: {
    width: "99%",
    height: "9%",
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
  }
})


const smallPopupHeightPercentage: number = 30
export const smallPopupStyles = StyleSheet.create({
  overlay: {
    height: smallPopupHeightPercentage+"%",
    width: "70%",
    backgroundColor: DefaultColors.nearWhite,
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
    color: DefaultColors.red
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

export const buttonStyles = StyleSheet.create({
  orangeButtonStyle: {
    backgroundColor: DefaultColors.orange
  },
  orangeButtonText: {
    color: "black"
  },

  darkBlueButtonStyle: {
    backgroundColor: DefaultColors.darkBlue
  },
  darkBlueButtonText: {
    color: "white"
  },

  deleteButtonOutlineStyle: {
    borderColor: "red",
    borderWidth: defaultBorderWidth,
  },
  deleteButtonOutlineText: {
    color: "red"
  },
  deleteButtonOutlineDisabledStyle: {
    borderColor: "lightgrey",
    borderWidth: defaultBorderWidth,
  },
  deleteButtonOutlineDisabledText: {
    color: "lightgrey"
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
    borderColor: DefaultColors.orange,
    borderWidth: defaultBorderWidth,
    backgroundColor: DefaultColors.orange
  },
  saveButtonText: {
    color: "black"
  },

  cancelButtonStyle: {
    borderColor: DefaultColors.darkBlue,
    borderWidth: defaultBorderWidth,
    backgroundColor: DefaultColors.darkBlue,
  },
  cancelButtonText: {
    color: "white"
  },
})

export const overlayStyles = StyleSheet.create({
  overlay: {
    height: "60%",
    width: "70%",
    backgroundColor: DefaultColors.nearWhite
  },
  smallOverlay: {
    height: "30%",
    width: "70%",
    backgroundColor: DefaultColors.nearWhite
  }
})