import React, { useState, useEffect } from "react"
import { Text, ScrollView, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { defaultColors, tableStyles } from "../Styles/Styles"
import { getCsvFilesInDownloads } from "./CSVHandler"

interface Props{
    loadCsvFile: (filename: string) => void
}

const ImportScreen = (props: Props): JSX.Element => {
    const [availableFiles, setAvailableFiles] = useState<string[]>(["hello", "this is a test.csv"])

    useEffect(() => {
        getCsvFilesInDownloads()
        .then((filenames: string[]) => {
            setAvailableFiles(filenames)
        })
    }, [])


    return(
        <>
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
                            onPress={() => props.loadCsvFile(name)}
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