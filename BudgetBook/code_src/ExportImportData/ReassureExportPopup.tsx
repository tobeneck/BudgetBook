import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { smallPopupStyles, spacings } from "../Styles/Styles"
import { getFreeFilePath, defaultFilename, defaultFileEnding, currentDateAppendix } from "./CSVHandler"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton"
import { orangeButtonStyle } from "../GenericComponents/GenericButtons/ButtonStyles"
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton"

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

                <Text style={smallPopupStyles.text}>The data will be exportet to the "Downloads" folder with the filename {filename}.</Text>

                <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                    <OrangeButton
                        onPress={() => props.onExportPressed()}
                        title=" Export"
                        icon={
                            <Icon
                            name="file-export-outline"
                            size={20}
                            color={orangeButtonStyle.titleStyle.color}
                            style={{alignContent: "center"}}
                          />
                        }
                    />

                    <View style={spacings.defaultVerticalSpacing} />

                    <DarkBlueButton
                        onPress={() => props.onCancelPressed()}
                        title="Cancel"
                    />
                </View>
            </View>
        </Overlay>
    )
}

export default ReassureExportPopup