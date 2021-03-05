import { defaultExportDir, readFile, writeFile } from "./ReadAndWriteFiles"

const settingsFileName: string = "settings.csv"

export const currencySymbols = [
    '\u20AC', //euro
    '\u00A3', //pound
    '\u0024', //Dollar
    '\u00A5', //Yen
    '\u20A4', //Lira
    '\u20BD', //Ruble
    '\u20BF', //Bitcoin
    '', //none
]

export interface CurrencySymbols{
    pre: string,
    post: string
  }

export const languages =   [
    "English",
    "German"
]

export const styles = [
    "lightMode",
    "darkMode"
]

export interface AppSettings{
    currencySymbol: CurrencySymbols, //TODO: type
    language: string, //TODO: type
    style: string, //TODO: style
}

export const defaultSettingsValue: AppSettings = {
    currencySymbol: {pre: "", post: '\u20AC'},
    language: "English",
    style: "lightMode"
} as AppSettings

export const readSettings = (setSettings: (newSettings: AppSettings) => void): void => {
    readFile(defaultExportDir+"/"+settingsFileName)
    .then((data: string) => {
        console.log("the read data:", data)
        const newSettings: AppSettings = JSON.parse(data)

        console.log("the new Settings:", newSettings)
        console.log("test the new Settings:", newSettings.currencySymbol.post)
        console.log("test the new Settings:", newSettings.language)
        console.log("test the new Settings:", newSettings.style)

        setSettings(newSettings)
    })
    .catch(console.error)
}

/**
 * writes the new data into the settings file
 * @param settings the new settings to be saved
 */
export const writeSettings = (settings: AppSettings): void => {

    const outString: string = JSON.stringify(settings)
    writeFile(outString, defaultExportDir+"/"+settingsFileName)
}



