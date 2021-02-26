import React, { useEffect, useState } from "react"
import { Text, TextInput, View, Keyboard } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BookingElement } from "./BookingList"
import { CategoryElement } from "../CategoryScreenComponents/CategoryList"
import { buttonStyles, bigPopupStyles, spacings } from "../Styles/Styles";
import { defaultButtonStyles } from "../Styles/DefaultStyles";
import AmountInput from "../GenericComponents/AmountInput/AmountInput";

interface Props{
    categorys: CategoryElement[],
    visible: boolean,
    currentTotal: number,
    addItem: (element: BookingElement) => void,
    setVisible: (visible: boolean) => void,
    minimumPossibleDate: Date
}

export const AddBookingPopup = (props: Props): JSX.Element => {
    const [date, setDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<CategoryElement>(props.categorys[props.categorys.length-1]); //TODO: ugly indexing

    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)

    const onDateChanged = (e: Event, selectedDate: Date | undefined): void => {
        if(selectedDate)
            setDate(selectedDate)
        setDatePickerVisible(false)
    }

    const onAddPressed = (): void => {
        props.addItem({date, total: props.currentTotal + +amount, amount: +amount, description: name, category} as BookingElement)
        props.setVisible(false)
    }

    const onCancelPressed = (): void => {
        console.log("Cancel button pressed")
        props.setVisible(false)
    }

    useEffect(() => {
        setAmount(0)
        setName("")
        setCategory(props.categorys[props.categorys.length-1]) //TODO: ugly indexing
        setDate(new Date)
        setDatePickerVisible(false)
    }, [props])

    return(
        <View>
            {
                datePickerVisible &&
                (<DateTimePicker
                    value={date}
                    mode={"date"}
                    onChange={(e: Event, selectedDate: Date | undefined) => onDateChanged(e, selectedDate)}//OK or cancel is pressed
                    minimumDate={props.minimumPossibleDate}
                />)
            }

            <Overlay
                isVisible={props.visible}
                // onBackdropPress={() => props.setVisible(false)}
                overlayStyle={bigPopupStyles.overlay}
                statusBarTranslucent={true}
                onRequestClose={() => onCancelPressed()}
            >
                <View style={{height: "100%", justifyContent: "space-between"}}>
                    <View style={{height: "90%", justifyContent: "flex-start"}}>
                    <Text style={bigPopupStyles.headline}>Add Booking</Text>
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
                            onChangeText={text => setName(text)}
                            value={name}
                            multiline={true}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={{width: "100%", flexDirection: "row", justifyContent:"flex-end"}}>
                        <Button
                            onPress={() => onAddPressed()}
                            title="Add"
                            buttonStyle={buttonStyles.saveButtonStyle}
                            titleStyle={buttonStyles.saveButtonText}
                            accessibilityLabel="Add Item to the budget list"
                        />

                        <View style={spacings.doubleVerticalSpacing}/>

                        <Button
                            onPress={() => onCancelPressed()}
                            title="Cancel"
                            titleStyle={buttonStyles.cancelButtonText}
                            buttonStyle={buttonStyles.cancelButtonStyle}
                        />

                    </View>
                </View>
            </Overlay>
        </View>
    )
}