import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View, Switch } from "react-native"
import { Overlay, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { buttonStyles, bigPopupStyles, spacings, DefaultColors } from "../Styles/Styles";
import ColorPickerPopup from "../GenericComponents/ColorPicker/ColorPickerPopup";

interface Props{
    visible: boolean,
    addCategory: (categoryName: string, categoryDescription: string, categoryColor: string, active: boolean, hasMaxBudget: boolean, maxBudget: number) => void,
    setVisible: (visible: boolean) => void
}

export const AddCategoryPopup = (props: Props): JSX.Element => {
    const [categoryName, setCategoryName] = useState<string>("")
    const [categoryDescription, setCategoryDescription] = useState<string>("")
    const [categoryColor, setCategoryColor] = useState<string>(DefaultColors.lightGrey)
    const [categoryActive, setCategoryActive] = useState<boolean>(true)
    const [categoryHasMaxBudget, setCategoryHasMaxBudget] = useState<boolean>(false)
    const [categoryMaxBudget, setCategoryMaxBudget] = useState<string>(0+"")
    const [showColorPopup, setShowColorPopup] = useState<boolean>(false)

    const onAddPressed = (): void => {
        props.addCategory(categoryName, categoryDescription, categoryColor, categoryActive, categoryHasMaxBudget, +categoryMaxBudget)
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

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text>MaxBudget</Text>
                            <Switch
                                value={categoryHasMaxBudget}
                                onValueChange={() => setCategoryHasMaxBudget(!categoryHasMaxBudget)}
                                thumbColor={DefaultColors.darkBlue}
                                trackColor={{true: DefaultColors.lightBlue, false: DefaultColors.disabled}}
                            />
                        </View>

                        <TextInput
                            style={bigPopupStyles.textInput}
                            keyboardType = 'numeric'
                            onChangeText={text => setCategoryMaxBudget(text)}
                            value={categoryMaxBudget+""}
                            editable={categoryHasMaxBudget}
                        />

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text>Active</Text>
                            <Switch
                                value={categoryActive}
                                onValueChange={() => setCategoryActive(!categoryActive)}
                                thumbColor={DefaultColors.darkBlue}
                                trackColor={{true: DefaultColors.lightBlue, false: DefaultColors.disabled}}
                            />
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