import React from "react"
import { ScrollView, Text, View } from "react-native"
import { Overlay } from "react-native-elements"
import { defaultViewStyles, smallPopupStyles, spacings } from "../Styles/Styles"
import { openSettings } from 'react-native-permissions';
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton";
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton";

interface Props{
    visible: boolean,
    setVisible: (visible: boolean) => void
}

const FSAccessErrorPopup = (props: Props): JSX.Element => {
    return (
        <Overlay
            isVisible={props.visible}
            onBackdropPress={() => props.setVisible(false)}
            overlayStyle={smallPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.setVisible(false)}
        >
                <View style={{height: "100%", justifyContent: "space-between"}}>
                    <Text style={smallPopupStyles.errorHeadline}>Not all neccecary permissions granted</Text>

                    <Text style={smallPopupStyles.text}>The App has no permission to access the files on your phone. Please check the Settings of this app and grand permission to access "Files and media", otherwise your data can not be exported or imported.</Text>

                    <View style={defaultViewStyles.bottomButtonRow}>
                        <OrangeButton
                            onPress={() => {
                                openSettings().catch(console.error)

                            }}
                            title="Open settings"
                        />

                        <View style={spacings.defaultVerticalSpacing} />

                        <DarkBlueButton
                            onPress={() => props.setVisible(false)}
                            title="Cancel"
                        />
                    </View>
                </View>
        </Overlay>
    )
}

export default FSAccessErrorPopup