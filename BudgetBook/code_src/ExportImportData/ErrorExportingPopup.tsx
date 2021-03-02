import React from "react"
import { Text, View } from "react-native"
import { Overlay } from "react-native-elements"
import { smallPopupStyles, spacings } from "../Styles/Styles"
import { openSettings } from 'react-native-permissions';
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton";
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton";

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
                    <OrangeButton
                        onPress={() => openSettings().catch(console.error)}
                        title="Open settings"
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

export default ErrorExportingPopup