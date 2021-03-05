import React, { useContext, useEffect, useState } from "react"
import { Text, TextInput, View, Keyboard } from "react-native"
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BookingElement } from "./BookingList"
import { CategoryElement } from "../CategoryScreenComponents/CategoryList"
import { interactionElements, textStyles, defaultViewStyles } from "../Styles/Styles";
import AmountInput from "../GenericComponents/AmountInput/AmountInput";
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton";
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton";
import { darkBlueButtonStyle, orangeButtonStyle } from "../GenericComponents/GenericButtons/ButtonStyles";
import BorderedPicker from "../GenericComponents/BorderedPicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SettingsContext } from "../../App";
import { AppSettings } from "../ExportImportData/SettingsManager";

interface Props{
    categorys: CategoryElement[],
    currentTotal: number,
    onAddPressed: (element: BookingElement) => void,
    minimumPossibleDate: Date,
    onCancelPressed: () => void,
    onOpenAddCategorys: () => void,
    openAddCategoryScreen?: () => void //TODO: make it possible to add categorys from within add or edit bookings
}

export const AddBookingScreen = (props: Props): JSX.Element => {
    const [date, setDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<CategoryElement>(props.categorys[props.categorys.length-1]); //TODO: ugly indexing

    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)

    const settingsProvider = useContext<AppSettings>(SettingsContext)


    const onDateChanged = (e: Event, selectedDate: Date | undefined): void => {
        if(selectedDate)
            setDate(selectedDate)
        setDatePickerVisible(false)
    }

    const onAddPressed = (): void => {
        props.onAddPressed({date, total: props.currentTotal + +amount, amount: +amount, description, category} as BookingElement)
    }

    const onCancelPressed = (): void => {
        props.onCancelPressed()
    }

    useEffect(() => {
        setAmount(0)
        setDescription("")
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
                        prefix={settingsProvider.currencySymbol.pre}
                        suffix={settingsProvider.currencySymbol.post}
                        setAmount={(newAmount: number) => setAmount(newAmount)}
                        style={interactionElements.text}
                        normalButtonStyle={darkBlueButtonStyle.buttonStyle}
                        normalButtonTextStyle={darkBlueButtonStyle.titleStyle}
                        specialButtonStyle={orangeButtonStyle.buttonStyle}
                        specialButtonTextStyle={orangeButtonStyle.titleStyle}
                    />

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Category
                    </Text>

                    <View style={[defaultViewStyles.simpleRow, {alignContent: "stretch"}]}>
                        <BorderedPicker
                            //NOTE: can I resize the text?
                            containerStyle={{width: 333}} //TODO: magic number
                            selectedValue={category.id}
                            onValueChange={(itemValue, itemIndex) => (setCategory(props.categorys[itemIndex]))}
                            mode="dropdown"
                            content={props.categorys.map((ce: CategoryElement) => (<Picker.Item label={ce.name} value={ce.id} />))}
                        />
                        <DarkBlueButton
                            buttonStyle={{minWidth: 66}} //TODO: magic numer
                            onPress={() => props.onOpenAddCategorys()}
                            icon={
                                <Icon
                                    name="plus"
                                    size={20}
                                    color={darkBlueButtonStyle.titleStyle.color}
                                />
                            }
                        />
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

                <View style={defaultViewStyles.bottomButtonRow}>
                    <OrangeButton
                        onPress={() => onAddPressed()}
                        title="Add"
                    />

                    <DarkBlueButton
                        onPress={() => onCancelPressed()}
                        title="Cancel"
                    />

                </View>
            </View>

        </View>
    )
}