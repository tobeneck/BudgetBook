import React from "react"
import { Text, View } from "react-native"
import { Header } from "react-native-elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { defaultColors, defaultViewStyles, statusBarProps } from "../Styles/Styles"

interface Props{
    headerHeadline: string,
    onHeaderBackButtonPressed?: () => void,
    content: JSX.Element
}

const ScreenComponent = (props: Props): JSX.Element => {

    return (
        <View>
            <Header
                statusBarProps={statusBarProps}
                containerStyle={defaultViewStyles.header}
                style={defaultViewStyles.content}
            >

                {
                    !!props.onHeaderBackButtonPressed &&
                    <Icon
                        name='arrow-left'
                        size={30}
                        color={defaultColors.lightTextColor}
                        onPress={() => props.onHeaderBackButtonPressed!()}
                    />
                }

                <Text
                    style={ {color: defaultColors.lightTextColor, fontWeight: 'bold', fontSize: 18, justifyContent: "center"} }
                >
                    {props.headerHeadline}
                </Text>

            </Header>

            <View
                //NOTE: scroll view?
                style={defaultViewStyles.content}
            >
            {
                props.content
            }
            </View>
        </View>
    )
}

export default ScreenComponent