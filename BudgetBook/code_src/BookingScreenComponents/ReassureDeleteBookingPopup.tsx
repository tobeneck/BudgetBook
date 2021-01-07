import React from "react"
import { Text, View } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { buttonStyles, smallPopupStyles } from "../Styles/Styles"
import { BookingElement } from "./BookingList"

interface Props{
    visible: boolean,
    booking: BookingElement,
    onCancelPressed: () => void,
    onDeletePressed: () => void
}

const ReassureDeleteBookingPopup = (props: Props): JSX.Element => {
    return (
        <Overlay
            isVisible={props.visible}
            // onBackdropPress={() => props.setVisible(false)}
            overlayStyle={smallPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.onCancelPressed()}
        >
            <View style={{height: "100%", justifyContent: "space-between"}}>
                <Text style={smallPopupStyles.headline}>Delete the booking?</Text>

                <Text style={smallPopupStyles.text}>{props.booking.date.toDateString()}, {props.booking.amount}, {props.booking.category.name} </Text>

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Button
                        onPress={() => props.onDeletePressed()}
                        title="Delete"
                        buttonStyle={buttonStyles.deleteButtonStyle}
                        titleStyle={buttonStyles.deleteButtonText}
                    />

                    <Button
                        onPress={() => props.onCancelPressed()}
                        title="Cancel"
                        titleStyle={buttonStyles.cancelButtonText}
                        buttonStyle={buttonStyles.cancelButtonStyle}
                    />
                </View>
            </View>
        </Overlay>
    )
}

export default ReassureDeleteBookingPopup