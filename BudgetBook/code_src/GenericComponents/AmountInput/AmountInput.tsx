import React, { useState, useEffect } from "react"
import { NativeSyntheticEvent, StyleProp, Text, TextInput, TextInputSelectionChangeEventData, TextStyle, View, ViewStyle } from "react-native"
import { Button, Overlay } from "react-native-elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { amountInputStyles } from "./AmountInputStyle"
import {  defaultColors, interactionElements } from "../../Styles/Styles"

interface CursorPos{
    start: number,
    end?: number
}
interface Props{
    amount: number,
    setAmount: (amount: number) => void,
    style?: TextStyle,
    prefix?: string,
    suffix?: string,
    normalButtonStyle?: ViewStyle,
    normalButtonTextStyle?: TextStyle,
    specialButtonStyle?: ViewStyle,
    specialButtonTextStyle?: TextStyle,
    disabled?: boolean
}

/**
 * returns a correctly formated string with curreny symbol.
 * @param amount the amount to be printet
 * @param currencyPrefix the currency prefix
 * @param currencySuffix the currency suffix
 * @param withPlus should "+" symbols also be printet?
 */
export const numberToCurrency = (amount: number, currencyPrefix: string, currencySuffix: string, withPlus: boolean = false): string => {
    const operator: string = amount < 0 ? "-" : withPlus ? "+" : ""
    const amountText: string = Math.abs(amount).toFixed(2)

    return operator+currencyPrefix+amountText+currencySuffix
}

/**
 * own implementation of a replace function to replace all characters. Will be unneccecary of a replaceAll will be implemented for strings
 * @param input the input string to be replaced
 * @param removeChar the char or string to be removed
 * @param replacementChar the char or string to replace the original
 */
const replaceAll = (input: string, removeChar: string, replacementChar: string): string => {
    if(removeChar === replacementChar)
        return input

    let outputString: string = input
    while(outputString.includes(removeChar))
        outputString = outputString.replace(removeChar, replacementChar)
    return outputString
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

    const style: StyleProp<TextStyle> = props.disabled ? [props.style, {color: defaultColors.disabled}] : [props.style]
    useEffect(() => {
        setAmount(props.amount+"")
        setNumberInputPopupVisible(false)
        setCursorPos({start: (props.amount+"").length} as CursorPos)
        setEvaluatedAmount(props.amount)
    }, [props])

    /**
     * checks of the text to be evaluated contains only valid letters. Otherwise it would be possible to execute javascript inside of the text input
     * @param textToCheck the text to be checked
     */
    const textValid = (textToCheck: string): boolean => {
        let text: string = textToCheck

        text = replaceAll(text, "1", "")
        text = replaceAll(text, "2", "")
        text = replaceAll(text, "3", "")
        text = replaceAll(text, "4", "")
        text = replaceAll(text, "5", "")
        text = replaceAll(text, "6", "")
        text = replaceAll(text, "7", "")
        text = replaceAll(text, "8", "")
        text = replaceAll(text, "9", "")
        text = replaceAll(text, "0", "")
        text = replaceAll(text, "+", "")
        text = replaceAll(text, "-", "")
        text = replaceAll(text, " ", "")

        return text.length === 0
    }

    /**
     * savely sets a new cursor pos, if it is inside of the valid bounds
     * @param newPos the new pos to be set
     */
    const savelySetCursorPos = (newPos: CursorPos, saveCursorPos: number = amount.length): void => {
        console.log(newPos, saveCursorPos)
        if(newPos.start > saveCursorPos
            || (!!newPos.end && newPos.end > saveCursorPos)
            || newPos.start < 0){ //do not allow unvalid cursor positions!
            console.warn("wow, this should not happen!")
            return
        }
        setCursorPos(newPos)
    }

    // /**
    //  * a simple function to evaluate a string function containing + and - operators
    //  * eval function also interpretes other types of numbers (like binary...)
    //  * @param s
    //  */
    // const evalStringFunction = (input: string): number | null => {
    //     var total = 0
    //     var numbers: string[] = input.split("+")

    //     numbers.forEach((value: string) => {
    //         if(value)
    //         total += parseFloat(value)
    //     })
    //     return total;
    //   }

    const onKeyPressed = (key: string): void => {
        let newAmount: string = ""

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
                savelySetCursorPos({start: cursorPos.start-1, end: undefined} as CursorPos, amount.length - 1) //as we remove one the save length is shorter
                break
            case "enter":
                if(evaluatedAmount !== undefined)
                    props.setAmount(evaluatedAmount)
                setNumberInputPopupVisible(false)
                break
            default:
                newAmount = left+key+right
                console.log(cursorPos.start)
                savelySetCursorPos({start: cursorPos.start+1, end: undefined} as CursorPos, amount.length + 1) //as we remove one the save length is longer
        }
        setAmount(newAmount)


        //check if the text xontains invalid symbols, otherwise eval could interpret javascript which would be pretty bad
        if(!textValid(newAmount)){
            setEvaluatedAmount(undefined)
        }
        else{
            let result: any;
            try{ //this try catch should not be possible
                result = eval(newAmount)
            } catch {
                setEvaluatedAmount(undefined)
            }
            setEvaluatedAmount(result as number)

        }
    }

    return(
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
                    style={[amountInputStyles.textInput, interactionElements.textInput, {width: "74.5%"}]}
                    showSoftInputOnFocus={false}
                    onSelectionChange={(event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
                        const newPos: CursorPos = {start: event.nativeEvent.selection.start, end: event.nativeEvent.selection.end} as CursorPos
                        savelySetCursorPos(newPos)
                    }}
                    selection={cursorPos}
                    autoFocus={true}
                    value={amount}
                    selectionColor={defaultColors.primaryColor}
                    onChangeText={(newText: string) => {
                        setAmount(newText)
                        //check if the text xontains invalid symbols, otherwise eval could interpret javascript which would be pretty bad
                        if(!textValid(newText)){
                            setEvaluatedAmount(undefined)
                        }
                    }} //to make copy and paste work
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
            style={style} //TODO: pull the style opt to the parent!
            onPress={() => {
                if(!props.disabled)
                    setNumberInputPopupVisible(true)
            }}
        > {numberToCurrency(props.amount, props.prefix ? props.prefix : "", props.suffix ? props.suffix : "", false)}</Text>

    </>
    )
}

//TODO: create a stylesheet

export default AmountInput