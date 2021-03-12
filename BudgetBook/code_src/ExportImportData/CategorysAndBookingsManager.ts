import { BookingElement, defaultBookingElement } from '../BookingScreenComponents/BookingList'
import { CategoryElement, defaultCategoryElement } from '../CategoryScreenComponents/CategoryList'
import moment from 'moment'
import { checkReadExternalStorage, checkWriteExternalStorage, defaultDownloadDir, defaultExportDir, getFilesInPath, readFile, writeFile } from './ReadAndWriteFiles'
import RNFetchBlob from 'rn-fetch-blob'

const defaultSeparator: string = ";"
const defaultSeparatorReplacement: string = ","
const defaultLineEnd: string = defaultSeparator+"\n"
const defaultStringDivider: string = "---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultLineEnd

export const defaultFilename: string = "BudgetBookData"
export const defaultFileEnding: string = ".csv"

const currentDataFormatVersion: string = "BudgetBook Data Export Version 1.0"

export interface CombinedData{
    categorys: CategoryElement[],
    bookings: BookingElement[]
}

/**
 * initializes the Categorys and Bookings. Reads them from the BudgetBookData.csv file in the cache
 * @param setSettings callback to set the settings if initial settings exists
 * @param otherError callback for an error
 */
 export const initializeCategorysAndBookings = (setCategorysAndBookings: (categorys: CategoryElement[], newBookings: BookingElement[])=> void, otherError: (message: string) => void): void => {

    const filePath: string = defaultExportDir + "/" + defaultFilename + defaultFileEnding

    RNFetchBlob.fs.exists(filePath)
    .then((exists: boolean) => {
        if(exists){
            readCacheData(setCategorysAndBookings, otherError)
        } else {
            setCategorysAndBookings([defaultCategoryElement], [defaultBookingElement])
            saveToCache([defaultCategoryElement], [defaultBookingElement], otherError)
        }
    })
    .catch((e: Error) => {
        otherError("An error occured initializing the bookings and categorys! Got the message: \n"+e.message)
    })

}

/**
 * returns a standardized date for filenames (no . or / or :)
 */
export const currentDateAppendix = (): string => {
    const date: Date = new Date()
    return "_"+(date.getMonth()+1) +"-"+date.getDate()+"-"+date.getFullYear()
}

/**
 * returns the date as a ISO 8601 formated string
 * @param date the date to be converted
 */
const toISOStringWithTimezone = (date: Date): string => {
    return moment(date).format()//use moment to include timezone offset
}

/**
 * replaces all illegal characters in a string.
 * @param input the string to be altered
 */
const replaceAllIllegalCharacters = (input: string): string => {
    if(input === "")
        return input
    if(input === undefined)
        return ""

    const out: string = input.replace(defaultSeparator, defaultSeparatorReplacement)

    //the defaultLineEnd is automatically replaced with the defaultLineReplacement
    //the defaultStringDivider also is automatically replaced with the defaultLineReplacement
    return out
}


export const getCsvFilesInDownloads = (accessError: () => void): Promise<string[]> => {
    const downloadDir: string = defaultDownloadDir
    //TODO: check access rights

    return(
        checkReadExternalStorage()
        .then((hasReadAccess: boolean) => {
            if(hasReadAccess){
                return (
                    getFilesInPath(downloadDir)
                    .then((filenames: string[]) => {
                        const filteredFilenames: string[] = []
                        filenames.forEach(element => {
                            if(element.includes(".csv"))
                                filteredFilenames.push(element+"")
                        });
                        return filteredFilenames
                    })
                )
            }
            else{
                accessError()
                return []
            }
        })
    )

}

/**
 * returns the next free filename in the downloads directory
 */
 export const getFreeFilePath = (accessError: () => void): Promise<string> => {
     //TODO: check acces rights
    const exportDir: string = defaultDownloadDir
    var filePathIterator: number = 0

    const getCurrentIterationFilename = (): string => {
        if(filePathIterator === 0)
            return defaultFilename+currentDateAppendix()+defaultFileEnding
        else
            return defaultFilename+currentDateAppendix()+"_"+filePathIterator+defaultFileEnding
    }

    return (
        getCsvFilesInDownloads(accessError)
        .then<string>((filenames: string[]) => {
            while(filenames.includes(getCurrentIterationFilename())){
                filePathIterator += 1
            }
            return exportDir+"/"+getCurrentIterationFilename()
        }) //handle the error in the "parent" method
    )
}

