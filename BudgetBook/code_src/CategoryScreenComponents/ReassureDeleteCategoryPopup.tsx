import React, { useState } from "react"
import { Text, View } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { CategoryElement } from "./CategoryList"
import { buttonStyles, smallPopupStyles } from "../Styles/Styles";
import { Overlay, Button } from "react-native-elements";

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
                    <Text style={smallPopupStyles.text}>The category is used {props.timesUsed} {props.timesUsed === 1 ? "time" : "times"}.The the category using this booking will be changed to: </Text>

                    <View style={smallPopupStyles.picker}>
                        <Picker
                            selectedValue={props.remainingCategorys.length - 1 - replacementCategoryIndex}  //TODO: this is alsi ugly! Think aboud how to assign IDs for categorys, or how to add them
                            onValueChange={(itemValue, itemIndex) => (setReplacementCategoryIndex(itemIndex))}
                            mode="dropdown"
                            style={{height: "100%", width: "100%"}}
                        >
                            {props.remainingCategorys.map((ce: CategoryElement) => (<Picker.Item label={ce.name} value={ce.id} />))}
                        </Picker>
                    </View>
                </>
            )
        else
            return null
    }

    return (

        <Overlay
        isVisible={props.visible}
        // onBackdropPress={() => props.setVisible(false)}
        overlayStyle={smallPopupStyles.overlay}
        statusBarTranslucent={true}
        onRequestClose={() => props.onCancelPressed()}
        >
            <View style={{height: "100%", width: "100%", justifyContent: "space-between"}}>
                <Text style={smallPopupStyles.headline} numberOfLines={3}>Delete the category "{props.category.name}"?</Text>

                {pickNewCategory()}

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Button
                        onPress={() => props.onDeletePressed(props.category.id, replacementCategoryIndex)}
                        title="Delete"
                        buttonStyle={buttonStyles.deleteButtonStyle}
                        titleStyle={buttonStyles.deleteButtonText}
                    />

                    <Button
                        onPress={() => props.onCancelPressed()}
                        title="Cancel"
                        titleStyle={buttonStyles.cancelButtonText}
                        buttonStyle={buttonStyles.cancelButtonStyle}
                    />
                </View>
            </View>
        </Overlay>
    )
}

export default ReassureDeleteCategoryPopup