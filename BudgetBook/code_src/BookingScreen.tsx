import React, { useState } from "react"
import { Button } from "react-native"

import { AddBookingPopup } from "./BookingScreenComponents/AddBookingPopup"
import { BookingElement } from "./BookingScreenComponents/BookingListElement"
import BookingList from "./BookingScreenComponents/BookingList"
import { EditBookingPopup } from "./BookingScreenComponents/EditBookingPopup"
import { CategoryElement } from "./CategoryScreenComponents/CategoryListElement"
import { SafeAreaView, View, ScrollView } from "react-native" 
import { styles } from "./Styles/Styles"

interface Props{
    categorys: CategoryElement[],
    bookings: BookingElement[],
    setBookings: (bookings: BookingElement[]) => void,
    
}

const BookingScreen = (props: Props): JSX.Element => {
    const [ currentBookingIndex, setCurrentBookingIndex ] = useState<number>(0) //TODO: is 0 really the best way to solve this?
    const [ addPopupVisible, setAddPopupVisible ] = useState<boolean>(false)
    const [ editPopupVisible, setEditPopupVisible ] = useState<boolean>(false)

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
        props.setBookings(newBookingList)
        setEditPopupVisible(false)
    }

    /**
     * handles the "delete" operation when editing a booking list
     */
    const onDeleteBookingItem = (): void => {
        const newBookingList: BookingElement[] = props.bookings

        if (currentBookingIndex > -1) {
            newBookingList.splice(currentBookingIndex, 1);
        }

        props.setBookings(newBookingList)
        setCurrentBookingIndex(0)
        setEditPopupVisible(false)
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
    const addBookingItem = (item: BookingElement): void => { //TODO: rename
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
  
    return(
    <SafeAreaView>
        <AddBookingPopup 
            categorys={props.categorys}
            visible={addPopupVisible}
            setVisible={setAddPopupVisible}
            addItem={addBookingItem}
            />
        <EditBookingPopup
            visible={editPopupVisible}
            setVisible={setEditPopupVisible}
            onCancelPressed={onCancelEditBookingItem}
            onSavePressed={onSaveEditBookingItem}
            onDeletePressed={onDeleteBookingItem}
            categorys={props.categorys}
            booking={props.bookings[currentBookingIndex]}
            
            />
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            <View>
            <BookingList bookings={props.bookings} editBookingElement={onOpenEditBookingItem} />

            <Button
                onPress={(e: Event) => onAddBookingPressed(e)}
                title="Add Booking"
                color="#841584"
                accessibilityLabel="Add Item to the budget list" />
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default BookingScreen