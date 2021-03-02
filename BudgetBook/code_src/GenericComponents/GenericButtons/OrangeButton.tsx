import React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { orangeButtonStyle } from "./ButtonStyles"
import GenericButton from "./GenericButton"

interface Props{
    title?: string,
    icon?: any, //TODO: type
    buttonStyle?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>,
    onPress: () => void,
    disabled?: boolean
}

const OrangeButton = (props: Props): JSX.Element => {
    return (
        <GenericButton
            onPress={() => props.onPress()}
            title={props.title}
            icon={props.icon}
            containerStyle={[orangeButtonStyle.containerStyle, props.containerStyle]}
            buttonStyle={[orangeButtonStyle.buttonStyle, props.buttonStyle]}
            titleStyle={[orangeButtonStyle.titleStyle, props.titleStyle]}
            disabled={props.disabled}
        />
    )
}

export default OrangeButton