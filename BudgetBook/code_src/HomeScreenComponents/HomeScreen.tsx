import React from "react"
import { Dimensions, View } from "react-native"
import { defaultColors, defaultViewStyles } from "../Styles/Styles"
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { eScreens } from "../../App"
import DarkBlueButton from "../GenericComponents/GenericButtons/DarkBlueButton"
import OrangeButton from "../GenericComponents/GenericButtons/OrangeButton"
import { darkBlueButtonStyle, orangeButtonStyle } from "../GenericComponents/GenericButtons/ButtonStyles"

interface Props{
    openScreen: (newScreen: eScreens) => void
}

const HomeScreen = (props: Props): JSX.Element => {
    return(
        <View
            style={[defaultViewStyles.containerWithPadding, {justifyContent: "flex-end"}]}
        >
            {/* TODO: some cool infos like the total amound of money and maybe the 30 day trend or something like that*/ }
            {/* <Text>
                Total amount: TODO
            </Text>
            <Text>
                Uni: -333
            </Text>
            <Text>
                Stipendium: +990
            </Text> */}

            <View
                style={{flexDirection: "row", justifyContent: "space-between", alignContent: "stretch"}}
            >
                <DarkBlueButton
                    buttonStyle={{minWidth: Dimensions.get('window').width * 0.81}}
                    onPress={() => props.openScreen(eScreens.BOOKING_LIST_SCREEN)}
                    icon={
                        <MaterialComunityIcon
                            name="book-outline"
                            size={20}
                            color={darkBlueButtonStyle.titleStyle.color}
                            style={{alignContent: "center"}}
                        />
                    }
                    title={"Bookings"}
                />
                <OrangeButton
                    buttonStyle={{minWidth: Dimensions.get('window').width * 0.16}}
                    onPress={() => props.openScreen(eScreens.ADD_BOOKING_SCREEN)}
                    icon={
                        <MaterialComunityIcon
                            name="plus"
                            size={20}
                            color={orangeButtonStyle.titleStyle.color}
                        />
                    }
                />
            </View>

            <View
                style={{flexDirection: "row", justifyContent: "space-between", alignContent: "stretch"}}
            >
                <DarkBlueButton
                    buttonStyle={{minWidth: Dimensions.get('window').width * 0.81}}
                    onPress={() => props.openScreen(eScreens.CATEGORY_LIST_SCREEN)}
                    icon={
                        <MaterialComunityIcon
                            name="label-outline"
                            size={20}
                            color={darkBlueButtonStyle.titleStyle.color}
                        />
                    }
                    title={"Categorys"}
                />
                <OrangeButton
                    buttonStyle={{minWidth: Dimensions.get('window').width * 0.16}}
                    onPress={() => props.openScreen(eScreens.ADD_CATEGORY_SCREEN)}
                    icon={
                        <MaterialComunityIcon
                            name="plus"
                            size={20}
                            color={orangeButtonStyle.titleStyle.color}
                        />
                    }
                />
            </View>

            <DarkBlueButton
                buttonStyle={{alignContent: "stretch"}}
                onPress={() => props.openScreen(eScreens.ANALYTICS)}
                icon={
                    <MaterialComunityIcon
                        name="chart-line"
                        size={20}
                        color={defaultColors.disabled}
                    />
                }
                title={"Analytics"}
                disabled={true}
            />

            <DarkBlueButton
                buttonStyle={{alignContent: "stretch"}}
                onPress={() => props.openScreen(eScreens.SETTINGS_SCREEN)}
                icon={
                    <IonIcon
                        name="settings-outline"
                        size={20}
                        color={darkBlueButtonStyle.titleStyle.color}
                    />
                }
                title={"Settings"}
            />

        </View>
    )
}

export default HomeScreen