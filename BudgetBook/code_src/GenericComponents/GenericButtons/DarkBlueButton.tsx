import React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { darkBlueButtonStyle } from "./ButtonStyles"
import GenericButton from "./GenericButton"

interface Props{
    title?: string,
    icon?: any, //TODO: type
    buttonStyle?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>,
    onPress: () => void,
    disabled?: boolean,
}

const DarkBlueButton = (props: Props): JSX.Element => {
    return (
        <GenericButton
            onPress={() => props.onPress()}
            title={props.title}
            icon={props.icon}
            containerStyle={[darkBlueButtonStyle.containerStyle, props.containerStyle]}
            buttonStyle={[darkBlueButtonStyle.buttonStyle, props.buttonStyle]}
            titleStyle={[darkBlueButtonStyle.titleStyle, props.titleStyle]}
            disabled={props.disabled}
        />
    )
}

export default DarkBlueButton