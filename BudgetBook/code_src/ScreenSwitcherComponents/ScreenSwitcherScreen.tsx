import React from "react"
import { Text, TouchableOpacity, View, Modal } from "react-native"
import { buttonStyles, defaultColors } from "../Styles/Styles"
import { ScreenSwitcherStyles } from "./ScreenSwitcherStyle"
import { spacings } from "../Styles/Styles"
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { eCurrentScreen } from "../../App"
import { Button } from "react-native-elements"

interface Props{
    openScreen: (newScreen: eCurrentScreen) => void
    openExportPopup: () => void
}

const ScreenSwitcherScreen = (props: Props): JSX.Element => {
    return(
        <View
            style={ScreenSwitcherStyles.background}
        >
            {/* TODO: some cool infos like the total amound of money and maybe the 30 day trend or something like that*/ }
            <Text>
                Total amount: TODO
            </Text>
            <Text>
                Uni: -333
            </Text>
            <Text>
                Stipendium: +990
            </Text>

            <Button
                buttonStyle={[buttonStyles.orangeButtonStyle, {width: "100%", marginBottom:"1%"}]}
                titleStyle={buttonStyles.orangeButtonText}
                onPress={() => props.openScreen(eCurrentScreen.BOOKING_LIST_SCREEN)}
                icon={
                    <MaterialComunityIcon
                        name="book-outline"
                        size={20}
                        color={defaultColors.darkTextColor}
                        style={{alignContent: "center"}}
                    />
                }
                title={"Bookings"}
            />

            <Button
                buttonStyle={[buttonStyles.darkBlueButtonStyle, {width: "100%", marginBottom:"1%"}]}
                titleStyle={buttonStyles.darkBlueButtonText}
                onPress={() => props.openScreen(eCurrentScreen.CATEGORY_LIST_SCREEN)}
                icon={
                    <MaterialComunityIcon
                        name="label-outline"
                        size={20}
                        color={defaultColors.lightTextColor}
                        style={{alignContent: "center"}}
                    />
                }
                title={"Categorys"}
            />

            <Button
                buttonStyle={[buttonStyles.darkBlueButtonStyle, {width: "100%", marginBottom:"1%"}]}
                titleStyle={buttonStyles.darkBlueButtonText}
                onPress={() => props.openScreen(eCurrentScreen.GRAPHS_SCREEN)}
                icon={
                    <MaterialComunityIcon
                        name="chart-line"
                        size={20}
                        color={defaultColors.lightTextColor}
                        style={{alignContent: "center"}}
                    />
                }
                title={"Graphs"}
            />

            <Button
                buttonStyle={[buttonStyles.darkBlueButtonStyle, {width: "100%", marginBottom:"1%"}]}
                titleStyle={buttonStyles.darkBlueButtonText}
                onPress={() => props.openExportPopup()}
                icon={
                    <MaterialComunityIcon
                        name="file-export-outline"
                        size={20}
                        color={defaultColors.lightTextColor}
                        style={{alignContent: "center"}}
                    />
                }
                title={"Export"}
            />

            <Button
                buttonStyle={[buttonStyles.darkBlueButtonStyle, {width: "100%", marginBottom:"1%"}]}
                titleStyle={buttonStyles.darkBlueButtonText}
                onPress={() => props.openScreen(eCurrentScreen.IMPORT_DATA_SCREEN)}
                icon={
                    <MaterialComunityIcon
                        name="file-import-outline"
                        size={20}
                        color={defaultColors.lightTextColor}
                        style={{alignContent: "center"}}
                    />
                }
                title={"Import"}
            />

            <Button
                buttonStyle={[buttonStyles.darkBlueButtonStyle, {width: "100%", marginBottom:"1%"}]}
                titleStyle={buttonStyles.darkBlueButtonText}
                onPress={() => props.openScreen(eCurrentScreen.SETTINGS_SCREEN)}
                icon={
                    <IonIcon
                        name="settings-outline"
                        size={20}
                        color={defaultColors.lightTextColor}
                        style={{alignContent: "center"}}
                    />
                }
                title={"Settings"}
            />

        </View>
    )
}

export default ScreenSwitcherScreen