import React, { useState } from "react"
import { Button, Text, View } from "react-native"
import BookingListElement, { BookingElement } from "./BookingListElement"

interface Props{
    bookings: BookingElement[]
}

const BookingList = (props: Props): JSX.Element => {

    return (
        <View>
            {props.bookings.map((be: BookingElement) => (<BookingListElement date = {be.date} amount={be.amount} name={be.name} category={be.category} />))}
        </View>
    )
}

export default BookingList;