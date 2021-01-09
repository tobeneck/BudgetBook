import { BookingElement } from '../BookingScreenComponents/BookingList'
import { CategoryElement } from '../CategoryScreenComponents/CategoryList'
import moment from 'moment'
import RNFetchBlob, { RNFetchBlobWriteStream } from "rn-fetch-blob"

const defaultStringDivider: string = "--------------------------------------------------------------------------------------------------\n"
export const defaultFilename: string = "BudgetBookData"
export const defaultFileEnding: string = ".csv"
const defaultDownloadDir: string = RNFetchBlob.fs.dirs.DownloadDir
const defaultExportDir: string = RNFetchBlob.fs.dirs.DocumentDir //"/storage/emulated/0/BudgetBook"
const defaultSeparator: string = ";"

const encoding = 'utf8'

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
 * returns the next free filename in the downloads directory
 */
export const getFreeFilePath = (): Promise<string> => {
    const exportDir: string = defaultDownloadDir //TODO: the downloadDir is android only! Change this for IOS!
    var filePathIterator: number = 0

    const getCurrentIterationFilename = (): string => {
        if(filePathIterator === 0)
            return defaultFilename+currentDateAppendix()+defaultFileEnding
        else
            return defaultFilename+currentDateAppendix()+"_"+filePathIterator+defaultFileEnding
    }

    return (
        RNFetchBlob.fs.ls(exportDir)
        .then<string>((filenames: string[]) => {
            console.log(filenames, getCurrentIterationFilename())
            while(filenames.includes(getCurrentIterationFilename())){
                filePathIterator += 1
            }
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
    //TODO: think aboud commas in the names (common bugg!) (and the stringDivider)
    var outString: string = ""

    //parse category data
    outString += "categoryID,categoryName\n"
    categorys.forEach((ce) => {
        outString += ce.id+defaultSeparator+ce.name+"\n"

    })

    //parse booking data
    outString += defaultStringDivider
    outString += "bookingDate,bookingAmount,bookingName,bokingCategoryName,bookingCategoryID \n"
    bookings.forEach((be) => {
        outString += toISOStringWithTimezone(be.date)+defaultSeparator+be.total+defaultSeparator+be.amount+defaultSeparator+be.description+defaultSeparator+be.category.name+defaultSeparator+be.category.id+"\n"
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
        if(!exists){ //create the file if it does not exist //TODO: make a .then
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
 * reads the data stored in the cache, if it exists. After decrypting the data, the two setter methods are called
 * @param setCategorys callback method to set the read categorys
 * @param setBookings callback method to set the read bookings
 */
export const readCache = (setCategorys: (categorys: CategoryElement[]) => void, setBookings: (bookings: BookingElement[]) => void): void => {
    const filePath: string = defaultExportDir + "/" + defaultFilename + defaultFileEnding

    RNFetchBlob.fs.exists(filePath)
    .then((exists: boolean) => {
        if(exists){
            console.log("file to read exists!")
            RNFetchBlob.fs.readFile(filePath, encoding)
            .then((data: string) => {//deconstruct the categorys and bookings here
                const categorys: CategoryElement[] = []
                const bookings: BookingElement[] = []

                const categorysString: string[] = data.split(defaultStringDivider)[0].split("\n")
                const bookingsString: string[] = data.split(defaultStringDivider)[1].split("\n")
                console.log(categorysString)
                console.log(bookingsString)

                for(let i: number = 1; i < categorysString.length; i++){//read the categorys. Start at 1 to skit the header row
                    if(categorysString[i] !== ""){ //the last element always is "", avoid this!
                        const currentRow: string[] = categorysString[i].split(defaultSeparator)
                        categorys.push({
                            id: +currentRow[0],
                            name: currentRow[1]
                        } as CategoryElement
                        )
                    }
                }

                for(let i: number = 1; i < bookingsString.length; i++){//read the bookings. Start at 1 to skit the header row
                    if(bookingsString[i] !== ""){ //the last element always is "", avoid this!
                        const currentRow: string[] = bookingsString[i].split(defaultSeparator)
                        console.log("currentBookingRow:", currentRow)
                        bookings.push({
                            date: new Date(currentRow[0]),
                            total: +currentRow[1],
                            amount: +currentRow[2],
                            description: currentRow[3],
                            category: {
                                name: currentRow[4],
                                id: +currentRow[5]
                            } as CategoryElement
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

