import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { Overlay, Button } from "react-native-elements";
import { buttonStyles, overlayStyles, bigPopupStyles, spacings, smallPopupStyles } from "../Styles/Styles";

interface Props{
    visible: boolean,
    addCategory: (categoryName: string) => void,
    setVisible: (visible: boolean) => void
}

export const AddCategoryPopup = (props: Props): JSX.Element => {
    const [categoryName, setCategoryName] = useState("");

    const onAddPressed = (): void => {
        props.addCategory(categoryName)
        props.setVisible(false)
    }

    const onCancelPressed = (): void => {
        props.setVisible(false)
    }

    return (
    <Overlay
        isVisible={props.visible}
        // onBackdropPress={() => props.setVisible(false)}
        overlayStyle={bigPopupStyles.overlay}
        statusBarTranslucent={true}
        onRequestClose={() => onCancelPressed()}
    >
        <View style={{height: "100%", justifyContent: "space-between"}}>
            <View style={{height: "90%", justifyContent: "flex-start"}}>
                <Text>Name</Text>
                <TextInput
                    style={bigPopupStyles.textInput}
                    onChangeText={text => setCategoryName(text)}
                    value={categoryName}
                />

                <Text>Description</Text>
                <TextInput
                    style={bigPopupStyles.textField}
                    onChangeText={text => setCategoryName(text)}
                    value={categoryName}
                    multiline={true}
                    textAlignVertical="top"
                />
                <Text>Color</Text>
                <Text
                    style={bigPopupStyles.textInput}
                >Placeholder!</Text>
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
    )
}