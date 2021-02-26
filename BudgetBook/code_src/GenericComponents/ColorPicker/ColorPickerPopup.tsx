import { View, Text, TextInput } from "react-native"
import { Overlay, Button } from "react-native-elements"
import { TriangleColorPicker, ColorPicker, toHsv, fromHsv } from 'react-native-color-picker'
import { bigPopupStyles, buttonStyles, spacings } from "../../Styles/Styles"
import React, { useState, useEffect } from "react"

interface Props{
    visible: boolean,
    initialColor: string,
    onCancelPressed: () => void,
    onSavePressed: (color: string) => void,
}

const ColorPickerPopup = (props: Props): JSX.Element => {
    const [color, setColor] = useState<string>(props.initialColor)
    const [textColor, setTextColor] = useState<string>(props.initialColor)

    useEffect(() => {
        setColor(props.initialColor)
    }, [props.initialColor])

    return(
        <Overlay
            isVisible={props.visible}
            // onBackdropPress={() => props.setVisible(false)}
            overlayStyle={bigPopupStyles.overlay}
            statusBarTranslucent={true}
            onRequestClose={() => props.onCancelPressed()}
            transparent={true}
        >
            <View style={{height: "100%", width: "100%", justifyContent: "space-between"}}>
                <View style={{height: "90%", justifyContent: "flex-start"}}>
                    {/* <Text style={bigPopupStyles.headline}>Pick a color</Text> */}
                    <Text style={bigPopupStyles.headline}>
                        Pick a color:
                    </Text>
                    <TextInput
                        style={[bigPopupStyles.headline, {color: color}]}
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

                <View style={{width: "100%", flexDirection: "row", justifyContent:"flex-end"}}>
                    <Button
                        onPress={() => props.onSavePressed(color)}
                        title="Save"
                        buttonStyle={buttonStyles.saveButtonStyle}
                        titleStyle={buttonStyles.saveButtonText}
                        accessibilityLabel="Add Item to the budget list"
                    />

                    <View style={spacings.doubleVerticalSpacing}/>

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

export default ColorPickerPopup