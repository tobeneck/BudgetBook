import { isDate } from "moment"
import RNFetchBlob from "rn-fetch-blob"
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

/**
 * initializes the Settings. Reads a settings file if it exists and creates one if it does not
 * @param setSettings callback to set the settings if initial settings exists
 * @param otherError callback for an error
 */
export const initializeSettings = (setSettings: (appSettings: AppSettings) => void, otherError: (message: string) => void): void => {
    RNFetchBlob.fs.exists(defaultExportDir+"/"+settingsFileName)
    .then((exists: boolean) => {
        if(exists){
            readSettings(setSettings, otherError)
        } else {
            writeSettings(defaultSettingsValue, otherError)
        }
    })
    .catch((e: Error) => {
        otherError("An error occured initializing the settings! Got the message: \n"+e.message)
    })
}


/**
 * reads the settings data from the settings file in the cache
 * @param setSettings callback to set the settings if initial settings exists
 * @param otherError callback for an error
 */
const readSettings = (setSettings: (newSettings: AppSettings) => void, otherError: (message: string) => void): void => {
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
export const writeSettings = (settings: AppSettings, otherError: (message: string) => void): void => {
    //no need to check write access for cache
    const outString: string = JSON.stringify(settings)
    writeFile(outString, defaultExportDir+"/"+settingsFileName, otherError)
}



