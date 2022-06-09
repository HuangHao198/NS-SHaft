import Matter from "matter-js"
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import Jump from "../components/Jump";
import Right from "../components/Right";
import Left from "../components/Left";
import Trap from "../components/Trap";
//import LeftButton from "../components/LeftButton";
//import RightButton from "../components/RightButton";
import Ceiling from "../components/Ceiling";

import { Dimensions } from 'react-native'
//import { getRandom } from "../utils/random";
import { getOBPosColor } from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 1;

    //const pipe1_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    //const pipe2_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    //const pipe3_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    //const pipe4_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    //const pipe5_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    //const pipe6_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    //const pipe7_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    //const pipe8_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)

    const pipe1 = getOBPosColor(3, windowHeight * 0.35)
    const pipe2 = getOBPosColor(1, windowHeight * 0.50)
    const pipe3 = getOBPosColor(2, windowHeight * 0.65)
    const pipe4 = getOBPosColor(4, windowHeight * 0.80)
    const pipe5 = getOBPosColor(4, windowHeight * 0.95)
    //const pipe6 = getOBPosColor(1, windowHeight * 0.75)
    //const pipe7 = getOBPosColor(2, windowHeight * 0.85)

    //const pipe8 = getOBPosColor(4, windowHeight * 0.95)

    return {
        physics: { engine, world },

        Bird: Bird(world, 'green', { x: windowWidth / 2, y: windowHeight * 0.18 }, { height: windowHeight * 0.05, width: windowHeight * 0.05 }),
        //LeftButton: LeftButton(world, { x: windowWidth * 0.4, y: windowHeight * 0.95}, { height: 60, width: 60 }),
        //RightButton: RightButton(world, { x: windowWidth * 0.6, y: windowHeight * 0.95 }, { height: 60, width: 60 }),
        Ceiling: Ceiling(world, { x: windowWidth / 2, y: windowHeight * 0.05 }, { height: windowHeight * 0.1, width: windowWidth }),
        
        Obstacle1: Right(world, 'Obstacle1', pipe1.OB.color, pipe1.OB.pos , pipe1.OB.size),
        Obstacle2: Obstacle(world, 'Obstacle2', pipe2.OB.color, pipe2.OB.pos , pipe2.OB.size),
        Obstacle3: Jump(world, 'Obstacle3', pipe3.OB.color, pipe3.OB.pos , pipe3.OB.size),
        Obstacle4: Trap(world, 'Obstacle4', pipe4.OB.color, pipe4.OB.pos , pipe4.OB.size),
        Obstacle5: Left(world, 'Obstacle5', pipe5.OB.color, pipe5.OB.pos , pipe5.OB.size),
        //Obstacle6: Obstacle(world, 'Obstacle6', pipe6.OB.color, pipe6.OB.pos , pipe6.OB.size),
        //Obstacle7: Obstacle(world, 'Obstacle7', pipe7.OB.color, pipe7.OB.pos , pipe7.OB.size),
        
        //Obstacle8: Obstacle(world, 'Obstacle8', pipe8.OB.color, pipe8.OB.pos , pipe8.OB.size),
        Floor: Floor(world, 'black', { x: windowWidth / 2, y: windowHeight * 0.95 }, { height: windowHeight * 0.1, width: windowWidth })
        
    }
}