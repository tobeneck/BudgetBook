import React, { useState } from "react"
import { Modal, Button, Text } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { CategoryElement } from "./CategoryList"

interface Props{
    visible: boolean,
    category: CategoryElement, //the category to be deleted
    timesUsed: number, //the amount of times the category is
    remainingCategorys: CategoryElement[],
    onCancelPressed: () => void,
    onDeletePressed: (oldID: number, newID: number) => void
}

const ReassureDeleteCategoryPopup = (props: Props): JSX.Element => {
    const [ replacementCategoryIndex, setReplacementCategoryIndex ] = useState<number>(0)

    /**
     * returns a promt to pick the new category the bookings get if they are in the category to delete.
     * Is only displayed if the category to be deleted is used.
     */
    const pickNewCategory = (): JSX.Element | null => {
        if(props.timesUsed > 0)
            return (
                <>
                    <Text>The category is used {props.timesUsed} times.The the category using this booking will be changed to: </Text>
                    <Picker
                        selectedValue={props.remainingCategorys.length - 1 - replacementCategoryIndex}  //TODO: this is alsi ugly! Think aboud how to assign IDs for categorys, or how to add them
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => (setReplacementCategoryIndex(itemIndex))}
                        mode="dropdown"
                    >
                        {props.remainingCategorys.map((ce: CategoryElement) => (<Picker.Item label={ce.name} value={ce.id} />))}
                    </Picker>
                </>
            )
        else
            return null
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
            <Text>Are you shure you wand to delete the category "{props.category.name}"?</Text>
            {pickNewCategory()}
            <Button
                onPress={() => props.onDeletePressed(props.category.id, replacementCategoryIndex)}
                title="Delete"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
            <Button
                onPress={() => props.onCancelPressed()}
                title="Cancel"
                color="#841584"
                accessibilityLabel="Add Item to the budget list"
            />
        </Modal>
    )
}

export default ReassureDeleteCategoryPopup