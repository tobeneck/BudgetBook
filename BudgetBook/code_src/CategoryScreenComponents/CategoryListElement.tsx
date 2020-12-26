import React from "react"
import { Text } from "react-native"

export interface CategoryElement{
    id: number, //number starting from 0 counting up
    name: string,
}

export const defaultCategoryElement: CategoryElement = {
    id: 0,
    name: "uncategorized",
}

const CategoryListElement = (props: CategoryElement): JSX.Element => {
    return (
        <Text> {props.id} - {props.name} </Text>
    )
}

export default CategoryListElement