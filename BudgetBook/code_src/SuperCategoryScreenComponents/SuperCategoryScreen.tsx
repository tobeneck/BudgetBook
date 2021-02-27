import React, { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { Button } from "react-native-elements"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoryElement } from "../CategoryScreenComponents/CategoryList";
import { tableStyles, colors, buttonStyles } from "../Styles/Styles"
import { AddSuperCategoryPopup } from "./AddSuperCategory";
import { SuperCategoryElement, valueCopySuperCategorys } from "./SuperCategoryList";

interface Props{
    superCategorys: SuperCategoryElement[]
    setSuperCategorys: (superCategorys: SuperCategoryElement[]) => void
    categorys: CategoryElement[]
}



const SuperCategoryListScreen = (props: Props): JSX.Element => {
    const [ addPopupVisible, setAddPopupVisible ] = useState<boolean>(false)
    const [ editPopupVisible, setEditPopupVisible ] = useState<boolean>(false)
    const [ reassureDeletePopupVisible, setReassureDeletePopupVisible ] = useState<boolean>(false)
    const [ currentSuperCategoryIndex, setCurrentSuperCategoryIndex ] = useState<number>(0) //TODO: again, is 0 the best way to initialize it?

    /**
     * handles the addition of a superCategory item
     * @param item the item to be added
     */
    const addSuperCategoryItem = (name: string, description: string, color: string, categorys: number[], hasMaxBudget: boolean, maxBudget: number): void => { //TODO: edit the input
        props.setSuperCategorys([{id: props.superCategorys.length, name, description, color, categorys, hasMaxBudget, maxBudget} as SuperCategoryElement, ...props.superCategorys])
    }

    /**
     * opens the edit popup for the category at index
     * @param index the index of the category to be edited
     */
    const onEditSuperCategoryItem = (index: number): void => {
        setCurrentSuperCategoryIndex(props.categorys.length - 1 - index) //TODO: this is ugly!
        setEditPopupVisible(true)
    }

    /**
     * handles the "cancel" operation when editing a super category item
     */
    const onCancelEditCategoryItem = (): void => {
        setCurrentSuperCategoryIndex(0)
        setEditPopupVisible(false)
    }

    /**
     * handles the "save" operation when editing a super category item
     * @param nsce the new category element to be saved
     */
    const onSaveEditSuperCategoryItem = (nsce: SuperCategoryElement): void => {
        const newSuperCategoryList: SuperCategoryElement[] = valueCopySuperCategorys(props.superCategorys)
        newSuperCategoryList[currentSuperCategoryIndex] = nsce

        props.setSuperCategorys(newSuperCategoryList)

        setEditPopupVisible(false)
    }

    /**
     * handles the "delete" operation when editing the super category list
     */
    const onDeleteSuperCategoryItem = (): void => {
        setEditPopupVisible(false)
        setReassureDeletePopupVisible(true)
    }

    /**
     * handles the "cancel" operation when deleting a super category
     */
    const onCancelReassureDelete = (): void => {
        setCurrentSuperCategoryIndex(0)
        setReassureDeletePopupVisible(false)
    }

    /**
     * handles the "deletee" operation when deleting a super category
     */
    const onDeleteReassureDelete = () => {
        const newSuperCategoryList: SuperCategoryElement[] = props.superCategorys

        if (currentSuperCategoryIndex > -1) {
            newSuperCategoryList.splice(currentSuperCategoryIndex, 1);
        }

        props.setSuperCategorys(newSuperCategoryList)
        setCurrentSuperCategoryIndex(0)
        setReassureDeletePopupVisible(false)
    }

    return (
        <>
            <AddSuperCategoryPopup
                visible={addPopupVisible}
                setVisible={setAddPopupVisible} //TODO: coherent strategy where to put the setVisible and other methods
                addSuperCategory={addSuperCategoryItem}
            />

            {/* <EditSuperCategoryPopup
                visible={editPopupVisible}
                category={props.categorys[currentCategoryIndex]}
                onCancelPressed={() => onCancelEditCategoryItem()}
                onSavePressed={(nce: CategoryElement) => onSaveEditCategoryItem(nce)}
                onDeletePressed={() => onDeleteCategoryItem()}
            />

            <ReassureDeleteSuperCategoryPopup
                visible={reassureDeleteCategoryPopupVisible}
                remainingCategorys={getCategorysWithoud(props.categorys, currentCategoryIndex)}
                //remainingCategorys={props.categorys}
                onCancelPressed={() => onCancelReassureDelete()}
                onDeletePressed={(oldID: number, newID: number) => onDeleteReassureDelete(oldID, newID)}
                timesUsed={getTimesUsed(props.categorys[currentCategoryIndex], props.bookings)}
                category={props.categorys[currentCategoryIndex]}
            /> */}

            <View style={tableStyles.table}>
                <View style={tableStyles.tableHeader}>
                    {/* widths should combine to 90%: */}
                    <Text style={{width: "15%", fontWeight: 'bold'}}>Nr.</Text>
                    <Text style={{width: "75%", fontWeight: 'bold'}}>Name</Text>
                </View>

                <ScrollView
                    style={tableStyles.tableContent}
                >
                    {props.superCategorys.map((sce: SuperCategoryElement) => (
                        <>
                            <View style={tableStyles.tableRow}>
                                <Text style={{width: "15%"}}>{sce.id}</Text>
                                <Text style={{width: "75%"}}>{sce.name}</Text>
                                <Button
                                    onPress={() => onEditSuperCategoryItem(sce.id)}
                                    type="clear"
                                    icon={
                                        <Icon
                                          name="file-document-edit-outline"
                                          size={23}
                                          color={colors.darkBlue}
                                        />
                                    }
                                />
                            </View>
                        </>
                    ))}
                </ScrollView>

                <View style={tableStyles.tableButton}>
                    <Button
                        onPress={() => setAddPopupVisible(true)}
                        title="Add Super Category"
                        buttonStyle={buttonStyles.orangeButtonStyle}
                        titleStyle={buttonStyles.orangeButtonText}
                        accessibilityLabel="Add Item to the budget list"
                    />
                </View>
            </View>
        </>
      )
}

export default SuperCategoryListScreen