/**
 * converts the category and booking data into a standardized string.
 * @param categorys the categorys to be converted
 * @param bookings the bookings to be converted
 */
const dataToString = (categorys: CategoryElement[], bookings: BookingElement[]): string => {
    var outString: string = ""

    outString += currentDataFormatVersion+defaultLineEnd
    outString += defaultStringDivider

    //parse category data
    outString += "categoryID"+defaultSeparator+"categoryName"+defaultSeparator+"categoryDesription"+defaultSeparator+"categoryColor(Hex)"+defaultSeparator+"Active"+defaultSeparator+"HasMaxBudget"+defaultSeparator+"MaxBudget"+defaultLineEnd
    categorys.forEach((ce) => {
        const id: string = replaceAllIllegalCharacters(ce.id+"")
        const name: string = replaceAllIllegalCharacters(ce.name)
        const description: string = replaceAllIllegalCharacters(ce.description)
        const color: string = replaceAllIllegalCharacters(ce.color)
        const active: string = replaceAllIllegalCharacters(ce.activated+"")
        const hasMaxBudget: string = replaceAllIllegalCharacters(ce.hasBudget+"")
        const maxBudget: string = replaceAllIllegalCharacters(ce.maxBudget+"")
        outString += id+defaultSeparator+name+defaultSeparator+description+defaultSeparator+color+defaultSeparator+active+defaultSeparator+hasMaxBudget+defaultSeparator+maxBudget+defaultLineEnd
    })

    //parse booking data
    outString += defaultStringDivider
    outString += "bookingDate"+defaultSeparator+"totalAmount"+defaultSeparator+"bookingAmount"+defaultSeparator+"bookingName"+defaultSeparator+"bookingCategoryID"+defaultLineEnd
    bookings.forEach((be) => {
        const date: string = replaceAllIllegalCharacters(toISOStringWithTimezone(be.date))
        const total: string = replaceAllIllegalCharacters(be.total.toFixed(2)+"")
        const amount: string = replaceAllIllegalCharacters(be.amount.toFixed(2)+"")
        const description: string = replaceAllIllegalCharacters(be.description)
        const categoryID: string = replaceAllIllegalCharacters(be.category.id+"")
        outString += date+defaultSeparator+total+defaultSeparator+amount+defaultSeparator+description+defaultSeparator+categoryID+defaultLineEnd
    })

    return outString
}

/**
 * exports the current data to the downloads folder. If the default filename already exists it adds a "_n" to the filename
 * @param categorys the categorys to be saved
 * @param bookings the bookings to be saved
 * @param accessError callback for an file access error
 * @param otherError callback for a other generic error
 */
export const exportToDownloads = (categorys: CategoryElement[], bookings: BookingElement[], accessError: () => void, otherError: (message: string) => void): void => {

    checkWriteExternalStorage()
    .then((hasWriteAccess: boolean) => {

        if(hasWriteAccess){
            getFreeFilePath(accessError)
            .then((filepath: string) => {
                const data: string = dataToString(categorys, bookings)
                writeFile(data, filepath, otherError)
            })
            .catch((e: Error) => otherError("An error occured checking a file existence! Got the error: \n"+e.message))
        } else {
            accessError()
        }

    })
    .catch((e: Error) => otherError("An error occured checking the external write permissions! Got the message: \n"+e.message))
}

/**
 * saves the data to the cahce folder
 * @param categorys the categorys to be saved
 * @param bookings the bookings to be saved
 * @param accessError callback for an file access error
 * @param otherError callback for a other generic error
 */
export const saveToCache = (categorys: CategoryElement[], bookings: BookingElement[], otherError: (message: string) => void): void => {
    const filepath: string = defaultExportDir + "/" + defaultFilename + defaultFileEnding;

    const data: string = dataToString(categorys, bookings)

    //no need to check!
    writeFile(data, filepath, otherError)
}

