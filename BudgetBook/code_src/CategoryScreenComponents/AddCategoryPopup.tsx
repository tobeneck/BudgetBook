import React, { useState } from "react"
import { ColorValue, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Overlay, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { buttonStyles, overlayStyles, bigPopupStyles, spacings, smallPopupStyles, DefaultColors } from "../Styles/Styles";
import ColorPickerPopup from "./ColorPickerPopup";

interface Props{
    visible: boolean,
    addCategory: (categoryName: string, categoryDescription: string, categoryColor: string) => void,
    setVisible: (visible: boolean) => void
}

export const AddCategoryPopup = (props: Props): JSX.Element => {
    const [categoryName, setCategoryName] = useState<string>("")
    const [categoryDescription, setCategoryDescription] = useState<string>("")
    const [categoryColor, setCategoryColor] = useState<string>(DefaultColors.lightGrey)
    const [showColorPopup, setShowColorPopup] = useState<boolean>(false)

    const onAddPressed = (): void => {
        props.addCategory(categoryName, categoryDescription, categoryColor)
        props.setVisible(false)
    }

    const onCancelPressed = (): void => {
        props.setVisible(false)
    }

    return (
        <>
        <ColorPickerPopup
            visible={showColorPopup}
            initialColor={categoryColor}
            onCancelPressed={() => setShowColorPopup(false)}
            onSavePressed={(color) => {setCategoryColor(color), setShowColorPopup(false)}}
        />
            <Overlay
                isVisible={props.visible}
                // onBackdropPress={() => props.setVisible(false)}
                overlayStyle={bigPopupStyles.overlay}
                statusBarTranslucent={true}
                onRequestClose={() => onCancelPressed()}
            >
                <View style={{height: "100%", justifyContent: "space-between"}}>
                    <View style={{height: "90%", justifyContent: "flex-start"}}>
                        <Text style={bigPopupStyles.headline}>Add Category</Text>
                        <Text>Name</Text>
                        <TextInput
                            style={bigPopupStyles.textInput}
                            onChangeText={text => setCategoryName(text)}
                            value={categoryName}
                        />

                        <Text>Description</Text>
                        <TextInput
                            style={bigPopupStyles.textField}
                            onChangeText={text => setCategoryDescription(text)}
                            value={categoryDescription}
                            multiline={true}
                            textAlignVertical="top"
                        />
                        <Text>Color</Text>
                        <View style={bigPopupStyles.text}>
                            <TouchableOpacity
                                style={bigPopupStyles.iconAndText}
                                onPress={() => setShowColorPopup(true)}
                            >
                                <Icon
                                    name="color-lens"
                                    size={16}
                                    color={categoryColor}
                                    style={{alignContent: "center"}}
                                />
                                <Text>{categoryColor}</Text>
                            </TouchableOpacity>
                        </View>
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
        </>
    )
}