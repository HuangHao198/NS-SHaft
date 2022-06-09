import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'


const LeftButton = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return (
        <View
            style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
            }}>
            <Image
                style={{ width: widthBody, height: heightBody }}
                resizeMode="stretch"
                source={require('../assets/LeftButton.png')}
            />
        </View>
    )
}

export default (world, pos, size) => {
    const initialLeftButton = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: 'LeftButton',
            isStatic: true
        }
    )
    Matter.World.add(world, initialLeftButton)

    return {
        body: initialLeftButton,
        pos,
        renderer: <LeftButton />
    }
}

