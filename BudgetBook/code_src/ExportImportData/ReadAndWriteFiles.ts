import { PERMISSIONS, request } from "react-native-permissions"
import RNFetchBlob, { RNFetchBlobWriteStream } from "rn-fetch-blob"


export const defaultDownloadDir: string = RNFetchBlob.fs.dirs.DownloadDir //TODO: the downloadDir is android only! Change this for IOS!
export const defaultExportDir: string = RNFetchBlob.fs.dirs.DocumentDir

const encoding = 'utf8'

//todo: ONLY PROMPT THE FILE ACCESS ERROR WHEN TRYING TO READ AN EXTERNAL FILEPATH!!!

/**
 * chechs the read permissions of the external storage
 * @returns returns a promise boolean
 */
export const checkReadExternalStorage = async(): Promise<boolean> => {
    return (
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(async (result) => {
            return result === "granted"
        })
    )
}

/**
 * chechs the write permissions of the external storage
 * @returns returns a promise boolean
 */
 export const checkWriteExternalStorage = async(): Promise<boolean> => {
    return (
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(async (result) => {
            return result === "granted"
        })
    )
}

/**
 * saves string data into a file, overriting the previous content. Creates the file if it does not exist already, otherwise the old file will be overwritten,
 * @param data the data to be saved
 * @param filepath the file to save to
 */
export const writeFile = (data: string, filepath: string, errorHandler: (message: string) => void): void => {
    RNFetchBlob.fs.exists(filepath)
    .then((exists: boolean) => {
        if(!exists){ //create the file if it does not exist
            RNFetchBlob.fs.createFile(filepath, data, encoding).catch((e: Error) => errorHandler("An error occured creating a new file! Got message: \n"+e.message))
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
            .catch((e: Error) => errorHandler("An error occured writing to an existing file! Got message: \n"+e.message))
        }
    })
    .catch((e: Error) => errorHandler("An error occured writing a file! Got message: \n"+e.message))
}



/**
 * reads a filepath and returns the string in it
 * @param filePath the filepath to be read
 */
export const readFile = async (filePath: string): Promise<string> => {

    return await RNFetchBlob.fs.readFile(filePath, encoding); //error can be catched by the "parent" method

 }

/**
 * reads the files in filePath and checks for access rights
 * @param filePath the filepath to be checked
 * @returns if the app has sufficient acces rights, the files in the path are returned
 */
 export const getFilesInPath = (filePath: string, ): Promise<string[]> => { //TODO: delete

    return (
        RNFetchBlob.fs.ls(filePath)
    )
}

