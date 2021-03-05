import RNFetchBlob, { RNFetchBlobWriteStream } from "rn-fetch-blob"


export const defaultDownloadDir: string = RNFetchBlob.fs.dirs.DownloadDir //TODO: the downloadDir is android only! Change this for IOS!
export const defaultExportDir: string = RNFetchBlob.fs.dirs.DocumentDir

const encoding = 'utf8'


/**
 * saves string data into a file, overriting the previous content. Creates the file if it does not exist already, otherwise the old file will be overwritten,
 * @param data the data to be saved
 * @param filepath the file to save to
 */
export const writeFile = (data: string, filepath: string, errorCallback?: (e: Error) => void): void => {

    RNFetchBlob.fs.exists(filepath)
    .then((exists: boolean) => {
        if(!exists){ //create the file if it does not exist
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
 * reads a filepath and returns the string in it
 * @param filePath the filepath to be read
 */
export const readFile = async (filePath: string): Promise<string> => {

    console.log("reading file ", filePath)
    return await RNFetchBlob.fs.readFile(filePath, encoding);
 }
