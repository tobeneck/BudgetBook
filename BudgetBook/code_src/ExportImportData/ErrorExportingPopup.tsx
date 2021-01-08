import React from "react"
import { Text, View } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { buttonStyles, smallPopupStyles, spacings } from "../Styles/Styles"
import { openSettings } from 'react-native-permissions';

interface Props{
    visible: boolean,
    onCancelPressed: () => void
}

const ErrorExportingPopup = (props: Props): JSX.Element => {
    return (
        <Overlay
            isVisible={props.visible}
            // onBackdropPress={() => props.setVisible(false)}
            overlayStyle={smallPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.onCancelPressed()}
        >
            <View style={{height: "100%", justifyContent: "space-between"}}>
                <Text style={smallPopupStyles.errorHeadline}>Error exporting the Data</Text>

                <Text style={smallPopupStyles.text}>The data could not be exportet. This app does not have the permissions to write to your devices storage. Please enable the permission for the file acces for this app in the settings.</Text>

                <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                    <Button
                        onPress={() => openSettings().catch(console.error)}
                        title="Open settings"
                        titleStyle={buttonStyles.saveButtonText}
                        buttonStyle={buttonStyles.saveButtonStyle}
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

export default ErrorExportingPopup