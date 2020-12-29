import { BookingElement } from "../BookingScreenComponents/BookingList"


export interface CategoryElement{
    id: number,
    name: string

}

export const defaultCategoryElement: CategoryElement = {
    id: 0,
    name: "uncategorized",
}


/**
 * returns a copy of the current categorys withoud the element at the indexToBeRemoved. The IDs of the new categorys are changed to fill the gap created by the removed element.
 * @param categorys the categorys to be altered
 * @param indexToBeRemoved the index to be removed
 */
export const getCategorysWithoud = (categorys: CategoryElement[], indexToBeRemoved: number): CategoryElement[] => { //TODO: is this operation right here?
    const newCategoryList: CategoryElement[] = valueCopyCategorys(categorys) //make a deep copy to avoid errors

    if (indexToBeRemoved > -1 && categorys.length >= 1) { //TODO: maybe bake this to a 2
        newCategoryList.splice(indexToBeRemoved, 1);
    }
    else {
        console.error("Error when creating a categoryList withoud a specific index, index "+ indexToBeRemoved +" or categoryListLength "+ categorys.length+" are not long enough.")
    }

    //re-set the IDs of the categorys
    newCategoryList.forEach((element, index) => {
        console.log("getCategorysWithoud correction: ",element.id," => ",newCategoryList.length - 1 - index)
        element.id = newCategoryList.length - 1 - index
    });

    return newCategoryList
}

/**
 * returns the amount of times the category is used in a booking list
 * @param category the category to be checked for
 * @param bookings the bookings to be searched
 */
export const getTimesUsed = (category: CategoryElement, bookings: BookingElement[]): number => {
    let timesUsed = 0

    bookings.forEach(be => {
        if(be.category.id === category.id && be.category.name === category.name)
            timesUsed += 1
    })

    return timesUsed
}

/**
 * returns a copy by value of a CategoryElement[]. (Not a reference)
 * @param categorys the category array to be copied
 */
export const valueCopyCategorys = (categorys: CategoryElement[]): CategoryElement[] => {
    //return Array.from(categorys)
    //return [...categorys]
    let categorysCopy: CategoryElement[] = []
    for(let i: number = 0; i < categorys.length; i++){
        categorysCopy.push(valueCopyCategory(categorys[i]))
    }
    return categorysCopy
}

/**
 * returns a copy by value of a CategoryElement. (Not a reference)
 * @param categorys the category to be copied
 */
export const valueCopyCategory = (category: CategoryElement): CategoryElement => {
    return {id: category.id, name: category.name} as CategoryElement
    //TODO: try JSON.stringify and JSON.parse
}