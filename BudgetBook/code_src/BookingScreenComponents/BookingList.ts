import { CategoryElement, valueCopyCategory, defaultCategoryElement } from "../CategoryScreenComponents/CategoryList"

export interface BookingElement{
    date: Date;
    amount: number;
    total: number; //the total booking amount at that place
    description: string;
    category: CategoryElement;
}

export const defaultBookingElement: BookingElement = {
    date: new Date(),
    amount: 0,
    total: 0, //needs to be same as the amount
    description: "initial balance",
    category: defaultCategoryElement
}


/**
 * returns the current total amount of the bookingList
 * @param bookings the bookings the total amount should be extracted from
 */
export const getCurrentTotal = (bookings: BookingElement[]): number => {
    return bookings[0].total;//TODO: think aboud the indexing
}

/**
 * returns an adjusted amount of totals for the bookings, beginning at startingIndex.
 * @param startingIndex the starting index
 * @param bookings the bookings to be adjusted
 */
export const adjustForTotalAmount = (startingIndex: number, bookings: BookingElement[]): BookingElement[] => {
    var bookingsToEdit: BookingElement[] = valueCopyBookings(bookings)

    let previousTotal: number = bookingsToEdit[startingIndex].total
    for(let i: number = startingIndex-1; i >= 0; i--){//the most recent bookings are at index 0, therefore we need to iterate down //TODO: think aboud indexing
        bookingsToEdit[i].total = previousTotal + bookingsToEdit[i].amount
        previousTotal = bookingsToEdit[i].total
    }

    return bookingsToEdit
}

/**
 * returns a copy by value of a BookingElement[]. (Not a reference)
 * @param bookings the bookings array to be copied
 */
export const valueCopyBookings = (bookings: BookingElement[]): BookingElement[] => {
    //return Array.from(categorys)
    //return [...categorys]
    let bookingsCopy: BookingElement[] = []
    for(let i: number = 0; i < bookings.length; i++){
        bookingsCopy.push(valueCopyBooking(bookings[i]))
    }
    return bookingsCopy
}

/**
 * returns a copy by value of a BookingElement. (Not a reference)
 * @param booking the booking to be copied
 */
export const valueCopyBooking = (booking: BookingElement): BookingElement => {
    return {
        date: new Date(booking.date),
        description: booking.description,
        amount: booking.amount,
        total: booking.total,
        category: valueCopyCategory(booking.category)
    } as BookingElement
}

/**
 * returns an updated value copy of the bookings where the oldCategory is replaced with a newCategory.
 * @param bookings the bookings to be updated
 * @param oldCategory the old category to be updated
 * @param newCategory the new category to be set for the bookings
 */
export const updateCategory = (bookings: BookingElement[], oldCategory: CategoryElement, newCategory: CategoryElement): BookingElement[] => {

    const newBookings: BookingElement[] = valueCopyBookings(bookings)

    for(let i: number = 0; i < newBookings.length; i++){
        if(newBookings[i].category.id === oldCategory.id)
        newBookings[i].category = valueCopyCategory(newCategory)
    }

    return newBookings
}

