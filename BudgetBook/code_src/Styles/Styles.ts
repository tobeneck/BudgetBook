import { StyleSheet } from "react-native"
import { Colors } from 'react-native/Libraries/NewAppScreen';

const defaultRadius: number = 3

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

export const buttonStyles = StyleSheet.create({
  //TODO
})

export const headerStyles = StyleSheet.create({
  header: {
    height: "9%",
    width: "100%",
    backgroundColor: DefaultColors.darkBlue,
  }
})

export const tableStyles = StyleSheet.create({
  table: {
    backgroundColor: DefaultColors.nearWhite,
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
  },
  tableContent: {
    height: "81%", //magic number: this is set with the "Add" button and the "Header" space in mind
    width: "99%",
    alignSelf: "center",
    backgroundColor: DefaultColors.nearWhite,
  },
  tableButton: {
    backgroundColor: DefaultColors.nearWhite,
    height: "6%",
    width: "99%",
    alignSelf: "center",
  }
});