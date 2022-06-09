import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'


const Ceiling = props => {
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
            opacity: 1,
            width: widthBody,
            height: heightBody
            }}>
            <Image
                style={{ width: widthBody, height: heightBody }}
                resizeMode="stretch"
                source={require('../assets/Spike_Downward.png')}
            />
        </View>
    )
}

export default (world, pos, size) => {
    const initialCeiling = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: 'Ceiling',
            isStatic: true
        }
    )
    Matter.World.add(world, initialCeiling)

    return {
        body: initialCeiling,
        pos,
        renderer: <Ceiling />
    }
}

