import Matter from 'matter-js'
import React from 'react'
import { View, Image, TouchableOpacity} from 'react-native'


const RightButton = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    const press = () => {
        Matter.Body.translate(entities.RightButton.body, {
            x: 10,
            y: 0
        })
        console.log("press Right!");
    }
    return (
        <View
            style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
            }}>
            <TouchableOpacity onLongPress={press}>
                <Image
                    style={{ width: widthBody, height: heightBody }}
                    resizeMode="stretch"
                    source={require('../assets/RightButton.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

export default (world, pos, size) => {
    const initialRightButton = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: 'RightButton',
            isStatic: true
        }
    )
    Matter.World.add(world, initialRightButton)

    return {
        body: initialRightButton,
        pos,
        renderer: <RightButton />
    }
}

