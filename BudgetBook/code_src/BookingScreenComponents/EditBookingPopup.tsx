import React, { useEffect, useState } from "react"
import { Text, Modal, Button, Picker, TextInput } from "react-native"
import { CategoryElement } from "../CategoryScreenComponents/CategoryListElement"
import { BookingElement } from "./BookingListElement"

interface Props{
    booking: BookingElement, //the booking to edit
    categorys: CategoryElement[],
    onCancelPressed: () => void,
    onDeletePressed: () => void,
    onSavePressed: (nbe: BookingElement) => void,
    setVisible: (visible: boolean) => void,
    visible: boolean
}

export const EditBookingPopup = (props: Props): JSX.Element => {
    // const [booking, setBooking] = useState<BookingElement>(props.booking)
    const [date, setDate] = useState<Date>(props.booking.date);
    const [amount, setAmount] = useState<string>(props.booking.amount+"");
    const [name, setName] = useState<string>(props.booking.name);
    const [category, setCategory] = useState<CategoryElement>(props.booking.category);



    const onCategoryChanged = (newCategoryElementIndex: number): void => {
        setCategory(props.categorys[newCategoryElementIndex])
    }

    useEffect(() => {
        setDate(props.booking.date)
        setAmount(props.booking.amount+"")
        setName(props.booking.name)
        setCategory(props.booking.category)
    }, [props.booking])

    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
           {/* <Text>date:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType = 'numeric'
                onChangeText={text => onAmountChanged(text)}
                value={props.booking.amount+""}
            /> */}
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
                        <Button
                onPress={() => props.onDeletePressed()}
                title="Delete"
                color="#841584"
                accessibilityLabel="Delete Item in the budget list"
            />
        </Modal>
    )
}