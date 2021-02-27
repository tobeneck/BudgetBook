import { BookingElement } from "../BookingScreenComponents/BookingList"
import { colors } from "../Styles/Styles";


export interface SuperCategoryElement{
    id: number,
    name: string,
    description: string,
    color: string, //hex value of the color
    hasMaxBudget: boolean,
    maxBudget: number,
    categorys: number[] //list of category IDs
}

//TODO: refracture or delete
// export const defaultCategoryElement: CategoryElement = {
//     id: 0,
//     name: "uncategorized",
//     description: "For all bookings not fitting in any cateAgory. This category can not be edited or deleted.",
//     color: DefaultColors.lightGrey,
//     activated: true,
//     hasBudget: false,
//     maxBudget: 0
// }


//TODO: used?
/**
 * returns a copy of the current superCategorys withoud the element at the indexToBeRemoved. The IDs of the new categorys are changed to fill the gap created by the removed element.
 * @param categorys the categorys to be altered
 * @param indexToBeRemoved the index to be removed
 */
export const getSuperCategorysWithoud = (superCategorys: SuperCategoryElement[], indexToBeRemoved: number): SuperCategoryElement[] => { //TODO: is this operation right here?
    const newSuperCategoryList: SuperCategoryElement[] = valueCopySuperCategorys(superCategorys) //make a deep copy to avoid errors

    if (indexToBeRemoved > -1 && superCategorys.length >= 1) { //TODO: maybe bake this to a 2
        newSuperCategoryList.splice(indexToBeRemoved, 1);
    }
    else {
        console.error("Error when creating a categoryList withoud a specific index, index "+ indexToBeRemoved +" or categoryListLength "+ superCategorys.length+" are not long enough.")
    }

    //re-set the IDs of the categorys
    newSuperCategoryList.forEach((element, index) => {
        console.log("getCategorysWithoud correction: ",element.id," => ",newSuperCategoryList.length - 1 - index)
        element.id = newSuperCategoryList.length - 1 - index
    });

    return newSuperCategoryList
}

/**
 * returns a copy by value of a CategoryElement[]. (Not a reference)
 * @param categorys the category array to be copied
 */
export const valueCopySuperCategorys = (superCategorys: SuperCategoryElement[]): SuperCategoryElement[] => {
    let superCategorysCopy: SuperCategoryElement[] = []
    for(let i: number = 0; i < superCategorys.length; i++){
        superCategorysCopy.push(valueCopySuperCategory(superCategorys[i]))
    }
    return superCategorysCopy
}

/**
 * returns a copy by value of a CategoryElement. (Not a reference)
 * @param categorys the category to be copied
 */
export const valueCopySuperCategory = (superCategory: SuperCategoryElement): SuperCategoryElement => {
    return {id: superCategory.id, name: superCategory.name, color: superCategory.color, description: superCategory.description, hasMaxBudget: superCategory.hasMaxBudget, maxBudget: superCategory.maxBudget, categorys: superCategory.categorys} as SuperCategoryElement
    //TODO: try JSON.stringify and JSON.parse
}