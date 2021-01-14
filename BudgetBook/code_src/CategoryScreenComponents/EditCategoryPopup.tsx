import React, { useEffect, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { bigPopupStyles, buttonStyles, DefaultColors, spacings } from "../Styles/Styles"
import { CategoryElement } from "./CategoryList"
import Icon from 'react-native-vector-icons/MaterialIcons';

import ColorPickerPopup from "./ColorPickerPopup"

interface Props{
    visible: boolean,
    category: CategoryElement,
    onCancelPressed: () => void,
    onDeletePressed: () => void,
    onSavePressed: (nce: CategoryElement) => void,
}

const EditCategoryPopup = (props: Props): JSX.Element => {
    const [ categoryName, setCategoryName ] = useState<string>(props.category.name)
    const [categoryDescription, setCategoryDescription] = useState<string>(props.category.description)
    const [categoryColor, setCategoryColor] = useState<string>(props.category.color)
    const [showColorPopup, setShowColorPopup] = useState<boolean>(false)

    useEffect(() => {
        setCategoryName(props.category.name)
        setCategoryDescription(props.category.description)
        setCategoryColor(props.category.color)
    }, [props.category])

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
                onRequestClose={() => props.onCancelPressed()}
            >
                <View style={{height: "100%", width: "100%", justifyContent: "space-between"}}>

                    <View style={{height: "90%", justifyContent: "flex-start"}}>
                        <Text style={bigPopupStyles.headline}>Edit Category</Text>
                        <Text>Name</Text>
                        <TextInput
                            style={bigPopupStyles.textInput}
                            onChangeText={text => setCategoryName(text)}
                            value={categoryName}
                            editable={props.category.id !== 0}
                        />
                        <Text>Description</Text>
                        <TextInput
                            style={bigPopupStyles.textField}
                            onChangeText={text => setCategoryDescription(text)}
                            value={categoryDescription}
                            multiline={true}
                            textAlignVertical="top"
                            editable={props.category.id !== 0}
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

                    <View style={{width: "100%", flexDirection: "row", justifyContent:"space-between"}}>
                        <Button
                            onPress={() => props.onDeletePressed()}
                            title="Delete"
                            titleStyle={buttonStyles.deleteButtonOutlineText}
                            type="outline"
                            buttonStyle={buttonStyles.deleteButtonOutlineStyle}
                            disabled={props.category.id === 0}
                        />

                        <View style={{flexDirection: "row"}}>
                            <Button
                                onPress={() => props.onSavePressed({id: props.category.id, name: categoryName, description: categoryDescription, color: categoryColor } as CategoryElement)}
                                title="Save"
                                buttonStyle={buttonStyles.saveButtonStyle}
                                titleStyle={buttonStyles.saveButtonText}
                                accessibilityLabel="Add Item to the budget list"
                            />

                            <View style={spacings.doubleVerticalSpacing}/>

                            <Button
                                onPress={() => props.onCancelPressed()}
                                title="Cancel"
                                titleStyle={buttonStyles.cancelButtonText}
                                buttonStyle={buttonStyles.cancelButtonStyle}
                            />
                        </View>

                    </View>
                </View>
            </Overlay>
        </>
    )
}

export default EditCategoryPopup