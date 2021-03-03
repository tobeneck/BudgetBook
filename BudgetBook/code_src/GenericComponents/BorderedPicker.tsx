import React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { interactionElements, textStyles } from "../Styles/Styles";

interface Props{
    selectedValue: number,
    onValueChange: (itemValue: React.ReactText, itemIndex: number) => void,
    containerStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    mode?: "dropdown" | "dialog"

    content: any //TODO: type. insert the picker items here
}

const BorderedPicker = (props: Props): JSX.Element => {
    return(
        <View style={[interactionElements.textInput, props.containerStyle]}>
            <Picker
                //NOTE: can I resize the text?
                selectedValue={props.selectedValue}
                style={[textStyles.normal, {height: "100%", width: "100%"}, props.textStyle]}
                onValueChange={(itemValue: React.ReactText, itemIndex: number) => props.onValueChange(itemValue, itemIndex)}
                mode={props.mode}
            >
                {props.content}
            </Picker>
        </View>
    )
}

export default BorderedPicker