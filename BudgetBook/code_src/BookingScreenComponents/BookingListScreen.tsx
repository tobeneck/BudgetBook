import React, { useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { Button, Divider } from "react-native-elements"
import { AddBookingPopup } from "./AddBookingPopup"
import { BookingElement, getCurrentTotal, sortBookings } from "./BookingList"
import { EditBookingPopup } from "./EditBookingPopup"
import { CategoryElement, getActiveCategorys } from "../CategoryScreenComponents/CategoryList"
import { View, ScrollView } from "react-native"
import { tableStyles, colors, defaultColors } from "../Styles/Styles"
import ReassureDeleteBookingPopup from "./ReassureDeleteBookingPopup"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface Props{
    categorys: CategoryElement[],
    bookings: BookingElement[],
    setBookings: (bookings: BookingElement[]) => void,
}

const BookingListScreen = (props: Props): JSX.Element => {
    const [ currentBookingIndex, setCurrentBookingIndex ] = useState<number>(0) //TODO: is 0 really the best way to solve this?
    const [ addPopupVisible, setAddPopupVisible ] = useState<boolean>(false)
    const [ editPopupVisible, setEditPopupVisible ] = useState<boolean>(false)
    const [ reassureDeleteBookingPopupVisible, setReassureDeleteBookingPopupVisible ] = useState<boolean>(false)

    /**
     * handles the Add Booking button press event
     * @param e the pressEvent returned from the test
     */
    const onAddBookingPressed = (e: Event): void => { //TODO: inline?
        setAddPopupVisible(true)
      }

    /**
     * handles the "save" operation when editing a booking item
     * @param nbe the new booking element to be saved
     */
    const onSaveEditBookingItem = (nbe: BookingElement): void => {
        const newBookingList: BookingElement[] = props.bookings
        newBookingList[currentBookingIndex] = nbe
        props.setBookings(sortBookings(newBookingList))
        setEditPopupVisible(false)
        setCurrentBookingIndex(0)
    }

    /**
     * handles the "delete" operation when editing a booking list
     */
    const onDeleteBookingItem = (): void => { //TODO: rename all of these functions to show
        setEditPopupVisible(false)
        setReassureDeleteBookingPopupVisible(true)
    }

    /**
     * handles the "cancel" operation when editing a booking list
     */
    const onCancelEditBookingItem = (): void => {
        setCurrentBookingIndex(0)
        setEditPopupVisible(false)
    }

    /**
     * handles the addition of a booking item
     * @param item the item to be added
     */
    const addBooking = (item: BookingElement): void => {
        props.setBookings(sortBookings([item, ...props.bookings]))
    }

    /**
     * opens the booking item at index for editing
     * @param index
     */
    const onOpenEditBookingItem = (index: number): void => {
        setCurrentBookingIndex(index)
        setEditPopupVisible(true)
    }

    /**
     * handles the "delete" operation when deleting a booking
     */
    const onReassureDeleteBookingPopupDeletePressed = () => {
        const newBookingList: BookingElement[] = props.bookings

        if (currentBookingIndex > -1) {
            newBookingList.splice(currentBookingIndex, 1);
        }

        props.setBookings(newBookingList)
        setCurrentBookingIndex(0)
        setReassureDeleteBookingPopupVisible(false)
    }

    /**
     * handles the "calcel" operation when deleting a category
     */
    const onReassureDeleteBookingPopupCancelPressed = () => {
        setCurrentBookingIndex(0)
        setReassureDeleteBookingPopupVisible(false)
    }

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
        <AddBookingPopup
            categorys={getActiveCategorys(props.categorys)}
            visible={addPopupVisible}
            setVisible={setAddPopupVisible}
            addItem={addBooking}
            currentTotal={getCurrentTotal(props.bookings)}
            minimumPossibleDate={props.bookings[props.bookings.length - 1].date} //TODO: ugly indexing. The initial item is ment
        />

        <EditBookingPopup
            visible={editPopupVisible}
            setVisible={setEditPopupVisible}
            onCancelPressed={onCancelEditBookingItem}
            onSavePressed={onSaveEditBookingItem}
            onDeletePressed={onDeleteBookingItem}
            minimumPossibleDate={props.bookings.length - 1 - currentBookingIndex !== 0 ? props.bookings[props.bookings.length - 1].date : undefined} //TODO: ugly indexing
            maximumPossibleDate={props.bookings.length - 1 - currentBookingIndex === 0 && props.bookings.length > 1 ? props.bookings[props.bookings.length - 2].date : undefined} //TODO: ugly indexing
            categorys={getActiveCategorys(props.categorys, props.bookings[currentBookingIndex].category)}
            booking={props.bookings[currentBookingIndex]}
            currentIndex={props.bookings.length - 1 - currentBookingIndex}
        />

        <ReassureDeleteBookingPopup
            visible={reassureDeleteBookingPopupVisible}
            booking={props.bookings[currentBookingIndex]}
            onCancelPressed={() => onReassureDeleteBookingPopupCancelPressed()}
            onDeletePressed={() => onReassureDeleteBookingPopupDeletePressed()}
        />
        <View style={tableStyles.table}>
            <View style={tableStyles.tableHeader}>
                {/* widths should combine to 90%: */}
                <Text style={[tableStyles.tableText, {fontWeight: 'bold'}]}>Current Total = </Text>
                <Text style={[tableStyles.tableText, {fontWeight: "bold", color: getAmountColor(props.bookings[0].total)}]}>{props.bookings[0].total >= 0 ? " "+props.bookings[0].total.toFixed(2) : props.bookings[0].total.toFixed(2)}</Text>
            </View>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tableStyles.tableContent}
            >

            {props.bookings.map((be: BookingElement, index: number) => (
                    <TouchableOpacity
                        style={tableStyles.tableRow}
                        onPress={(e: Event) => onOpenEditBookingItem(index)}
                        key={index}
                    >
                        <Text style={[tableStyles.tableText, {width: "20%", marginLeft: "3%"}]}>{be.date.toLocaleDateString()}</Text>
                        <Text style={[tableStyles.tableText, {width: "25%", marginLeft: "1%",fontWeight: "bold", color: getAmountColor(be.amount)}]}>{be.amount >= 0 ? "+"+be.amount.toFixed(2) : be.amount.toFixed(2)}</Text>
                        <Text style={[tableStyles.tableText, {width: "50%", marginLeft: "1%"}]}>{be.category.name}</Text>
                    </TouchableOpacity>
            ))}

            </ScrollView>

            <View style={tableStyles.tableButton}>
                <Button
                    onPress={(e: Event) => onAddBookingPressed(e)}
                    title="Add Booking"
                    buttonStyle={{backgroundColor: colors.orange}}
                    titleStyle={{color: "black"}}
                    accessibilityLabel="Add Item to the budget list"
                />
            </View>
        </View>
    </>
    )
}

export default BookingListScreen