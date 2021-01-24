import React, { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { DefaultColors, tableStyles } from "../Styles/Styles"
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
        <View>
            <Text>
                To import the data, place the ".csv" file containing your Budget Book data into the downloads folder of your phone. Choose a File from below:
            </Text>

            { availableFiles.length === 0 ?
                <Text>
                    No files available
                </Text>
                :
                <ScrollView //TODO: style
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
                                color={DefaultColors.darkBlue}
                            />
                            <Text style={{width: "80%", color: "black" }}>{name}</Text>
                        </TouchableOpacity>
                    </>
                ))}

                </ScrollView>
            }
        </View>
    )
}

export default ImportScreen