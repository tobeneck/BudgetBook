import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { Overlay } from "react-native-elements"
import { TriangleColorPicker, toHsv, fromHsv } from 'react-native-color-picker'
import { defaultViewStyles, interactionElements, spacings, textStyles } from "../../Styles/Styles"
import React, { useState, useEffect } from "react"
import ColoredCircle from "../ColoredCircle"
import OrangeButton from "../GenericButtons/OrangeButton"
import DarkBlueButton from "../GenericButtons/DarkBlueButton"

interface Props{
    initialColor: string,
    onSavePressed: (color: string) => void,
}

const ColorInput = (props: Props): JSX.Element => {
    const [color, setColor] = useState<string>(props.initialColor)
    const [textColor, setTextColor] = useState<string>(props.initialColor)
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        setColor(props.initialColor)
    }, [props.initialColor])

    return(
        <>
            <Overlay
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                overlayStyle={{height: "70%", width: "90%"}} //TODO?
                fullScreen={false}
                statusBarTranslucent={true}
                onRequestClose={() => setVisible(false)}
                transparent={true}
            >
                <View style={[defaultViewStyles.containerWithPadding]}>
                    <View style={defaultViewStyles.simpleFlexStart}>
                        {/* <Text style={bigPopupStyles.headline}>Pick a color</Text> */}
                        <Text style={textStyles.headline}>
                            Pick a color:
                        </Text>
                        <TextInput
                            style={[textStyles.headline, {color: color}]}
                            //onChangeText={text => setCategoryName(text)}
                            value={textColor}
                            onChangeText={(newText: string) => setTextColor(newText)}
                            onBlur={() => {
                                const newConvertedColor: string = fromHsv(toHsv(textColor))
                                setTextColor(newConvertedColor)
                                setColor(newConvertedColor)
                            }}
                            editable={true}
                        />
                        <TriangleColorPicker
                            onColorChange={newColor => {
                                const newConvertedColor: string = fromHsv(newColor)
                                setColor(newConvertedColor)
                                setTextColor(newConvertedColor)
                            }}
                            style={{height: "75%", width: "85%", alignSelf: "center"}}
                            color={toHsv(color)}
                            //defaultColor={toHsv(color)}
                            oldColor={color}
                        />
                    </View>

                    <View style={defaultViewStyles.bottomButtonRow}>
                        <OrangeButton
                            onPress={() => {
                                props.onSavePressed(color)
                                setVisible(false)
                            }}
                            title="Save"
                        />

                        <View style={spacings.doubleVerticalSpacing}/>

                        <DarkBlueButton
                            onPress={() => setVisible(false)}
                            title="Cancel"
                        />
                    </View>
                </View>

            </Overlay>


            <View style={interactionElements.text}>
                <TouchableOpacity
                    style={defaultViewStyles.simpleRow}
                    onPress={() => setVisible(true)}
                >
                    <ColoredCircle
                        color={color}
                        size={16}
                    />
                    <Text
                        style={textStyles.normal}
                    >
                        {color}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ColorInput