/**
 * reads the data from the default downloads directory. Used for importing.
 * @param setCategorys the callback method for categorys
 * @param setBookings the callback method for bookings
 * @param accessError callback for an file access error
 * @param otherError callback for a other generic error
 */
export const readDownloadsData = (fileName: string, setCategorysAndBookings: (categorys: CategoryElement[], newBookings: BookingElement[])=> void, accessError: () => void, otherError: (message: string) => void): void => {
    const filePath: string = defaultDownloadDir + "/" + fileName

    checkReadExternalStorage()
    .then((hasReadAccess: boolean) => {
        if(hasReadAccess){
            readData(filePath, setCategorysAndBookings, otherError)
        } else {
            accessError()
        }
    })
    .catch((e: Error) => otherError("An error occured checking the external read permissions! Got the message: \n"+e.message))
}

/**
 * reads the data from the default cache. Used when starting the app.
 * @param setCategorys the callback method for categorys
 * @param setBookings the callback method for bookings
 * @param accessError callback for an file access error
 * @param otherError callback for a other generic error
 */
export const readCacheData = (setCategorysAndBookings: (categorys: CategoryElement[], newBookings: BookingElement[])=> void, otherError: (message: string) => void): void => {
    const filePath: string = defaultExportDir + "/" + defaultFilename + defaultFileEnding

    //no need to check!
    readData(filePath, setCategorysAndBookings, otherError)
}



/**
 * reads the in filepath. After decrypting the data, the two setter methods are called
 * @param setCategorys callback method to set the read categorys
 * @param setBookings callback method to set the read bookings
 * @param accessError callback for an file access error
 * @param otherError callback for a other generic error
 */
const readData = (filePath: string, setCategorysAndBookings: (categorys: CategoryElement[], newBookings: BookingElement[])=> void, otherError: (message: string) => void): void => {

    readFile(filePath)
    .then((data: string) => {

        //read and convert the data here
        const categorys: CategoryElement[] = []
        const bookings: BookingElement[] = []

        const dataFormatVersion: string = data.split(defaultStringDivider)[0].replace(defaultLineEnd, "")
        switch(dataFormatVersion){
            case currentDataFormatVersion: //TODO: check for other file versions and read them accodringly in the future!
                //move on
                break;
            default:
                console.error("Error reading the file! The data format version \"", dataFormatVersion, "\" is not supportet in this version of the app.") //TODO: throw error!
        }

        const categorysString: string[] = data.split(defaultStringDivider)[1].split(defaultLineEnd)
        const bookingsString: string[] = data.split(defaultStringDivider)[2].split(defaultLineEnd)

        for(let i: number = 1; i < categorysString.length; i++){//read the categorys. Start at 1 to skit the header row
            if(categorysString[i] !== ""){ //the last element always is "", avoid this!
                const currentRow: string[] = categorysString[i].split(defaultSeparator)
                categorys.push({
                    id: +currentRow[0],
                    name: currentRow[1],
                    description: currentRow[2],
                    color: currentRow[3],
                    activated: currentRow[4] === "true",
                    hasBudget: currentRow[5] === "true",
                    maxBudget: +currentRow[6],
                } as CategoryElement
                )
            }
        }
        
        for(let i: number = 1; i < bookingsString.length; i++){//read the bookings. Start at 1 to skit the header row
            if(bookingsString[i] !== ""){ //the last element always is "", avoid this!
                const currentRow: string[] = bookingsString[i].split(defaultSeparator)
                const currentCategoryID = +currentRow[4]
                bookings.push({
                    date: new Date(currentRow[0]),
                    total: +currentRow[1],
                    amount: +currentRow[2],
                    description: currentRow[3],
                    category: categorys[categorys.length - 1 - currentCategoryID] //TODO: this is uggly indexing!
                } as BookingElement)
            }
        }

        setCategorysAndBookings(categorys, bookings)

    })
    .catch((e: Error) => otherError("An error occured when reading the app data! Got the message: \n"+ e.message))
}



