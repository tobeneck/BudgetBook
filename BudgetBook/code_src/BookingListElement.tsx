import React from "react"
import { CategoryElement } from "./CategoryListElement"
import { Text } from "react-native"

export interface BookingElement{
    date: Date;
    amount: number;
    name: string;
    category: CategoryElement;
}

const BookingListElement = (props: BookingElement): JSX.Element => {
    return (
        <Text>{props.date.toDateString()}, {props.amount}, {props.name}, {props.category.name}</Text>
    )
}

export default BookingListElement