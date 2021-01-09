import React, { useEffect, useState } from "react"
import { Text, TextInput, View } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { bigPopupStyles, buttonStyles, spacings } from "../Styles/Styles"
import { CategoryElement } from "./CategoryList"

interface Props{
    visible: boolean,
    category: CategoryElement,
    onCancelPressed: () => void,
    onDeletePressed: () => void,
    onSavePressed: (nce: CategoryElement) => void,
}

const EditCategoryPopup = (props: Props): JSX.Element => {
    const [ categoryName, setCategoryName ] = useState<string>(props.category.name)

    useEffect(() => {
        setCategoryName(props.category.name)
    }, [props.category])

    return (
        <Overlay
        isVisible={props.visible}
            // onBackdropPress={() => props.setVisible(false)}
            overlayStyle={bigPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.onCancelPressed()}
        >
            <View style={{height: "100%", width: "100%", justifyContent: "space-between"}}>
                <View style={{height: "90%", justifyContent: "flex-start"}}>
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
                        onChangeText={text => setCategoryName(text)}
                        value={categoryName}
                        multiline={true}
                        textAlignVertical="top"
                        editable={props.category.id !== 0}
                    />
                    <Text>Color</Text>
                    <Text
                        style={bigPopupStyles.textInput}
                    >Placeholder!</Text>

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
                            onPress={() => props.onSavePressed({id: props.category.id, name: categoryName} as CategoryElement)}
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
    )
}

export default EditCategoryPopup