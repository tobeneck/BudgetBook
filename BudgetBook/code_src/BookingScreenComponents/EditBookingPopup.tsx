import React, { useEffect, useState } from "react"
import { Text, TextInput, View, Keyboard, ScrollView, NativeSyntheticEvent, TargetedEvent } from "react-native"
import { Button } from "react-native-elements"
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CategoryElement } from "../CategoryScreenComponents/CategoryList"
import { BookingElement } from "./BookingList"
import { Overlay } from "react-native-elements";
import { bigPopupStyles, buttonStyles, spacings } from "../Styles/Styles";
import AmountInput from "../GenericComponents/AmountInput/AmountInput";
import { defaultButtonStyles } from "../Styles/DefaultStyles"
interface Props{
    booking: BookingElement, //the booking to edit
    categorys: CategoryElement[],
    onCancelPressed: () => void,
    onDeletePressed: () => void,
    onSavePressed: (nbe: BookingElement) => void,
    setVisible: (visible: boolean) => void,
    visible: boolean,
    currentIndex: number, //the list index of the current booking. Needed for the initial item
    minimumPossibleDate?: Date,
    maximumPossibleDate?: Date
}

export const EditBookingPopup = (props: Props): JSX.Element => {
    // const [booking, setBooking] = useState<BookingElement>(props.booking)
    const [date, setDate] = useState<Date>(props.booking.date)
    const [amount, setAmount] = useState<number>(props.booking.amount)
    const [description, setDescription] = useState<string>(props.booking.description)
    const [category, setCategory] = useState<CategoryElement>(props.booking.category)

    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)


    const onDateChanged = (e: Event, selectedDate: Date | undefined): void => {
        if(selectedDate)
            setDate(selectedDate)
        setDatePickerVisible(false)
    }

    const onSavePressed = (): void => {
        props.onSavePressed({description, category, date, total: props.booking.total, amount} as BookingElement)
    }

    useEffect(() => {
        setDate(props.booking.date)
        setAmount(props.booking.amount)
        setDescription(props.booking.description)
        setCategory(props.booking.category)
        setDatePickerVisible(false)
    }, [props.booking])

    return(
        <View>
            {
                datePickerVisible &&
                (<DateTimePicker
                    value={date}
                    mode={"date"}
                    minimumDate={props.minimumPossibleDate}
                    maximumDate={props.maximumPossibleDate}
                    onChange={(e: Event, selectedDate: Date | undefined) => onDateChanged(e, selectedDate)}//OK or cancel is pressed
                />)
            }

            <Overlay
                isVisible={props.visible}
                // onBackdropPress={() => props.setVisible(false)}
                overlayStyle={bigPopupStyles.overlay}
                statusBarTranslucent={true}
                onRequestClose={() => props.onCancelPressed()}
            >
                <View style={{height: "100%", justifyContent: "space-between"}}>
                    <View style={{height: "90%", justifyContent: "flex-start"}}>
                        <Text style={bigPopupStyles.headline}>Edit Booking</Text>
                        <Text>Date</Text>
                        <Text
                            style={bigPopupStyles.text}
                            onPress={() => {
                                setDatePickerVisible(true)
                                Keyboard.dismiss()
                            }}
                        >
                            {" "+date.toDateString()}
                        </Text>

                        <Text>Amount</Text>
                        <AmountInput
                            amount={amount}
                            setAmount={(newAmount: number) => setAmount(newAmount)}
                            style={bigPopupStyles.text}
                            normalButtonStyle={defaultButtonStyles.normalButtonStyle}
                            normalButtonTextStyle={defaultButtonStyles.normalTitleStyle}
                            specialButtonStyle={defaultButtonStyles.specialButtonStyle}
                            specialButtonTextStyle={defaultButtonStyles.specialTitleStyle}
                        />

                        <Text>Category</Text>
                        <View style={bigPopupStyles.textInput}>
                            <Picker
                                selectedValue={category.id}
                                style={{height: "100%", width: "100%"}}
                                onValueChange={(itemValue, itemIndex) => (setCategory(props.categorys[itemIndex]))}
                                mode="dropdown"
                            >
                                {props.categorys.map((ce: CategoryElement) => (<Picker.Item label={ce.name} value={ce.id} />))}
                            </Picker>
                        </View>

                        <Text>Description</Text>
                         <TextInput
                            style={bigPopupStyles.textField}
                            onChangeText={text => setDescription(text)}
                            value={description}
                            multiline={true}
                            textAlignVertical="top"
                            editable={props.currentIndex !== 0}
                        />

                    </View>

                    <View style={{width: "100%", flexDirection: "row", justifyContent:"space-between"}}>
                        <Button
                            onPress={() => props.onDeletePressed()}
                            title="Delete"
                            titleStyle={buttonStyles.deleteButtonOutlineText}
                            type="outline"
                            buttonStyle={buttonStyles.deleteButtonOutlineStyle}
                            disabled={props.currentIndex === 0}
                            disabledStyle={buttonStyles.deleteButtonOutlineDisabledStyle}
                            disabledTitleStyle={buttonStyles.deleteButtonOutlineDisabledText}
                        />

                        <View style={{flexDirection: "row"}}>
                            <Button
                                onPress={() => onSavePressed()}
                                title="Save"
                                buttonStyle={buttonStyles.saveButtonStyle}
                                titleStyle={buttonStyles.saveButtonText}
                                accessibilityLabel="Add Item to the budget list"
                            />

                            <View style={spacings.doubleVerticalSpacing}/>

                            <Button
                                onPress={() => props.onCancelPressed()}
                                title="Cancel"
                                titleStyle={buttonStyles.cancelButtonText}
                                buttonStyle={buttonStyles.cancelButtonStyle}
                            />
                        </View>

                    </View>
                </View>
            </Overlay>
        </View>
    )
}