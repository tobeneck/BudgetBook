import React, { useEffect, useState } from "react"
import { Button, Text, TextInput, Modal, Alert } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { BookingElement } from "./BookingList"
import { CategoryElement } from "../CategoryScreenComponents/CategoryList"

interface Props{
    categorys: CategoryElement[],
    visible: boolean,
    addItem: (element: BookingElement) => void,
    setVisible: (visible: boolean) => void
}

export const AddBookingPopup = (props: Props): JSX.Element => {
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState<CategoryElement>(props.categorys[props.categorys.length-1]);

    const onDateChanged = (newDate: string): void => {
        //TODO: implement
        //setDate(newDate)
    }

    const onAmountChanged = (newAmount: string): void => {
        setAmount(newAmount)
    }

    const onNameChanged = (newName: string): void => {
        setName(newName)
    }

    const onCategoryChanged = (id: number): void => {
        console.log("selected category: ", props.categorys[id])
        setCategory(props.categorys[id])
    }

    const onAddPressed = (e: Event): void => {
        props.addItem({date: new Date(), amount: +amount, name, category} as BookingElement)
        props.setVisible(false)
    }

    const onCancelPressed = (e: Event): void => {
        console.log("Cancel button pressed")
        props.setVisible(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
            <Text>date:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType = 'numeric'
                onChangeText={text => onAmountChanged(text)}
                value={amount+""}
            />
            <Text>amount:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType = 'numeric'
                onChangeText={text => onAmountChanged(text)}
                value={amount+""}
            />
            <Text>name:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onNameChanged(text)}
                value={name}
            />
            <Text>category:</Text>
            <Picker
                selectedValue={category.id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => (onCategoryChanged(itemIndex))}
                mode="dropdown"
            >
                {props.categorys.map((ce: CategoryElement) => (<Picker.Item label={ce.name} value={ce.id} />))}
            </Picker>
            <Button
                onPress={(e: Event) => onAddPressed(e)}
                title="Add"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
            <Button
                onPress={(e: Event) => onCancelPressed(e)}
                title="Cancel"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
        </Modal>
    )
}