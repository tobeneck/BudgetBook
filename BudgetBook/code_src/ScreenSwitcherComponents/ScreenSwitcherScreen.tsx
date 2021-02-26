import React from "react"
import { Text, TouchableOpacity, View, Modal } from "react-native"
import { DefaultColors } from "../Styles/Styles"
import { ScreenSwitcherStyles } from "./ScreenSwitcherStyle"
import { spacings } from "../Styles/Styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { eCurrentScreen } from "../../App"

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

            <TouchableOpacity
                style={[ScreenSwitcherStyles.screenPickerTile, {borderColor: DefaultColors.orange, backgroundColor: DefaultColors.orange}]}
                onPress={() => props.openScreen(eCurrentScreen.BOOKING_LIST_SCREEN)}
            >
                <Icon
                    name="book-outline"
                    size={20}
                    color="#fff"
                    //onPress={() => setReassureExportPopupVisible(true)}
                    style={{alignContent: "center"}}
                />
                <Text style={ScreenSwitcherStyles.text}> Bookings</Text>
            </TouchableOpacity>

            <View style={spacings.defaultHorizontalSpacing}/>

            <TouchableOpacity
                style={ScreenSwitcherStyles.screenPickerTile}
                onPress={() => props.openScreen(eCurrentScreen.CATEGORY_LIST_SCREEN)}
            >
                <Icon
                    name="label-outline"
                    size={20}
                    color="#fff"
                    //onPress={() => setReassureExportPopupVisible(true)}
                    style={{alignContent: "center"}}
                />
                <Text style={ScreenSwitcherStyles.text}> Categorys</Text>
            </TouchableOpacity>

            <View style={spacings.defaultHorizontalSpacing}/>

            <TouchableOpacity
                style={ScreenSwitcherStyles.screenPickerTile}
                onPress={() => props.openScreen(eCurrentScreen.SUPER_CATEGORY_LIST_SCREEN)}
            >
                <Icon
                    name="label-multiple-outline"
                    size={20}
                    color="#fff"
                    //onPress={() => setReassureExportPopupVisible(true)}
                    style={{alignContent: "center"}}
                />
                <Text style={ScreenSwitcherStyles.text}> Super Categorys</Text>
            </TouchableOpacity>

            <View style={spacings.defaultHorizontalSpacing}/>

            <TouchableOpacity
                style={ScreenSwitcherStyles.screenPickerTileDisabled}
                disabled={true}
                onPress={() => props.openScreen(eCurrentScreen.GRAPHS_SCREEN)}
            >
                <Icon
                    name="chart-line"
                    size={20}
                    color="#fff"
                    //onPress={() => setReassureExportPopupVisible(true)}
                    style={{alignContent: "center"}}
                />
                <Text style={ScreenSwitcherStyles.text}> Graphs</Text>
            </TouchableOpacity>

            <View style={spacings.defaultHorizontalSpacing}/>

            <TouchableOpacity
                style={ScreenSwitcherStyles.screenPickerTile}
                onPress={() => props.openExportPopup()}
            >
                <Icon
                    name="file-export-outline"
                    size={20}
                    color="#fff"
                    style={{alignContent: "center"}}
                />
                <Text style={ScreenSwitcherStyles.text}> Export</Text>
            </TouchableOpacity>

            <View style={spacings.defaultHorizontalSpacing}/>

            <TouchableOpacity
                style={ScreenSwitcherStyles.screenPickerTile}
                onPress={() => props.openScreen(eCurrentScreen.IMPORT_DATA_SCREEN)}
            >
                <Icon
                    name="file-import-outline"
                    size={20}
                    color="#fff"
                    style={{alignContent: "center"}}
                />
                <Text style={ScreenSwitcherStyles.text}> Import</Text>
            </TouchableOpacity>

            <View style={spacings.defaultHorizontalSpacing}/>

            <TouchableOpacity
                style={ScreenSwitcherStyles.screenPickerTileDisabled}
                disabled={true}
                onPress={() => props.openScreen(eCurrentScreen.INFO_SCREEN)}
            >
                <Icon
                    name="information-outline"
                    size={20}
                    color="#fff"
                    style={{alignContent: "center"}}
                />
                <Text style={ScreenSwitcherStyles.text}> App Info</Text>
            </TouchableOpacity>

            <View style={spacings.defaultHorizontalSpacing}/>

        </View>
    )
}

export default ScreenSwitcherScreen