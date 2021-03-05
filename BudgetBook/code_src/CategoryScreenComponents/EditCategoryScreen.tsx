import React, { useContext, useEffect, useState } from "react"
import { Text, TextInput, View, Switch } from "react-native"
import { colors, defaultColors, defaultViewStyles, interactionElements, textStyles } from "../Styles/Styles"
import { CategoryElement } from "./CategoryList"

import ColorInput from "../GenericComponents/ColorInput/ColorInput"
import AmountInput from "../GenericComponents/AmountInput/AmountInput"
import DeleteButton from "../GenericComponents/GenericButtons/DeleteButton"
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton"
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton"
import { darkBlueButtonStyle, orangeButtonStyle } from "../GenericComponents/GenericButtons/ButtonStyles"
import { SettingsContext } from "../../App"
import { AppSettings } from "../ExportImportData/SettingsManager"

interface Props{
    category: CategoryElement,
    onCancelPressed: () => void,
    onDeletePressed: () => void,
    onSavePressed: (nce: CategoryElement) => void,
}

const EditCategoryScreen = (props: Props): JSX.Element => {
    const [categoryName, setCategoryName] = useState<string>(props.category.name)
    const [categoryDescription, setCategoryDescription] = useState<string>(props.category.description)
    const [categoryColor, setCategoryColor] = useState<string>(props.category.color)
    const [categoryActivated, setCategoryActivated] = useState<boolean>(props.category.activated)
    const [categoryHasMaxBudget, setCategoryHasMaxBudget] = useState<boolean>(props.category.hasBudget)
    const [categoryMaxBudget, setCategoryMaxBudget] = useState<number>(props.category.maxBudget)

    const settingsProvider = useContext<AppSettings>(SettingsContext)


    useEffect(() => {
        setCategoryName(props.category.name)
        setCategoryDescription(props.category.description)
        setCategoryColor(props.category.color)
        setCategoryActivated(props.category.activated)
        setCategoryHasMaxBudget(props.category.hasBudget)
        setCategoryMaxBudget(props.category.maxBudget)
    }, [props.category])

    return (
        <>
            <View style={[defaultViewStyles.containerWithPadding, {justifyContent:"space-between"}]}>
                <View style={defaultViewStyles.simpleFlexStart}>

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Name
                    </Text>
                    <TextInput
                        style={interactionElements.textInput}
                        onChangeText={text => setCategoryName(text)}
                        value={categoryName}
                        editable={props.category.id !== 0}
                    />

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Description
                    </Text>
                    <TextInput
                        style={interactionElements.textField}
                        onChangeText={text => setCategoryDescription(text)}
                        value={categoryDescription}
                        multiline={true}
                        textAlignVertical="top"
                        editable={props.category.id !== 0}
                    />

                    <Text
                        style={textStyles.smallTitle}
                    >
                        Color
                    </Text>
                    <ColorInput
                        initialColor={categoryColor}
                        onSavePressed={(color) => setCategoryColor(color)}
                    />

                    <View style={defaultViewStyles.simpleRow} //TODO: are the components centered?
                    >
                        <Switch
                            value={categoryHasMaxBudget}
                            onValueChange={() => setCategoryHasMaxBudget(!categoryHasMaxBudget)}
                            thumbColor={props.category.id === 0 ? defaultColors.tableSeparatorColor : defaultColors.primaryColor}
                            trackColor={{true: props.category.id === 0 ? defaultColors.disabled : colors.lightBlue, false: props.category.id === 0 ? defaultColors.disabled : defaultColors.disabled}}
                            disabled={props.category.id === 0}
                        />
                        <Text
                            style={[textStyles.smallTitle]}
                        >
                            MaxBudget
                        </Text>
                    </View>
                    <AmountInput
                        amount={categoryMaxBudget}
                        setAmount={(newMaxBudget: number) => setCategoryMaxBudget(newMaxBudget)}
                        style={interactionElements.text}
                        normalButtonStyle={darkBlueButtonStyle.buttonStyle}
                        normalButtonTextStyle={darkBlueButtonStyle.titleStyle}
                        specialButtonStyle={orangeButtonStyle.buttonStyle}
                        specialButtonTextStyle={orangeButtonStyle.titleStyle}
                        disabled={!categoryHasMaxBudget}
                        prefix={settingsProvider.currencySymbol.pre}
                        suffix={settingsProvider.currencySymbol.post}
                    />

                    <View style={defaultViewStyles.simpleRow}>
                        <Switch
                            value={categoryActivated}
                            onValueChange={() => setCategoryActivated(!categoryActivated)}
                            thumbColor={props.category.id === 0 ? colors.lightGrey : colors.darkBlue}
                            trackColor={{true: props.category.id === 0 ? colors.disabled : colors.lightBlue, false: props.category.id === 0 ? colors.disabled : colors.disabled}}
                            disabled={props.category.id === 0}
                        />
                        <Text
                            style={[textStyles.smallTitle]}
                        >
                            Active
                        </Text>
                    </View>

                </View>

                <View style={defaultViewStyles.bottomButtonRowWithDelete}>
                    <DeleteButton
                        onPress={() => props.onDeletePressed()}
                        title="Delete"
                        type="outline"
                        disabled={props.category.id === 0}
                    />

                    <View style={defaultViewStyles.bottomButtonRow}>
                        <OrangeButton
                            onPress={() => props.onSavePressed({id: props.category.id, name: categoryName, description: categoryDescription, color: categoryColor, activated: categoryActivated, hasBudget: categoryHasMaxBudget, maxBudget: +categoryMaxBudget } as CategoryElement)}
                            title="Save"
                        />

                        <DarkBlueButton
                            onPress={() => props.onCancelPressed()}
                            title="Cancel"
                        />
                    </View>

                </View>
            </View>
        </>
    )
}

export default EditCategoryScreen