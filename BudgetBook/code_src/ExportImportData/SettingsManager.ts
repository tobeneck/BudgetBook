import { checkReadExternalStorage, checkWriteExternalStorage, defaultExportDir, readFile, writeFile } from "./ReadAndWriteFiles"

const settingsFileName: string = "settings.csv"

export const currencySymbols = [
    '\u20AC', //euro
    '\u00A3', //pound
    '\u0024', //Dollar
    '\u20A3', //Franc (swiss)
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
    //"German"
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

export const readSettings = (setSettings: (newSettings: AppSettings) => void, accessError: () => void, otherError: (message: string) => void): void => {
    //no need to check read acces for cache
    readFile(defaultExportDir+"/"+settingsFileName)
    .then((data: string) => {
        const newSettings: AppSettings = JSON.parse(data)

        setSettings(newSettings)
    })
    .catch((e: Error) => otherError("An error occured when reading the settings! Got message: \n"+ e.message))
}

/**
 * writes the new data into the settings file
 * @param settings the new settings to be saved
 */
export const writeSettings = (settings: AppSettings, accessError: () => void, otherError: (message: string) => void): void => {
    //no need to check write access for cache
    const outString: string = JSON.stringify(settings)
    writeFile(outString, defaultExportDir+"/"+settingsFileName, otherError)
}



