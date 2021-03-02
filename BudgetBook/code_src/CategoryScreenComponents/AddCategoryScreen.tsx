import React, { useState } from "react"
import { Text, TextInput, View, Switch } from "react-native"
import { colors, defaultViewStyles, interactionElements, textStyles } from "../Styles/Styles";
import ColorInput from "../GenericComponents/ColorInput/ColorInput";
import { defaultButtonStyles } from "../Styles/DefaultStyles";
import AmountInput from "../GenericComponents/AmountInput/AmountInput";
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton";
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton";

interface Props{
    onAddPressed: (categoryName: string, categoryDescription: string, categoryColor: string, active: boolean, hasMaxBudget: boolean, maxBudget: number) => void,
    onCancelPressed: () => void
}

export const AddCategoryScreen = (props: Props): JSX.Element => {
    const [categoryName, setCategoryName] = useState<string>("")
    const [categoryDescription, setCategoryDescription] = useState<string>("")
    const [categoryColor, setCategoryColor] = useState<string>(colors.lightGrey)
    const [categoryActivated, setCategoryActivated] = useState<boolean>(true)
    const [categoryHasMaxBudget, setCategoryHasMaxBudget] = useState<boolean>(false)
    const [categoryMaxBudget, setCategoryMaxBudget] = useState<number>(0)

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

                    <View style={defaultViewStyles.simpleRow} //TODO: are the components centered, or are they off?
                    >
                        <Switch
                            value={categoryHasMaxBudget}
                            onValueChange={() => setCategoryHasMaxBudget(!categoryHasMaxBudget)}
                            thumbColor={colors.darkBlue}
                            trackColor={{true: colors.lightBlue, false: colors.disabled}}
                        />
                        <Text
                            style={textStyles.smallTitle}
                        >
                            MaxBudget
                        </Text>
                    </View>
                    <AmountInput
                        amount={categoryMaxBudget}
                        setAmount={(newMaxBudget: number) => setCategoryMaxBudget(newMaxBudget)}
                        style={interactionElements.text}
                        normalButtonStyle={defaultButtonStyles.buttonStyles}
                        normalButtonTextStyle={defaultButtonStyles.normalTitleStyle}
                        specialButtonStyle={defaultButtonStyles.specialButtonStyle}
                        specialButtonTextStyle={defaultButtonStyles.specialTitleStyle}
                        disabled={!categoryHasMaxBudget}
                    />

                    <View style={defaultViewStyles.simpleRow}>
                        <Switch
                            value={categoryActivated}
                            onValueChange={() => setCategoryActivated(!categoryActivated)}
                            thumbColor={colors.darkBlue}
                            trackColor={{true: colors.lightBlue, false: colors.disabled}} //TODO: default switch styling
                        />
                        <Text
                            style={textStyles.smallTitle}
                        >
                            Active
                        </Text>
                    </View>

                </View>

                    <View style={defaultViewStyles.bottomButtonRow}>
                        <OrangeButton
                            onPress={() =>  props.onAddPressed(categoryName, categoryDescription, categoryColor, categoryActivated, categoryHasMaxBudget, categoryMaxBudget)}
                            title="Add"
                        />

                        <DarkBlueButton
                            onPress={() => props.onCancelPressed()}
                            title="Cancel"
                        />

                    </View>
                </View>

        </>
    )
}