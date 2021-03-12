import React, { useState, useEffect } from "react"
import { Text, ScrollView, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { defaultColors, tableStyles } from "../Styles/Styles"
import { getCsvFilesInDownloads } from "./CSVHandler"
import ReassureImportPopup from "./ReassureImportPopup"

interface Props{
    importData: (filename: string) => void,
    handleError: (message: string) => void,
    handleAccessError: () => void
}

const ImportScreen = (props: Props): JSX.Element => {
    const [availableFiles, setAvailableFiles] = useState<string[]>([])
    const [selectedFilename, setSelectedFilename] = useState<string>("")

    useEffect(() => {
        console.log("try reading an external filepath import screen")
        getCsvFilesInDownloads(props.handleAccessError)
        .then((filenames: string[]) => {
            setAvailableFiles(filenames)
        })
        .catch((e: Error) => props.handleError('An error occured reading the files in the "Download" directory. Got the message: \n'+e.message))
    }, [])

     //TODO: in the import screen, show a message if the app has no permission to read!

    return(
        <>
            <ReassureImportPopup
                visible={selectedFilename !== ""}
                importFileTitle={selectedFilename}
                onImportPressed={() => {
                    props.importData(selectedFilename)
                    setSelectedFilename("")
                }}
                onCancelPressed={() => setSelectedFilename("")}
            />
            <Text
                style={[tableStyles.tableHeader, {textAlignVertical: "center", textAlign: "center"}]}
            >
                To import the data, place the ".csv" file containing your Budget Book data into the downloads folder of your phone. Choose a File from below:
            </Text>

            { availableFiles.length === 0 ?
                <Text style={{textAlign: "center"}}>
                    No files available. Put the wanted ".csv" file in your "Downloads" directory.
                </Text>
                :
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={tableStyles.tableContent}
                >

                {availableFiles.map((name: string, index: number) => (
                    <>
                        <TouchableOpacity
                            style={tableStyles.tableRow}
                            onPress={() => setSelectedFilename(name)}
                        >
                            <Icon
                                name="file-import-outline"
                                size={23}
                                color={defaultColors.primaryColor}
                            />
                            <Text style={[tableStyles.tableText, {width: "80%"}]}>{name}</Text>
                        </TouchableOpacity>
                    </>
                ))}

                </ScrollView>
            }
        </>
    )
}

export default ImportScreen