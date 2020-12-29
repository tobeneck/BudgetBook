import React, { useEffect, useState } from "react"
import { Modal, Text, TextInput, Button } from "react-native"
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
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
            <Text>category name:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={newName => setCategoryName(newName)}
                value={categoryName}
            />
            <Button
                onPress={() => props.onSavePressed({name: categoryName, id: props.category.id} as CategoryElement)}
                title="Save"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
            <Button
                onPress={() => props.onCancelPressed()}
                title="Cancel"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
            <Button
                onPress={() => props.onDeletePressed()}
                title="Delete"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
        </Modal>
    )
}

export default EditCategoryPopup