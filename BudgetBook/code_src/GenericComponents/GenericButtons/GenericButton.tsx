import React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { Button } from "react-native-elements"

interface Props{
    title?: string,
    icon?: any, //TODO: type
    buttonStyle: StyleProp<ViewStyle>,
    containerStyle: StyleProp<ViewStyle>,
    titleStyle: StyleProp<TextStyle>,
    onPress: () => void,
    disabled?: boolean,
    type?: "solid" | "outline"
}

const GenericButton = (props: Props): JSX.Element => {
    return (
        <Button
            onPress={() => props.onPress()}
            icon={props.icon}
            title={props.title}
            containerStyle={props.containerStyle}
            buttonStyle={props.buttonStyle}
            titleStyle={props.titleStyle}
            disabled={props.disabled}
            type={props.type ? props.type : "solid"}
        />
    )
}

export default GenericButton