'use strict'

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  ViroARScene,
  ViroConstants,
  ViroMaterials,
  ViroImage,
  Viro3DObject,
  ViroAnimations,
  ViroText,
} from '@akadrimer/react-viro'
import storage from '@react-native-firebase/storage'

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super()

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      imageUrl: 'imageUrl',
      object: <></>,
    }

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this)
    this.getUrlAndCM()
    this.styles = StyleSheet.create({
      Quizstyle: {
        fontFamily: 'NotoSansCJK',
        fontSize: 15,
        fontStyle: 'normal',
        color: '#000000',
        textAlignVertical: 'top',
        textAlign: 'center',
        fontWeight: 'bold',
      },
    })
  }

  render() {
    return (
      <>
        <ViroARScene onTrackingUpdated={this._onInitialized}>
          <ViroText
            text={this.state.text}
            extrusionDepth={3}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0.2, -0.8]}
            style={this.styles.Quizstyle}
          />

          <Viro3DObject
            source={require('./res/wolves/Wolves.obj')}
            materials={['wolf']}
            position={[-0.4, -0.5, -1.5]}
            scale={[0.08, 0.08, 0.08]}
            type="OBJ"
            animation={{ name: 'bounceRev', run: true, loop: true }}
            // dragType="FixedToWorld"
            // onDrag={() => {}}
            onClick={() => {
              this.setState({
                object: (
                  <ViroImage
                    height={0.8}
                    width={0.8}
                    position={[0, -0.0, -1.0]}
                    rotation={[-6, 0, 0]}
                    source={require('./res/correct.png')}
                  />
                ),
              })
              setTimeout(() => {
                this.setState({
                  object: <></>,
                })
              }, 5000)
            }}
          />
          <Viro3DObject
            name="wolf"
            source={require('./res//wolves/Wolves.obj')}
            materials={['wolf']}
            animation={{ name: 'bounceIt', run: true, loop: true }}
            position={[-0.0, -0.5, -1.5]}
            scale={[0.08, 0.08, 0.08]}
            type="OBJ"
            onClick={() => {
              this.setState({
                object: (
                  <ViroImage
                    height={0.8}
                    width={0.8}
                    position={[0, -0.0, -1.0]}
                    source={require('./res/correct.png')}
                  />
                ),
              })
              setTimeout(() => {
                this.setState({
                  object: <></>,
                })
              }, 5000)
            }}
          />
          <Viro3DObject
            name="piano"
            source={require('./res//wolves/Wolves.obj')}
            materials={['wolf']}
            position={[0.6, -0.5, -1.5]}
            scale={[0.08, 0.08, 0.08]}
            type="OBJ"
            animation={{ name: 'bounceRev', run: true, loop: true }}
            // dragType="FixedToWorld"
            // onDrag={() => {}}
            onClick={() => {
              this.setState({
                object: (
                  <ViroImage
                    height={0.8}
                    width={0.8}
                    position={[0, -0.0, -1.0]}
                    source={require('./res/correct.png')}
                  />
                ),
              })
              setTimeout(() => {
                this.setState({
                  object: <></>,
                })
              }, 5000)
            }}
          />
          {this.state.object}
        </ViroARScene>
      </>
    )
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: '강아지',
      })
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  async getUrlAndCM() {
    //const url = await storage().ref('Wolves_BaseColor.png').getDownloadURL()

    ViroMaterials.createMaterials({
      wolf: {
        diffuseTexture: require('./res/wolves/Wolves_BaseColor.png'),
      },
    })
    ViroAnimations.registerAnimations({
      bounceUp: {
        properties: {
          positionY: '+=0.1',
        },
        duration: 500,
      },

      bounceDown: {
        properties: {
          positionY: '-=0.1',
        },
        duration: 500,
      },

      bounceIt: [['bounceDown', 'bounceUp']],
      bounceRev: [['bounceUp', 'bounceDown']],
    })
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})

module.exports = HelloWorldSceneAR
