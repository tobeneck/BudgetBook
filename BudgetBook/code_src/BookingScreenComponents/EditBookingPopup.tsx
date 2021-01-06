import React, { useEffect, useState } from "react"
import { Text, Modal, Button, TextInput, View, Keyboard } from "react-native"
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CategoryElement } from "../CategoryScreenComponents/CategoryList"
import { BookingElement } from "./BookingList"

interface Props{
    booking: BookingElement, //the booking to edit
    categorys: CategoryElement[],
    onCancelPressed: () => void,
    onDeletePressed: () => void,
    onSavePressed: (nbe: BookingElement) => void,
    setVisible: (visible: boolean) => void,
    visible: boolean,
    currentIndex: number //the list index of the current booking. Needed for the initial item
}

export const EditBookingPopup = (props: Props): JSX.Element => {
    // const [booking, setBooking] = useState<BookingElement>(props.booking)
    const [date, setDate] = useState<Date>(props.booking.date)
    const [amount, setAmount] = useState<string>(props.booking.amount+"")
    const [name, setName] = useState<string>(props.booking.name)
    const [category, setCategory] = useState<CategoryElement>(props.booking.category)

    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)


    const onDateChanged = (e: Event, selectedDate: Date | undefined): void => {
        if(selectedDate)
            setDate(selectedDate)
        setDatePickerVisible(false)
    }

    useEffect(() => {
        setDate(props.booking.date)
        setAmount(props.booking.amount+"")
        setName(props.booking.name)
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
                    onChange={(e: Event, selectedDate: Date | undefined) => onDateChanged(e, selectedDate)}//OK or cancel is pressed
                />)
            }
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.visible}
            >
                <Text>date:</Text>
                <Text
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onPress={() => {
                        setDatePickerVisible(true)
                        Keyboard.dismiss()
                    }}
                >
                    {date.toDateString()}
                </Text>

                <Text>amount:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    keyboardType = 'numeric'
                    onChangeText={newAmount => setAmount(newAmount)}
                    value={amount}
                />

                <Text>name:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={newName => setName(newName)}
                    value={name}
                />

                <Text>category:</Text>
                <Picker
                    selectedValue={category.id}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => (setCategory(props.categorys[itemIndex]))}
                    mode="dropdown"
                >
                    {props.categorys.map((ce: CategoryElement) => (<Picker.Item label={ce.name} value={ce.id} />))}
                </Picker>

                <Button
                    onPress={() => props.onSavePressed({name, category, date, amount: +amount} as BookingElement)}
                    title="Save"
                    color="#841584"
                    accessibilityLabel="Save changes in the budget list"
                />
                <Button
                    onPress={() => props.onCancelPressed()}
                    title="Cancel"
                    color="#841584"
                    accessibilityLabel="Cancel operation"
                />
                { props.currentIndex !== 0 ? //do not allow the initial element to be deleted
                    <Button
                        onPress={() => props.onDeletePressed()}
                        title="Delete"
                        color="#841584"
                        accessibilityLabel="Delete Item in the budget list"
                    />
                    :
                    <Text>The initial booking can not be deleted!</Text>
                }
            </Modal>
            </View>
    )
}