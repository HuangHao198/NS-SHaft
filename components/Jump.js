import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'

const Jump = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = props.color;

    return (
        <View
            style={{
                backgroundColor: color,
                borderWidth: 1,
                borderColor: color,
                borderStyle: 'solid',
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody
            }}>
            <Image
                style={{ width: widthBody, height: heightBody }}
                resizeMode="stretch"
                source={require('../assets/jump.png')}
            />

        </View>
    )
}

export default (world, label, color, pos, size) => {
    const initialJump = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true
        }
    )
    Matter.World.add(world, initialJump)

    return {
        body: initialJump,
        color,
        pos,
        renderer: <Jump />
    }
}

