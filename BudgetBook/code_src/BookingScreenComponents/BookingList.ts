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
    description: "Initial balance. Can not be deleted.",
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
 * sorts a booking list after its dates and adjusts the total amount.
 * @param bookings the booking elements to be sortet
 */
export const sortBookings = (bookings: BookingElement[]): BookingElement[] => {

    var bookingsToEdit: BookingElement[] = []

    bookingsToEdit = bookings.slice(0, bookings.length-1).sort((beA: BookingElement, beB: BookingElement) => { //slice the array to preserv the initial booking as the first element. Otherwise it might be sorted as the second or third element, depending on the time the booking is created
        const dateA: number = beA.date.getTime()
        const dateB: number = beB.date.getTime()

        console.log(dateA, dateB)

        if(dateA > dateB)
            return -1
        if(dateA < dateB)
            return 1
        //if(dateA === dateB)
        return 0
    })

    bookingsToEdit = [...bookingsToEdit, bookings[bookings.length-1]] //re add the initial element

    //adjust the "total" values
    let previousTotal: number = bookingsToEdit[bookings.length - 1].amount
    bookingsToEdit[bookings.length - 1].total = previousTotal

    for(let i: number = bookings.length - 2; i >= 0; i--){//the most recent bookings are at index 0, therefore we need to iterate down //TODO: think aboud indexing
        bookingsToEdit[i].total = +(previousTotal + bookingsToEdit[i].amount).toFixed(2)
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

