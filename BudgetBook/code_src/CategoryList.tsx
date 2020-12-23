import React from "react"
import { View } from "react-native"
import CategoryListElement, { CategoryElement } from "./CategoryListElement"

interface Props{
    categorys: CategoryElement[]
}

const CategoryList = (props: Props): JSX.Element => {

    return (
        <View>
            {props.categorys.map((ce: CategoryElement) => (<CategoryListElement id = {ce.id} name={ce.name}/>))}
        </View>
    )
}

export default CategoryList