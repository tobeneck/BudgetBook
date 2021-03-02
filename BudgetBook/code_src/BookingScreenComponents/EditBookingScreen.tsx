import React, { useEffect, useState } from "react"
import { Text, TextInput, View, Keyboard } from "react-native"
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CategoryElement } from "../CategoryScreenComponents/CategoryList"
import { BookingElement } from "./BookingList"
import { defaultViewStyles, interactionElements, textStyles } from "../Styles/Styles";
import AmountInput from "../GenericComponents/AmountInput/AmountInput";
import { defaultButtonStyles } from "../Styles/DefaultStyles"
import DeleteButton from "../GenericComponents/GenericButtons/DeleteButton";
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton";
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton";

interface Props{
    booking: BookingElement, //the booking to edit
    currentIndex: number, //the list index of the current booking. Needed for the initial item

    categorys: CategoryElement[],
    minimumPossibleDate?: Date,
    maximumPossibleDate?: Date,
    onCancelPressed: () => void,
    onDeletePressed: () => void,
    onSavePressed: (nbe: BookingElement) => void,
    openAddCategoryScreen?: () => void //TODO: make it possible to add categorys from within add or edit bookings
}

export const EditBookingScreen = (props: Props): JSX.Element => {
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

    const onCancelPressed = (): void => {
        props.onCancelPressed()
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
                    onChange={(e: Event, selectedDate: Date | undefined) => onDateChanged(e, selectedDate)}//OK or cancel is pressed
                    minimumDate={props.minimumPossibleDate}
                />)
            }


            <View style={[defaultViewStyles.containerWithPadding, {justifyContent:"space-between"}]}>
                <View style={defaultViewStyles.simpleFlexStart}>

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Date
                    </Text>
                    <Text
                        style={interactionElements.text}
                        onPress={() => {
                            setDatePickerVisible(true)
                            Keyboard.dismiss()
                        }}
                    >
                        {" "+date.toDateString()}
                    </Text>

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Amount
                    </Text>
                    <AmountInput
                        amount={amount}
                        setAmount={(newAmount: number) => setAmount(newAmount)}
                        style={interactionElements.text}
                        normalButtonStyle={defaultButtonStyles.buttonStyles}
                        normalButtonTextStyle={defaultButtonStyles.normalTitleStyle}
                        specialButtonStyle={defaultButtonStyles.specialButtonStyle}
                        specialButtonTextStyle={defaultButtonStyles.specialTitleStyle}
                    />

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Category
                    </Text>
                    <View style={interactionElements.textInput}>
                        <Picker
                            //NOTE: can I resize the text?
                            selectedValue={category.id}
                            style={[textStyles.normal, {height: "100%", width: "100%"}]}
                            onValueChange={(itemValue, itemIndex) => (setCategory(props.categorys[itemIndex]))}
                            mode="dropdown"
                        >
                            {props.categorys.map((ce: CategoryElement) => (<Picker.Item label={ce.name} value={ce.id} />))}
                        </Picker>
                    </View>

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Description
                    </Text>
                    <TextInput
                        style={interactionElements.textField}
                        onChangeText={text => setDescription(text)}
                        value={description}
                        multiline={true}
                        textAlignVertical="top"
                    />
                </View>

                <View style={defaultViewStyles.bottomButtonRowWithDelete}>
                    <DeleteButton
                            onPress={() => props.onDeletePressed()}
                            title="Delete"
                            type={"outline"}
                            disabled={props.currentIndex === 0}
                        />

                    <View style={defaultViewStyles.bottomButtonRow}>
                        <OrangeButton
                            onPress={() => onSavePressed()}
                            title="Save"
                        />

                        <DarkBlueButton
                            onPress={() => onCancelPressed()}
                            title="Cancel"
                        />

                    </View>

                </View>
            </View>
        </View>
    )
}