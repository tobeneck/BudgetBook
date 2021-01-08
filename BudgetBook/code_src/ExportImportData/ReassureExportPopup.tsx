import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { buttonStyles, smallPopupStyles, spacings } from "../Styles/Styles"
import { getFreeFilePath, defaultFilename, defaultFileEnding, currentDateAppendix } from "./CSVHandler"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props{
    visible: boolean,
    onCancelPressed: () => void,
    onExportPressed: () => void
}

const ReassureExportPopup = (props: Props): JSX.Element => {
    const [filename, setFilename] = useState<string>(defaultFilename+currentDateAppendix()+defaultFileEnding)

    useEffect(() => {
        getFreeFilePath()
        .then((filepath: string) => {
            const splitFilepath: string[] = filepath.split("/")
            console.log(splitFilepath)
            setFilename(splitFilepath[splitFilepath.length - 1])
        })
    })

    return (
        <Overlay
            isVisible={props.visible}
            // onBackdropPress={() => props.setVisible(false)}
            overlayStyle={smallPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.onCancelPressed()}
        >
            <View style={{height: "100%", justifyContent: "space-between"}}>
                <Text style={smallPopupStyles.headline}>Export the Data</Text>

                <Text style={smallPopupStyles.text}>The data will be exportet to the "Downloads" foulder with the filename {filename}.</Text>

                <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                    <Button
                        onPress={() => props.onExportPressed()}
                        title=" Export"
                        buttonStyle={buttonStyles.saveButtonStyle}
                        titleStyle={buttonStyles.saveButtonText}
                        icon={
                            <Icon
                            name="file-export-outline"
                            size={20}
                            color={buttonStyles.saveButtonText.color}
                            style={{alignContent: "center"}}
                          />
                        }
                    />

                    <View style={spacings.defaultVerticalSpacing} />

                    <Button
                        onPress={() => props.onCancelPressed()}
                        title="Cancel"
                        titleStyle={buttonStyles.cancelButtonText}
                        buttonStyle={buttonStyles.cancelButtonStyle}
                    />
                </View>
            </View>
        </Overlay>
    )
}

export default ReassureExportPopup