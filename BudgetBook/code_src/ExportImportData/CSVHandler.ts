import { BookingElement } from '../BookingScreenComponents/BookingList'
import { CategoryElement } from '../CategoryScreenComponents/CategoryList'
import moment from 'moment'
import RNFetchBlob, { RNFetchBlobWriteStream } from "rn-fetch-blob"

export const defaultFilename: string = "BudgetBookData"
export const defaultFileEnding: string = ".csv"

const defaultSeparator: string = ";"
const defaultSeparatorReplacement: string = ","
const defaultLineEnd: string = defaultSeparator+"\n"
const defaultStringDivider: string = "---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultSeparator+"---"+defaultLineEnd
const defaultDownloadDir: string = RNFetchBlob.fs.dirs.DownloadDir //TODO: the downloadDir is android only! Change this for IOS!
const defaultExportDir: string = RNFetchBlob.fs.dirs.DocumentDir

const encoding = 'utf8'

const currentDataFormatVersion: string = "BudgetBook Data Export Version 1.0"

export interface CombinedData{
    categorys: CategoryElement[],
    bookings: BookingElement[]
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

    console.log("replace ", input, " with ", out)
    return out
}

export const getCsvFilesInDownloads = (): Promise<string[]> => {
    const exportDir: string = defaultDownloadDir

    return (
        RNFetchBlob.fs.ls(exportDir)
        .then<string[]>((filenames: string[]) => {
            const filteredFilenames: string[] = []
            filenames.forEach(element => {
                if(element.includes(".csv"))
                    filteredFilenames.push(element+"")
            });
            console.log("getCsvFiles: ", filteredFilenames) //TODO: debugg
            return filteredFilenames
        })
    )
}

/**
 * returns the next free filename in the downloads directory
 */
export const getFreeFilePath = (): Promise<string> => {
    const exportDir: string = defaultDownloadDir
    var filePathIterator: number = 0

    const getCurrentIterationFilename = (): string => {
        if(filePathIterator === 0)
            return defaultFilename+currentDateAppendix()+defaultFileEnding
        else
            return defaultFilename+currentDateAppendix()+"_"+filePathIterator+defaultFileEnding
    }

    return (
        getCsvFilesInDownloads()
        .then<string>((filenames: string[]) => {
            console.log(filenames, getCurrentIterationFilename())
            while(filenames.includes(getCurrentIterationFilename())){
                filePathIterator += 1
            }
            console.log("getFreePath: ", exportDir+"/"+getCurrentIterationFilename()) //TODO: debugg
            return exportDir+"/"+getCurrentIterationFilename()
        })
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
    outString += "bookingDate"+defaultSeparator+"bookingAmount"+defaultSeparator+"bookingName"+defaultSeparator+"bookingCategoryID"+defaultLineEnd
    bookings.forEach((be) => {
        const date: string = replaceAllIllegalCharacters(toISOStringWithTimezone(be.date))
        const total: string = replaceAllIllegalCharacters(be.total+"")
        const amount: string = replaceAllIllegalCharacters(be.amount+"")
        const description: string = replaceAllIllegalCharacters(be.description)
        const categoryID: string = replaceAllIllegalCharacters(be.category.id+"")
        outString += date+defaultSeparator+total+defaultSeparator+amount+defaultSeparator+description+defaultSeparator+categoryID+defaultLineEnd
    })

    return outString
}

/**
 * saves string data into a file. Creates the file if it does not exist already, otherwise the old file will be overwritten,
 * @param data the data to be saved
 * @param filepath the file to save to
 */
const saveStringToFile = (data: string, filepath: string, errorCallback?: (e: Error) => void): void => {

    //console.log(RNFetchBlob.fs.exists(filepath))
    RNFetchBlob.fs.exists(filepath)
    .then((exists: boolean) => {
        console.log("exists: ", exists)
        if(!exists){ //create the file if it does not exist
            console.log("file "+filepath+" does not exist, creating it...")
            RNFetchBlob.fs.createFile(filepath, data, encoding)
        } else {//update the file if it exists
            RNFetchBlob.fs.writeStream(
                filepath,
                // encoding, should be one of `base64`, `utf8`, `ascii`
                'utf8',
                // should data append to existing content ?
                false
            )
            .then<RNFetchBlobWriteStream | never>((ofstream: RNFetchBlobWriteStream) => {
                console.log("writing to file "+filepath)
                ofstream.write(data)
                return ofstream
            })
            .then<void | never>((ofstream: RNFetchBlobWriteStream) => {
                ofstream.close()
            })
            .catch((e: Error) => {
                if(errorCallback)
                    errorCallback(e)
                else
                    console.log(e) //console.error //TODO: remove the optionality when implementing the genericErrorPopup
            })
        }
    })
    .catch(console.error)
}

/**
 * exports the current data to the downloads foulder. If the default filename already exists it adds a "_n" to the filename
 * @param categorys the categorys to be saved
 * @param bookings the bookings to be saved
 */
export const exportToDownloads = (categorys: CategoryElement[], bookings: BookingElement[], errorCallback: (e: Error) => void): void => {
    getFreeFilePath()
    .then((filepath: string) => {
        const data: string = dataToString(categorys, bookings)
        saveStringToFile(data, filepath, errorCallback)
    })
    .catch(console.error)
}

/**
 * saves the data to the cahce foulder
 * @param categorys the categorys to be saved
 * @param bookings the bookings to be saved
 */
export const saveToCache = (categorys: CategoryElement[], bookings: BookingElement[]): void => {
    const filepath: string = defaultExportDir + "/" + defaultFilename + defaultFileEnding;

    const data: string = dataToString(categorys, bookings)
    saveStringToFile(data, filepath)
}

/**
 * reads the data from the default downloads directory. Used for importing.
 * @param setCategorys the callback method for categorys
 * @param setBookings the callback method for bookings
 */
export const readDownloadsData = (fileName: string, setCategorys: (categorys: CategoryElement[]) => void, setBookings: (bookings: BookingElement[]) => void): void => {
    const filePath: string = defaultDownloadDir + "/" + fileName
    readFile(filePath, setCategorys, setBookings)
}

/**
 * reads the data from the default cache. Used when starting the app.
 * @param setCategorys the callback method for categorys
 * @param setBookings the callback method for bookings
 */
export const readCacheData = (setCategorys: (categorys: CategoryElement[]) => void, setBookings: (bookings: BookingElement[]) => void): void => {
    const filePath: string = defaultExportDir + "/" + defaultFilename + defaultFileEnding
    readFile(filePath, setCategorys, setBookings)
}

/**
 * reads the in filepath, if it exists. After decrypting the data, the two setter methods are called
 * @param setCategorys callback method to set the read categorys
 * @param setBookings callback method to set the read bookings
 */
export const readFile = (filePath: string, setCategorys: (categorys: CategoryElement[]) => void, setBookings: (bookings: BookingElement[]) => void): void => {

    RNFetchBlob.fs.exists(filePath)
    .then((exists: boolean) => {
        if(exists){
            console.log("file to read exists!")
            RNFetchBlob.fs.readFile(filePath, encoding)
            .then((data: string) => {//deconstruct the categorys and bookings here
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
                console.log("category string", categorysString)
                console.log(bookingsString)

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

                setCategorys(categorys)
                setBookings(bookings)
            })
            .catch(console.error)
        }
    })
    .catch(console.error)
 }

