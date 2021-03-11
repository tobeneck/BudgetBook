import React from "react"
import { Text, View } from "react-native"
import { Overlay } from "react-native-elements"
import { smallPopupStyles, spacings } from "../Styles/Styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton"
import { orangeButtonStyle } from "../GenericComponents/GenericButtons/ButtonStyles"
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton"

interface Props{
    visible: boolean,
    importFileTitle: string;
    onCancelPressed: () => void,
    onImportPressed: () => void
}

const ReassureImportPopup = (props: Props): JSX.Element =>{

    return (
        <Overlay
            isVisible={props.visible}
            // onBackdropPress={() => props.setVisible(false)}
            overlayStyle={smallPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.onCancelPressed()}
        >
            <View style={{height: "100%", justifyContent: "space-between"}}>
                <Text style={smallPopupStyles.headline}>Import "{props.importFileTitle}"?</Text>

                <Text style={smallPopupStyles.text}>Your existing data will be overwritten and lost!</Text>

                <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                    <OrangeButton
                        onPress={() => props.onImportPressed()}
                        title=" Import"
                        icon={
                            <Icon
                            name="file-import-outline"
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

export default ReassureImportPopup