import React from "react"
import { Text, ScrollView, TouchableOpacity } from "react-native"
import ColoredCircle from "../GenericComponents/ColoredCircle"
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton"
import { tableStyles, defaultColors } from "../Styles/Styles"
import { CategoryElement } from "./CategoryList"

interface Props{
    categorys: CategoryElement[]
    onEditCategory: (index: number) => void
    onAddCategory: () => void
}



const CategoryListScreen = (props: Props): JSX.Element => {

    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tableStyles.tableContent}
            >
                {props.categorys.map((ce: CategoryElement, index: number) => (
                    <TouchableOpacity
                        style={tableStyles.tableRow}
                        onPress={() => props.onEditCategory(ce.id)}
                        key={index}
                    >
                        <ColoredCircle
                            color={ce.color}
                            size={14}
                        />
                        <Text style={[tableStyles.tableText, {marginLeft: "3%", width: "60%", color: ce.activated ? defaultColors.darkTextColor : defaultColors.disabled}]}>{ce.name}</Text>
                        <Text style={[tableStyles.tableText, {marginLeft: "3%", width: "30%", color: ce.activated ? defaultColors.darkTextColor : defaultColors.disabled}]}>{ce.hasBudget ? ("("+ce.maxBudget+"€)") : ""}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>


            <OrangeButton
                onPress={() => props.onAddCategory()}
                title="Add Category"
            />
        </>
      )
}

export default CategoryListScreen