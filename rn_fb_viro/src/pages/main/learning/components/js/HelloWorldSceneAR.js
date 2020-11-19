'use strict'

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from '@akadrimer/react-viro'
import storage from '@react-native-firebase/storage'

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super()

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      imageUrl: 'imageUrl',
    }

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this)
    this.getUrlAndCM()
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroARPlaneSelector>
          <Viro3DObject
            source={require('./res/wolves/Wolves.obj')}
            materials={['wolf']}
            position={[-0.0, -0.0, -0.0]}
            animation={{ name: 'rotate', run: true, loop: true }}
            scale={[0.1, 0.1, 0.1]}
            type="OBJ"
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    )
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      })
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  async getUrlAndCM() {
    const url = await storage().ref('Wolves_BaseColor.png').getDownloadURL()

    ViroMaterials.createMaterials({
      wolf: {
        diffuseTexture: {
          uri: url,
        },
      },
    })

    ViroAnimations.registerAnimations({
      rotate: {
        properties: {
          rotateY: '+=90',
        },
        duration: 1000, //.25 seconds..
      },
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
