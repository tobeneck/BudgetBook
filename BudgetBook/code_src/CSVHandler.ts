import { BookingElement } from './BookingScreenComponents/BookingList'
import { CategoryElement } from './CategoryScreenComponents/CategoryList'
import RNFS from 'react-native-fs'
import moment from 'moment'
import RNFetchBlob, { RNFetchBlobWriteStream } from "rn-fetch-blob"

const defaultStringDivider: string = "--------------------------------------------------------------------------------------------------\n"
const defaultFilename: string = "BudgetBookData"
const defaultFileEnding: string = ".csv"

/**
 * returns the date as a ISO 8601 formated string
 * @param date the date to be converted
 */
const toISOStringWithTimezone = (date: Date): string => {
    return moment(date).format()//use moment to include timezone offset
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
        outString += ce.id+","+ce.name+"\n"

    })

    //parse booking data
    outString += defaultStringDivider
    outString += "bookingDate,bookingAmount,bookingName,bokingCategoryName,bookingCategoryID \n"
    bookings.forEach((be) => {
        outString += toISOStringWithTimezone(be.date)+","+be.amount+","+be.name+","+be.category.name+","+be.category.id+"\n"
    })

    return outString
}

/**
 * saves string data into a file. Creates the file if it does not exist already, otherwise the old file will be overwritten,
 * @param data the data to be saved
 * @param filepath the file to save to
 */
const saveStringToFile = (data: string, filepath: string): void => {
    if(!RNFetchBlob.fs.exists(filepath)){ //create the file if it does not exist
        RNFetchBlob.fs.createFile(filepath, data, 'utf8')
    } else {//update the file if it exists
        RNFetchBlob.fs.writeStream(
            filepath,
            // encoding, should be one of `base64`, `utf8`, `ascii`
            'utf8',
            // should data append to existing content ?
            false
        )
        .then<RNFetchBlobWriteStream | never>((ofstream: RNFetchBlobWriteStream) => {
            ofstream.write(data)
            return ofstream
        })
        .then<void | never>((ofstream: RNFetchBlobWriteStream) => {
            ofstream.close()
        })
        .catch(console.error)
    }
}

/**
 * exports the current data to the downloads foulder. If the default filename already exists it adds a "_n" to the filename
 * @param categorys the categorys to be saved
 * @param bookings the bookings to be saved
 */
export const exportToDownloads = (categorys: CategoryElement[], bookings: BookingElement[]): void => {
    const exportDir: string = RNFetchBlob.fs.dirs.DownloadDir //TODO: the downloadDir is android only! Change this for IOS!
    var filePathIterator: number = 0

    const getCurrentIterationFilename = (): string => {
        if(filePathIterator === 0)
            return defaultFilename+defaultFileEnding
        else
            return defaultFilename+"_"+filePathIterator+defaultFileEnding
    }

    RNFetchBlob.fs.ls(exportDir)
    .then((filenames: string[]) => {
        console.log(filenames, getCurrentIterationFilename())
        while(filenames.includes(getCurrentIterationFilename())){
            filePathIterator += 1
        }
    })
    .then(() => {
        const data: string = dataToString(categorys, bookings)
        const filepath: string = exportDir+"/"+getCurrentIterationFilename()
        saveStringToFile(data, filepath)
    })
    .catch(console.error)
}

/**
 * saves the data to the cahce foulder
 * @param categorys the categorys to be saved
 * @param bookings the bookings to be saved
 */
export const saveToCache = (categorys: CategoryElement[], bookings: BookingElement[]): void => {
    const filepath: string = RNFetchBlob.fs.dirs.CacheDir + "/" + defaultFilename;
    console.log(filepath)

    const data: string = dataToString(categorys, bookings)
    saveStringToFile(data, filepath)
}

//  const dataFromCsv = (): [CategoryElement[], BookingElement[]] => {
//     const dirs = RNFetchBlob.fs.dirs

//     let data = ''
//     RNFetchBlob.fs.readStream(
//         // file path
//         PATH_TO_THE_FILE,
//         // encoding, should be one of `base64`, `utf8`, `ascii`
//         'base64',
//         // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
//         // when reading file in BASE64 encoding, buffer size must be multiples of 3.
//         4095)
//     .then((ifstream) => {
//         ifstream.open()
//         ifstream.onData((chunk) => {
//         // when encoding is `ascii`, chunk will be an array contains numbers
//         // otherwise it will be a string
//         data += chunk
//         })
//         ifstream.onError((err) => {
//         console.log('oops', err)
//         })
//         ifstream.onEnd(() => {  
//         <Image source={{ uri : 'data:image/png,base64' + data }}
//         })
//     })
//  }

