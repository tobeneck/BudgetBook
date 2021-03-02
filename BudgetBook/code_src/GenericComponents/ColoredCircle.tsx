import React from "react"
import { View } from "react-native"

interface Props{
    color: string,
    size: number
}

const ColoredCircle = (props: Props): JSX.Element => {
    return (
        <View
            style={{
                width: props.size,
                height: props.size,
                backgroundColor: props.color,
                borderRadius: props.size / 2,
                marginLeft: "3%",
                alignSelf: "center",
                margin: props.size / 4
            }}
            >
        </View>
    )
}

export default ColoredCircle