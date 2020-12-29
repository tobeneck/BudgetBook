import React from "react"
import { Modal, Button, Text } from "react-native"
import { BookingElement } from "./BookingList"

interface Props{
    visible: boolean,
    booking: BookingElement,
    onCancelPressed: () => void,
    onDeletePressed: () => void
}

const ReassureDeleteBookingPopup = (props: Props): JSX.Element => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
            <Text>Are you shure you wand to delete the category:</Text>
            <Text>{props.booking.date.toDateString()}, {props.booking.amount}, {props.booking.name}, {props.booking.category.name} </Text>
            <Button
                onPress={() => props.onDeletePressed()}
                title="Delete"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
            <Button
                onPress={() => props.onCancelPressed()}
                title="Cancel"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
        </Modal>
    )
}

export default ReassureDeleteBookingPopup