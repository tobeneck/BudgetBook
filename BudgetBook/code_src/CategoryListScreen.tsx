import React, { useState } from "react"
import { SafeAreaView, View, Button, Text } from "react-native"
import { BookingElement, updateCategory, valueCopyBookings } from "./BookingScreenComponents/BookingList"
import { AddCategoryPopup } from "./CategoryScreenComponents/AddCategoryPopup"
import EditCategoryPopup from "./CategoryScreenComponents/EditCategoryPopup"
import ReassureDeleteCategoryPopup from "./CategoryScreenComponents/ReassureDeleteCategoryPopup"
import { CategoryElement, getCategorysWithoud, getTimesUsed, valueCopyCategorys } from "./CategoryScreenComponents/CategoryList"

interface Props{
    categorys: CategoryElement[]
    setCategorys: (categorys: CategoryElement[]) => void
    bookings: BookingElement[],
    setBookings: (bookings: BookingElement[]) => void
}



const CategoryListScreen = (props: Props): JSX.Element => {
    const [ addPopupVisible, setAddPopupVisible ] = useState<boolean>(false)
    const [ editPopupVisible, setEditPopupVisible ] = useState<boolean>(false)
    const [ reassureDeleteCategoryPopupVisible, setReassureDeleteCategoryPopupVisible ] = useState<boolean>(false)
    const [ currentCategoryIndex, setCurrentCategoryIndex ] = useState<number>(0) //TODO: again, is 0 the best way to initialize it?

    console.log(props.categorys)
    
    /**
     * handles the addition of a booking itemarray
     * @param item the item to be added
     */
    const addBookingItem = (categoryName: string): void => {
        props.setCategorys([{id: props.categorys.length, name: categoryName} as CategoryElement, ...props.categorys])
    }

    /**
     * opens the edit popup for the category at index
     * @param index the index of the category to be edited
     */
    const onEditCategoryItem = (index: number): void => {
        setCurrentCategoryIndex(props.categorys.length - 1 - index) //TODO: this is ugly!
        setEditPopupVisible(true)
    }

    /**
     * handles the "cancel" operation when editing a category list
     */
    const onCancelEditCategoryItem = (): void => {
        setCurrentCategoryIndex(0)
        setEditPopupVisible(false)
    }

    /**
     * handles the "save" operation when editing a category item
     * @param nce the new category element to be saved
     */
    const onSaveEditCategoryItem = (nce: CategoryElement): void => {

        //set the category
        const newCategoryList: CategoryElement[] = valueCopyCategorys(props.categorys)
        newCategoryList[currentCategoryIndex] = nce
        props.setCategorys(newCategoryList)

        //set the bookings
        const oldCategory: CategoryElement = props.categorys[currentCategoryIndex]
        const newBookingList: BookingElement[] = updateCategory(props.bookings, oldCategory,nce)
        props.setBookings(newBookingList)

        setEditPopupVisible(false)
    }

    /**
     * handles the "delete" operation when editing the category list
     */
    const onDeleteCategoryItem = (): void => {
        setEditPopupVisible(false)
        setReassureDeleteCategoryPopupVisible(true)
    }

    const onCancelReassureDelete = (): void => {
        setCurrentCategoryIndex(0)
        setReassureDeleteCategoryPopupVisible(false)
    }

    /**
     * Deletes the category with the oldID and automatically changes the used category in the bookings to a new categoryID
     * @param oldID ID of the old category to be deleted
     * @param newID ID of the new category to be used when deleting the old ones
     */
    const onDeleteReassureDelete = (oldID: number, newID: number): void => {
        const remainingCategorys: CategoryElement[] = getCategorysWithoud(props.categorys, currentCategoryIndex)

        const timesUsed: number = getTimesUsed(props.categorys[currentCategoryIndex], props.bookings)
        const deletedCategory: CategoryElement = props.categorys[currentCategoryIndex]
        let newBookings: BookingElement[] = timesUsed > 1 ? updateCategory(props.bookings, deletedCategory, remainingCategorys[newID]) : valueCopyBookings(props.bookings)
        props.setCategorys(remainingCategorys)
        props.setBookings(newBookings)
        setCurrentCategoryIndex(0)
        setReassureDeleteCategoryPopupVisible(false)
    }

    const renderEditCategoryButton = (id: number): JSX.Element | null => {
        if(id > 0){ //do not allow to edit or delete the first category (uncategorized)
            return(
                <Button
                            onPress={() => onEditCategoryItem(id)}
                            title="Edit"
                            color="#841584"
                            accessibilityLabel="Add Item to the budget list" />
            )
        } else {
            return null
        }
    }

    return (
        <SafeAreaView>
            <AddCategoryPopup
                visible={addPopupVisible}
                setVisible={setAddPopupVisible} //TODO: coherent strategy where to put the setVisible and other methods
                addCategory={addBookingItem}
            />

            <EditCategoryPopup
                visible={editPopupVisible}
                category={props.categorys[currentCategoryIndex]}
                onCancelPressed={() => onCancelEditCategoryItem()}
                onSavePressed={(nce: CategoryElement) => onSaveEditCategoryItem(nce)}
                onDeletePressed={() => onDeleteCategoryItem()}
            />

            <ReassureDeleteCategoryPopup
                visible={reassureDeleteCategoryPopupVisible}
                remainingCategorys={getCategorysWithoud(props.categorys, currentCategoryIndex)}
                //remainingCategorys={props.categorys}
                onCancelPressed={() => onCancelReassureDelete()}
                onDeletePressed={(oldID: number, newID: number) => onDeleteReassureDelete(oldID, newID)}
                timesUsed={getTimesUsed(props.categorys[currentCategoryIndex], props.bookings)}
                category={props.categorys[currentCategoryIndex]}
            />

            <View>
                {props.categorys.map((ce: CategoryElement) => (
                <>
                    <Text> {ce.id} - {ce.name} </Text>
                    {renderEditCategoryButton(ce.id)}
                </>
                ))}
                <Button
                    onPress={() => setAddPopupVisible(true)}
                    title="Add Category"
                    color="#841584"
                    accessibilityLabel="Add Item to the budget list" />
            </View>
        </SafeAreaView>
      )
}

export default CategoryListScreen