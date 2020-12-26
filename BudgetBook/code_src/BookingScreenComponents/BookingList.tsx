import React from "react"
import { Button, Text, View } from "react-native"
import BookingListElement, { BookingElement } from "./BookingListElement"

interface Props{
    bookings: BookingElement[]
    editBookingElement: (index: number) => void
}

const BookingList = (props: Props): JSX.Element => {

    return (
        <View>
            {props.bookings.map((be: BookingElement, index: number) => (
            <>
                <BookingListElement date={be.date} amount={be.amount} name={be.name} category={be.category} />
                <Button
                    onPress={(e: Event) => props.editBookingElement(index)}
                    title="Edit"
                    color="#841584"
                    accessibilityLabel="Add Item to the budget list" />
            </>
            ))}
        </View>
    )
}

export default BookingList;