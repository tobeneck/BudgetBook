import React, { useContext, useEffect, useState } from "react"
import { ButtonGroup, Text } from "react-native-elements"
import { SettingsContext, eScreens } from "../../App"
import { darkBlueButtonStyle, orangeButtonStyle } from "../GenericComponents/GenericButtons/ButtonStyles"
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton"

import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView, Switch, View } from "react-native"
import { defaultColors, defaultRadius, defaultViewStyles, textStyles } from "../Styles/Styles"
import FontAwsome5 from "react-native-vector-icons/FontAwesome5"
import { Picker } from "@react-native-picker/picker"
import BorderedPicker from "../GenericComponents/BorderedPicker"
import { CurrencySymbols, currencySymbols, languages, AppSettings, styles } from "../ExportImportData/SettingsManager"

interface Props{
    openScreen: (newScreen: eScreens) => void
    openExportPopup: () => void,
    setNewSettings: (newSettings: AppSettings) => void
}

const SettingsScreen = (props: Props): JSX.Element => {
    const [currencyID, setCurrencyID] = useState<number>(0) //TODO: set the initial currencyID
    const [currencyLocation, setCurrencyLocation] = useState<number>(0) //TODO: set the initial currencyLocation
    const [languageID, setLanguageID] = useState<number>(0)
    const [styleID, setStyleID] = useState<number>(0)

    const settingsProvider = useContext<AppSettings>(SettingsContext)

    //initialize the settings screen
    useEffect(() => {
        const currencySymbol: string = settingsProvider.currencySymbol.pre + settingsProvider.currencySymbol.post
        const newCurrencyID: number = currencySymbols.indexOf(currencySymbol)
        if(newCurrencyID < 0 || newCurrencyID >= currencySymbols.length){
            setCurrencyID(0)
        } else {
            setCurrencyID(newCurrencyID)
        }

        setCurrencyLocation(!!settingsProvider.currencySymbol.pre ? 1 : 0)

        const newLanguageID: number = languages.indexOf(settingsProvider.language)
        if(newLanguageID < 0 || newLanguageID >= languages.length){
            setLanguageID(0)
        } else {
            setLanguageID(newLanguageID)
        }

        const newStyleID: number = styles.indexOf(settingsProvider.style)
        if(newStyleID < 0 || newStyleID >= languages.length){
            setStyleID(0)
        } else {
            setStyleID(newStyleID)
        }
    }, [settingsProvider])

    /**
     * updates the currenclanguageIDySymbols depending on the currencyLocation
     * @param newSymbol the new symbol to be set
     */
    const updateCurrencySymbols = (newID: number): void => {
        setCurrencyID(newID)
        if(currencyLocation === 0){
            props.setNewSettings({currencySymbol: {pre: "", post: currencySymbols[newID]} as CurrencySymbols, language: settingsProvider.language, style: settingsProvider.style} as AppSettings)
        } else {
            props.setNewSettings({currencySymbol: {pre: currencySymbols[newID], post: ""} as CurrencySymbols,  language: settingsProvider.language, style: settingsProvider.style} as AppSettings)
        }
    }

    /**
     * updates the currencySymbols depending on the currencyLocation
     * @param newLocation  the new symbol to be set
     */
    const updateCurrencyLocation = (newLocation: number): void => {
        setCurrencyLocation(newLocation)
        if(newLocation === 0){
            props.setNewSettings({currencySymbol: {pre: "", post: currencySymbols[currencyID]} as CurrencySymbols, language: settingsProvider.language, style: settingsProvider.style} as AppSettings)
        } else {
            props.setNewSettings({currencySymbol: {pre: currencySymbols[currencyID], post: ""} as CurrencySymbols,  language: settingsProvider.language, style: settingsProvider.style} as AppSettings)
        }
    }

    /**
     * updates the language of the app
     * @param newID the new language of the app
     */
    const updateLanguage = (newID: number): void => {
        setLanguageID(newID)
        props.setNewSettings({currencySymbol: settingsProvider.currencySymbol,  language: languages[newID], style: settingsProvider.style} as AppSettings)
    }

    /**
     * updates the style of the app
     * @param newID the new style ID
     */
    const updateStyle = (newID: number): void => {
        setStyleID(newID)
        props.setNewSettings({currencySymbol: settingsProvider.currencySymbol,  language: settingsProvider.style, style: styles[newID]} as AppSettings)
    }

    return(
        <ScrollView
            contentContainerStyle={[defaultViewStyles.containerWithPadding ,{justifyContent: "flex-start"}]}
        >
            <View style={{width: "100%"}}>
                <Text
                    style={textStyles.smallTitle}
                >
                    Currency
                </Text>

                <ButtonGroup
                    onPress={(index: number) => updateCurrencySymbols(index)}
                    selectedIndex={currencyID}
                    //buttonContainerStyle={darkBlueButtonStyle.containerStyle}
                    innerBorderStyle={{color: defaultColors.backgroundColor}}
                    buttonStyle={[darkBlueButtonStyle.buttonStyle, {minWidth: 10}]}
                    textStyle={darkBlueButtonStyle.titleStyle}
                    selectedButtonStyle={[orangeButtonStyle.buttonStyle, {minWidth: 10}]}
                    selectedTextStyle={orangeButtonStyle.titleStyle}
                    buttons={currencySymbols}
                    containerStyle={{height: 42, backgroundColor: defaultColors.backgroundColor, borderRadius: defaultRadius, width: "100%", marginLeft: 1, marginBottom: 1, marginTop: 1, marginRight: 1, borderWidth: 0}}
                />

                <ButtonGroup
                    onPress={(index: number) => updateCurrencyLocation(index)}
                    selectedIndex={currencyLocation}
                    //buttonContainerStyle={darkBlueButtonStyle.containerStyle}
                    innerBorderStyle={{color: defaultColors.backgroundColor}}
                    buttonStyle={[darkBlueButtonStyle.buttonStyle, {minWidth: 10}]}
                    textStyle={darkBlueButtonStyle.titleStyle}
                    selectedButtonStyle={[orangeButtonStyle.buttonStyle, {minWidth: 10}]}
                    selectedTextStyle={orangeButtonStyle.titleStyle}
                    buttons={['"20'+ currencySymbols[currencyID]+'"', '"'+currencySymbols[currencyID]+'20"']}
                    containerStyle={{height: 42, backgroundColor: defaultColors.backgroundColor, borderRadius: defaultRadius, width: "100%", marginLeft: 1, marginBottom: 1, marginTop: 1, marginRight: 1, borderWidth: 0}}
                />

            </View>

            <View>
                <Text
                    style={textStyles.smallTitle}
                >
                    Style
                </Text>
                <View style={[defaultViewStyles.simpleRow, {justifyContent: "center"}]}>
                    <FontAwsome5
                        name="sun"
                        size={20}
                        color={defaultColors.highlightColor}
                    />
                    <Text>
                        light
                    </Text>
                    <Switch
                        value={styleID !== 0} //styleID === 0 => lightMode
                        onValueChange={(value: boolean) => updateStyle(value ? 1 : 0)}
                        disabled={true}
                    >

                    </Switch>
                    <Text>
                        dark
                    </Text>
                    <FontAwsome5
                        name="cloud-moon"
                        size={20}
                        color={defaultColors.primaryColor}
                    />
                </View>
            </View>

            <View style={{ marginBottom: 5}}>
                <Text
                    style={textStyles.smallTitle}
                >
                    Language
                </Text>

                <BorderedPicker
                    //NOTE: can I resize the text?
                    selectedValue={languageID}
                    onValueChange={(itemValue, itemIndex) => updateLanguage(itemIndex)}
                    mode="dropdown"
                    content={languages.map((item: string, index: number) => (<Picker.Item label={item} value={index} />))}
                />
            </View>

            <View style={{}}>
            <Text
                style={textStyles.smallTitle}
            >
                Export / Import
            </Text>

            <DarkBlueButton
                buttonStyle={{alignContent: "stretch"}}
                onPress={() => props.openExportPopup()}
                icon={
                    <MaterialComunityIcon
                        name="file-export-outline"
                        size={20}
                        color={darkBlueButtonStyle.titleStyle.color}
                    />
                }
                title={"Export"}
            />

            <DarkBlueButton
                buttonStyle={{alignContent: "stretch"}}
                onPress={() => props.openScreen(eScreens.IMPORT_DATA_SCREEN)}
                icon={
                    <MaterialComunityIcon
                        name="file-import-outline"
                        size={20}
                        color={darkBlueButtonStyle.titleStyle.color}
                    />
                }
                title={"Import"}
            />
            </View>
            <View style={{}}>
            <Text
                style={textStyles.smallTitle}
            >
                Aboud this App
            </Text>

            <DarkBlueButton
                buttonStyle={{alignContent: "stretch"}}
                onPress={() => console.log("TODO: open aboud this app")}
                icon={
                    <MaterialComunityIcon
                        name="information-outline"
                        size={20}
                        color={defaultColors.disabled}
                    />
                }
                title={"Aboud this App"}
                disabled={true}
            />
            </View>
        </ScrollView>
    )
}

export default SettingsScreen