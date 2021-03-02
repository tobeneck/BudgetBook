import React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { deleteButtonStyle } from "./ButtonStyles"
import GenericButton from "./GenericButton"

interface Props{
    title?: string,
    icon?: any, //TODO: type
    type?: "outline" | "solid",
    buttonStyle?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>,
    onPress: () => void,
    disabled?: boolean
}

// disabledStyle={buttonStyles.deleteButtonOutlineDisabledStyle} //TODO: disabledStyle?
// disabledTitleStyle={buttonStyles.deleteButtonOutlineDisabledText}

const DeleteButton = (props: Props): JSX.Element => {
    const buttonStyle: StyleProp<ViewStyle> = props.type && props.type === "outline" ? [deleteButtonStyle.outlineButtonStyle, props.buttonStyle] : [deleteButtonStyle.buttonStyle, props.buttonStyle]
    const containerStyle: StyleProp<ViewStyle> = [deleteButtonStyle.buttonContainer, props.containerStyle]
    const titleStyle: StyleProp<TextStyle> = props.type && props.type === "outline" ? [deleteButtonStyle.outlineTitleStyle, props.titleStyle] : [deleteButtonStyle.titleStyle, props.titleStyle]
    return (
        <GenericButton
            type={props.type ? props.type : "solid"}
            onPress={() => props.onPress()}
            title={props.title}
            icon={props.icon}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            titleStyle={titleStyle}
            disabled={props.disabled}
        />
    )
}

export default DeleteButton