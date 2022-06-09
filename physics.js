import Matter from "matter-js";
//import { getRandom } from "./utils/random";
import { Dimensions } from 'react-native'
import Obstacle from "./components/Obstacle";
import { getOBPosColor } from "./utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
var index_ob = 1;
var last_label = 'None';

const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine
    let world = entities.physics.world
    // move right and left
    touches.filter(t => t.type === 'press')
        .forEach(t => {
            if (t.event.pageX < windowWidth * 0.45) {
                Matter.Body.translate(entities.Bird.body, {
                    x: -windowWidth * 0.05,
                    y: 0
                })
            }
            if (t.event.pageX > windowWidth * 0.55) {
                Matter.Body.translate(entities.Bird.body, {
                    x: windowWidth * 0.05,
                    y: 0
                })
            }
        })
    
    Matter.Engine.update(engine, time.delta)
    

    for (let index = index_ob; index <= index_ob+4; index++) {
        if (entities[`Obstacle${index}`].body.bounds.min.y <= windowHeight * 0.1) {
            //const pipe_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9);
            const pipe = getOBPosColor(0, windowHeight * 0.95)
            
            /*
            
            
            Matter.World.remove(world, entities[`Obstacle${index}`].body)
            
            let body = Matter.Bodies.rectangle(
                pipe.OB.pos,
                pipe.OB.size,
                {
                    frictionAir: 0.021,
                    restitution: 1.0
                }
            );
            Matter.World.add(world, [body]);
            entities[`Obstacle${index}`]={
                body: body,
                size: pipe.OB.size,
                color: pipe.OB.color,
                renderer: <Obstacle />
            };
            */

            Matter.Body.setPosition(entities[`Obstacle${index}`].body, pipe.OB.pos)
            
            dispatch({ type: 'new_point' })
            
            
        }
        Matter.Body.translate(entities[`Obstacle${index}`].body, { x: 0, y: -2 })
    }

    // don't exceed x border
    if (entities[`Bird`].body.bounds.min.x < 0) {
        Matter.Body.translate(entities[`Bird`].body, { x: windowWidth * 0.05, y: 0 })
    }
    if (entities[`Bird`].body.bounds.max.x > windowWidth) {
        Matter.Body.translate(entities[`Bird`].body, { x: -windowWidth * 0.05, y: 0 })
    }
  

    
    
    Matter.Events.on(engine, 'collisionStart', (event) => {
        var pairs = event.pairs;
        var objA = pairs[0].bodyA;
        var objB = pairs[0].bodyB;
        //console.log(objB.label)
        //console.log(objB)


        // game over
        if (objA.label === "Bird" && objB.label === "Floor") {
            dispatch({ type: "game_over" })
        }
        // touch ceil minus hp
        if (objA.label === "Bird" && objB.label === "Ceiling" && objB.label !=last_label) {
            //Matter.Body.translate(entities[`Bird`].body, { x: 0, y: 5 })
            dispatch({ type: "minus_HP" })
            
        }
        // bounce
        if (objA.label === "Bird" && objB.label === "Obstacle3") {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: 0,
                y: -7
            })
        }
        // trap
        if (objA.label === "Bird" && objB.label === "Obstacle4" && objB.label !=last_label) {
            dispatch({ type: "minus_HP" })
        }
        // blue right
        
        if (objA.label === "Bird" && objB.label === "Obstacle1") {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: +5,
                y: 0
            })
        }
        // gray left
        if (objA.label === "Bird" && objB.label === "Obstacle5") {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: -5,
                y: 0
            })
        }
        // touch ob plus hp
        for (let index = 1; index <= 5; index++) {
            
            if (objA.label === "Bird" && objB.label === `Obstacle${index}` && objB.label !=last_label ){
                dispatch({ type: "plus_HP" })
            }
        }
        
        
        last_label = objB.label;
        /*
        if (objA === "Bird" && previous != objB) {
            dispatch({ type: 'new_point' })
        }
        previous = objB;
        */
    })
    
    

    return entities;
}
export default Physics