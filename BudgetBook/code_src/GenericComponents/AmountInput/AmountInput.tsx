import React, { useState, useEffect, useRef } from "react"
import { NativeSyntheticEvent, StyleProp, Text, TextInput, TextInputSelectionChangeEventData, TextStyle, View, ViewStyle } from "react-native"
import { Button, Overlay } from "react-native-elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { defaultTextInputStyles } from "../../Styles/DefaultStyles"
import { amountInputStyles } from "./AmountInputStyle"
import { bigPopupStyles } from "../../Styles/Styles"

interface CursorPos{
    start: number,
    end?: number
}
interface Props{
    amount: number,
    setAmount: (amount: number) => void,
    style?: TextStyle,
    normalButtonStyle?: ViewStyle,
    normalButtonTextStyle?: TextStyle,
    specialButtonStyle?: ViewStyle,
    specialButtonTextStyle?: TextStyle,
}

const AmountInput = (props: Props): JSX.Element =>  {
    const [amount, setAmount] = useState<string>(props.amount+"")
    const [numberInputPopupVisible, setNumberInputPopupVisible] = useState<boolean>(false)
    const [cursorPos, setCursorPos] = useState<CursorPos>({start: (props.amount+"").length} as CursorPos)
    const [evaluatedAmount, setEvaluatedAmount] = useState<number | undefined>(props.amount)

    //button style goes into the container, text style goes into the title
    const normalButtonStyle: StyleProp<ViewStyle> = !!props.normalButtonStyle ? [amountInputStyles.buttonStyle ,props.normalButtonStyle] : [amountInputStyles.buttonStyle]
    const normalButtonTextStyle: StyleProp<TextStyle> = !!props.normalButtonTextStyle ? [props.normalButtonTextStyle] : [amountInputStyles.buttonTitleStyle]
    const specialButtonStyle: StyleProp<ViewStyle> = !!props.specialButtonStyle ? [amountInputStyles.buttonStyle ,props.specialButtonStyle] : [amountInputStyles.buttonStyle]
    const specialButtonTextStyle: StyleProp<TextStyle> = !!props.specialButtonTextStyle ? [props.specialButtonTextStyle] : [amountInputStyles.buttonTitleStyle]

    useEffect(() => {
        setAmount(props.amount+"")
        setNumberInputPopupVisible(false)
        setCursorPos({start: (props.amount+"").length} as CursorPos)
        setEvaluatedAmount(props.amount)
    }, [props])

    let newAmount: string = ""
    const onKeyPressed = (key: string): void => {

        let left: string = ""
        let right: string = ""
        if(!cursorPos.end){ //slice depending if a end exists or not
            right = amount.slice(cursorPos.start,amount.length)
            left = amount.slice(0,cursorPos.start)
        } else{
            right = amount.slice(cursorPos.end,amount.length)
            left = amount.slice(0,cursorPos.start)
        }

        switch(key){
            // case ".":
            //     setAmount(amount+key)
            //     break
            // case "-":
            //     break
            // case "+":
            //     break
            // case " ":
            //     break
            case "delete":
                newAmount = left.slice(0,left.length-1)+right
                break
            case "enter":
                if(evaluatedAmount !== undefined)
                    props.setAmount(evaluatedAmount)
                setNumberInputPopupVisible(false)
                break
            default:
                newAmount = left+key+right
                setCursorPos({start: cursorPos.start+1, end: undefined} as CursorPos)

        }
        setAmount(newAmount)

        //TODO: evaluate
        let result: any;
        try{
            result = eval(newAmount)
        } catch {
            setEvaluatedAmount(undefined)
        }
        console.log("result: ", result)
        setEvaluatedAmount(result as number)
    }

    const onCursorMoved = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>): void => {
        console.log(event.nativeEvent.selection)
        setCursorPos({start: event.nativeEvent.selection.start, end: event.nativeEvent.selection.end} as CursorPos)
    }

    return( //TODO: style!
        <>
        <Overlay
            isVisible={numberInputPopupVisible}
            //backdropStyle={{backgroundColor: "transparent"}}
            overlayStyle={amountInputStyles.overlay}
            animationType={"fade"}
            onRequestClose={() => setNumberInputPopupVisible(false)}
            onBackdropPress={() => setNumberInputPopupVisible(false)}
            statusBarTranslucent={true}
        >
            <>
            <View style={amountInputStyles.topBar}>
                <TextInput
                    style={[amountInputStyles.textInput, defaultTextInputStyles.textInput]}
                    showSoftInputOnFocus={false}
                    onSelectionChange={(event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => onCursorMoved(event)}
                    selection={cursorPos}
                    autoFocus={true}
                    value={amount}
                />
                <Text
                    style={amountInputStyles.resultText}
                    numberOfLines={2}
                >
                    {" = "}{evaluatedAmount !== undefined ? ((evaluatedAmount+"").length > 10 ? evaluatedAmount.toExponential(5) : evaluatedAmount): " incorrect number"} {/*5 as the magic number to fit the number on screen*/}
                </Text>
            </View>

            <View style={{alignContent: "flex-start", flexWrap: "wrap"}}>
                <Button
                    title="1"
                    onPress={() => onKeyPressed("1")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="4"
                    onPress={() => onKeyPressed("4")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="7"
                    onPress={() => onKeyPressed("7")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    icon={
                        <Icon
                            name="keyboard-space"
                            size={20}
                            style={normalButtonTextStyle}
                        />
                    }
                    onPress={() => onKeyPressed(" ")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    type={"solid"}
                />
                <Button
                    title="2"
                    onPress={() => onKeyPressed("2")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="5"
                    onPress={() => onKeyPressed("5")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="8"
                    onPress={() => onKeyPressed("8")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="0"
                    onPress={() => onKeyPressed("0")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="3"
                    onPress={() => onKeyPressed("3")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="6"
                    onPress={() => onKeyPressed("6")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="9"
                    onPress={() => onKeyPressed("9")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="."
                    onPress={() => onKeyPressed(".")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    icon={
                        <Icon
                            name="keyboard-backspace"
                            size={20}
                            style={normalButtonTextStyle}
                        />
                    }
                    onPress={() => onKeyPressed("delete")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    type={"solid"}
                />
                <Button
                    title="+"
                    onPress={() => onKeyPressed("+")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    title="-"
                    onPress={() => onKeyPressed("-")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={normalButtonStyle}
                    titleStyle={normalButtonTextStyle}
                    type={"solid"}
                />
                <Button
                    icon={
                        <Icon
                            name="keyboard-return"
                            size={20}
                            style={specialButtonTextStyle}
                        />
                    }
                    onPress={() => onKeyPressed("enter")}
                    containerStyle={amountInputStyles.buttonContainer}
                    buttonStyle={specialButtonStyle}
                    type={"solid"}
                    disabled={evaluatedAmount === undefined} //TODO: disabled style
                />
            </View>
            </>
        </Overlay>

        <Text
            style={props.style} //TODO: pull the style opt to the parent!
            //keyboardType = 'numeric'
            onPress={() => setNumberInputPopupVisible(true)}
            //onBlur={() => setNumberInputPopupVisible(false)}
            //showSoftInputOnFocus={false}
            //value={props.amount}
        > {props.amount}</Text>

    </>
    )
}

//TODO: create a stylesheet

export default AmountInput