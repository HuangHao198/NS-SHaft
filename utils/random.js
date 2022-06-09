import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export const getOBPosColor = (seed=0, addToPosY = 0) => {
    let xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    var color = 'None'
    if(seed === 0){
        seed = getRandom(1, 5)
    } 
    switch (seed){
        case 1:
            color = 'red';
            break;
        case 2:
            color = 'green';
            break;
        case 3:
            color = 'blue';
            break;
        case 4:
            color = 'gray';
            break;
        case 5:
            color = 'white';
            break;
    }
    const OB = { pos: { x: xPos, y: addToPosY }, size: { height: 20, width: windowWidth * 0.2 }, color: color}
    return { OB }
}

export const getPipeSizePosPair = (addToPosX = 0) => {
    let yPosTop = -getRandom(300, windowHeight - 100)

    const pipeTop = { pos: { x: windowWidth + addToPosX, y: yPosTop }, size: { height: windowHeight * 2, width: 75 } }
    const pipeBottom = { pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop }, size: { height: windowHeight * 2, width: 75 } }

    return { pipeTop, pipeBottom }

}
