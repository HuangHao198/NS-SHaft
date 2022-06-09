import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Dimensions, Image } from 'react-native'
import axios from 'axios';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

//
//<Image source={require('./assets/background.png')} style={styles.backgroundImage} resizeMode="stretch" />
export default function App() {
  const piPrivateUrl = '192.168.137.14';
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [currentHP, setCurrentHPs] = useState(10)
  useEffect(() => { // start runing
    setRunning(false)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Image source={require('./assets/bg2.png')} style={styles.backgroundImage} resizeMode="stretch" />
      <Text style={{ marginTop: windowHeight * 0.12, textAlign: 'left', fontSize: 30, fontWeight: 'bold', color: 'white'}}>{currentPoints} Floor </Text>
      <Text style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold', color: 'white' }}>{currentHP} HP</Text>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              //setCurrentPoints(0)
              setCurrentHPs(0)
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
            case 'minus_HP':  
              if(currentHP <= 3){
                setRunning(false)
                gameEngine.stop()
                //setCurrentPoints(0)
                setCurrentHPs(0)
                break;
              }
              setCurrentHPs(currentHP - 3)
              break;
            case 'plus_HP':  
              if(currentHP >= 10){
                break;
              }
              setCurrentHPs(currentHP + 1)
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} /> 
      

      </GameEngine>

      {!running ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0)
              setCurrentHPs(10)
              setRunning(true)
              gameEngine.swap(entities())
              axios.get(`${piPrivateUrl}/sensors`, {
                params: {
                  name : 'start'
                }
                })
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>

        </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  backgroundImage: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: windowWidth,
      height: windowHeight
  }
});
