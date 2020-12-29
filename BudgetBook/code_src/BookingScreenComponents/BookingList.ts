import { CategoryElement, valueCopyCategory } from "../CategoryScreenComponents/CategoryList"

export interface BookingElement{
    date: Date;
    amount: number;
    name: string;
    category: CategoryElement;
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
        name: booking.name,
        amount: booking.amount,
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

