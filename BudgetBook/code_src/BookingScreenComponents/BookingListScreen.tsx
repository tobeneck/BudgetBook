import React, { useContext } from "react"
import { Text, TouchableOpacity } from "react-native"
import { BookingElement } from "./BookingList"
import { View, ScrollView } from "react-native"
import { tableStyles, defaultColors } from "../Styles/Styles"
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton"
import ColoredCircle from "../GenericComponents/ColoredCircle"
import { SettingsContext } from "../../App"
import { numberToCurrency } from "../GenericComponents/AmountInput/AmountInput"
import { AppSettings } from "../ExportImportData/SettingsManager"

interface Props{
    bookings: BookingElement[],
    setBookings: (bookings: BookingElement[]) => void,
    onOpenAddBooking: () => void,
    onOpenEditBooking: (index: number) => void,
}

const BookingListScreen = (props: Props): JSX.Element => {

    const currencySymbolsProvider = useContext<AppSettings>(SettingsContext)

    /**
     * returns the appropriate color depending on the input value. Red for negative numbers and green for positive.
     * @param amount the amount text to be colored
     */
    const getAmountColor = (amount: number): string => {
        if(amount > 0)
            return defaultColors.greenTextColor
        if(amount < 0)
            return defaultColors.redTextColor
        return defaultColors.darkTextColor
    }

    return(
    <>
        <View style={tableStyles.tableHeader}>
            <Text style={[tableStyles.tableText, {fontWeight: 'bold'}]}>Current Total = </Text>
            <Text style={[tableStyles.tableText, {fontWeight: "bold", color: getAmountColor(props.bookings[0].total)}]}>{numberToCurrency(props.bookings[0].total, currencySymbolsProvider.currencySymbol.pre, currencySymbolsProvider.currencySymbol.post, false)}</Text>
        </View>

        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tableStyles.tableContent}
        >

        {props.bookings.map((be: BookingElement, index: number) => (
                <TouchableOpacity
                    style={tableStyles.tableRow}
                    onPress={(e: Event) => props.onOpenEditBooking(index)}
                    key={index}
                >
                    <Text style={[tableStyles.tableText, {width: "20%", marginLeft: "3%"}]}>{be.date.toLocaleDateString()}</Text>
                    <Text style={[tableStyles.tableText, {width: "25%", marginLeft: "1%",fontWeight: "bold", color: getAmountColor(be.amount)}]}>{numberToCurrency(be.amount, currencySymbolsProvider.currencySymbol.pre, currencySymbolsProvider.currencySymbol.post, true)}</Text>
                    <ColoredCircle color={be.category.color} size={14} />
                    <Text style={[tableStyles.tableText, {width: "42%", marginLeft: "1%"}]}>{be.category.name}</Text>
                </TouchableOpacity>
        ))}

        </ScrollView>

        <OrangeButton
            onPress={() => props.onOpenAddBooking()}
            title="Add Booking"
        />
    </>
    )
}

export default BookingListScreen