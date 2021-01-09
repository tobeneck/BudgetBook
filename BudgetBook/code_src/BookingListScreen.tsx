import React, { useState } from "react"
import { Text } from "react-native"
import { Button } from "react-native-elements"
import { AddBookingPopup } from "./BookingScreenComponents/AddBookingPopup"
import { BookingElement, getCurrentTotal, adjustForTotalAmount } from "./BookingScreenComponents/BookingList"
import { EditBookingPopup } from "./BookingScreenComponents/EditBookingPopup"
import { CategoryElement } from "./CategoryScreenComponents/CategoryList"
import { View, ScrollView } from "react-native"
import { tableStyles, DefaultColors, spacings } from "./Styles/Styles"
import ReassureDeleteBookingPopup from "./BookingScreenComponents/ReassureDeleteBookingPopup"
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
        const adjustedNewBookingList: BookingElement[] = adjustForTotalAmount(currentBookingIndex, newBookingList)
        props.setBookings(adjustedNewBookingList)
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
        props.setBookings([item, ...props.bookings])
    }

    /**
     * opens the booking item at index for editing
     * @param index
     */
    const onOpenEditBookingItem = (index: number): void => {
        setCurrentBookingIndex(index)
        setEditPopupVisible(true)
    }

    const onReassureDeleteBookingPopupDeletePressed = () => {
        const newBookingList: BookingElement[] = props.bookings

        if (currentBookingIndex > -1) {
            newBookingList.splice(currentBookingIndex, 1);
        }

        props.setBookings(newBookingList)
        setCurrentBookingIndex(0)
        setReassureDeleteBookingPopupVisible(false)
    }

    const onReassureDeleteBookingPopupCancelPressed = () => {
        setCurrentBookingIndex(0)
        setReassureDeleteBookingPopupVisible(false)
    }

    return(
    <>
        <AddBookingPopup
            categorys={props.categorys}
            visible={addPopupVisible}
            setVisible={setAddPopupVisible}
            addItem={addBooking}
            currentTotal={getCurrentTotal(props.bookings)}
        />

        <EditBookingPopup
            visible={editPopupVisible}
            setVisible={setEditPopupVisible}
            onCancelPressed={onCancelEditBookingItem}
            onSavePressed={onSaveEditBookingItem}
            onDeletePressed={onDeleteBookingItem}
            categorys={props.categorys}
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
                <Text style={{width: "16%", fontWeight: 'bold'}}>Date</Text>
                <Text style={{width: "18%", fontWeight: 'bold'}}>Total</Text>
                <Text style={{width: "18%", fontWeight: 'bold'}}>Amount</Text>
                <Text style={{width: "38%", fontWeight: 'bold'}}>Category</Text>
            </View>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tableStyles.tableContent}
            >

            {props.bookings.map((be: BookingElement, index: number) => (
                <>
                    <View style={tableStyles.tableRow}>
                        <Text style={{width: "16%", color: "black" }}>{be.date.toLocaleDateString()}</Text>
                        <Text style={{width: "18%", color: be.total < 0 ? DefaultColors.red : be.total > 0 ? DefaultColors.green : "black"}}>{be.total >= 0 ? " "+be.total : be.total}</Text>
                        <Text style={{width: "18%", color: be.amount < 0 ? DefaultColors.red : be.amount > 0 ? DefaultColors.green : "black"}}>{be.amount >= 0 ? " "+be.amount : be.amount}</Text>
                        <Text style={{width: "38%", color: "black" }}>{be.category.name}</Text>
                        <Button
                            onPress={(e: Event) => onOpenEditBookingItem(index)}
                            type="clear"
                            icon={
                                <Icon
                                  name="file-document-edit-outline"
                                  size={23}
                                  color={DefaultColors.darkBlue}
                                />
                            }
                        />
                    </View>
                </>
            ))}

            </ScrollView>
            <View style={tableStyles.tableButton}>
                <Button
                    onPress={(e: Event) => onAddBookingPressed(e)}
                    title="Add Booking"
                    buttonStyle={{backgroundColor: DefaultColors.orange}}
                    titleStyle={{color: "black"}}
                    accessibilityLabel="Add Item to the budget list"
                />
            </View>
        </View>
    </>
    )
}

export default BookingListScreen