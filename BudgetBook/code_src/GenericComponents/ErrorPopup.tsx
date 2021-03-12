import React from "react"
import { ScrollView, Text, View } from "react-native"
import { Overlay } from "react-native-elements"
import { defaultViewStyles, smallPopupStyles } from "../Styles/Styles"
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton";

interface Props{
    visible: boolean,
    closePopup: () => void,
    errorText: string
}

const ErrorPopup = (props: Props): JSX.Element => {
    return (
        <Overlay
            isVisible={props.visible}
            onBackdropPress={() => props.closePopup()}
            overlayStyle={smallPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.closePopup()}
        >
            <ScrollView>
                <View style={{height: "100%", justifyContent: "space-between"}}>
                    <Text style={smallPopupStyles.errorHeadline}>An error occured!</Text>

                    <Text style={smallPopupStyles.text}>{props.errorText}</Text>

                    <View style={defaultViewStyles.bottomButtonRow}>
                        <DarkBlueButton
                            onPress={() => props.closePopup()}
                            title="Close"
                        />
                    </View>
                </View>
            </ScrollView>
        </Overlay>
    )
}

export default ErrorPopup