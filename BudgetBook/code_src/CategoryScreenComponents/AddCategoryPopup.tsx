import React, { useState } from "react"
import { Button, Text, TextInput, Modal, Alert } from "react-native"

interface Props{
    visible: boolean,
    addCategory: (categoryName: string) => void,
    setVisible: (visible: boolean) => void
}

export const AddCategoryPopup = (props: Props): JSX.Element => {
    const [categoryName, setCategoryName] = useState("");

    const onAddPressed = (e: Event): void => {
        props.addCategory(categoryName)
        props.setVisible(false)
    }

    const onCancelPressed = (e: Event): void => {
        props.setVisible(false)
    }

    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <Text>category name:</Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setCategoryName(text)}
            value={categoryName}
        />
        <Button
            onPress={(e: Event) => onAddPressed(e)}
            title="Add"
            color="#841584"
            accessibilityLabel="Add Item to the budget list"
        />
        <Button
            onPress={(e: Event) => onCancelPressed(e)}
            title="Cancel"
            color="#841584"
            accessibilityLabel="Add Item to the budget list"
        />
      </Modal>
    )
}