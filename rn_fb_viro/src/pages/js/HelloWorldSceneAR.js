'use strict'

import React, { Component, useState } from 'react'

import { StyleSheet } from 'react-native'

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroARSceneNavigator,
} from '@akadrimer/react-viro'

const HelloWorldSceneAR = (props) => {
  // Set initial state here
  const [text, setText] = useState('Initializing AR...')

  // bind 'this' to functions

  // ViroMaterials.createMaterials({
  //   wolf: {
  //     diffuseTexture: require('./res/wolves/Wolves_BaseColor.png'),
  //   },
  // });

  const _onInitialized = (state) => {
    // console.log(ViroConstants.TRACKING_NORMAL)

    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!')
    } else if (state == ViroConstants.TRACKING_NONE) {
      //    Handle loss of tracking
    }
  }

  const _onLoadStart = () => {
    console.log('OBJ loading has started')
  }
  const _onLoadEnd = () => {
    console.log('OBJ loading has finished')
  }
  const _onError = (event) => {
    console.log('OBJ loading failed with error: ' + event.nativeEvent.error)
  }

  return (
    <>
      {/* {console.log('Hi AR')} */}
      <ViroARScene onTrackingUpdated={_onInitialized}>
        <ViroText
          text={text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, -0.3, -1]}
          style={styles.helloWorldTextStyle}
          onLoadStart={_onLoadStart}
          onLoadEnd={_onLoadEnd}
          onError={_onError}
        />
        {/* {console.log('AR - 1')} */}
        {/* <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.2, 0.2, 0.1]}
          materials={['grid']}
          animation={{ name: 'rotate', run: true, loop: true }}
          onLoadStart={_onLoadStart}
          onLoadEnd={_onLoadEnd}
          onError={_onError}
        /> */}
        {/* {console.log('AR - 2')} */}
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
          onLoadStart={_onLoadStart}
          onLoadEnd={_onLoadEnd}
          onError={_onError}
        />
        {/* {console.log('AR - 3')} */}
        <ViroARPlaneSelector>
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[
              require('./res/emoji_smile/emoji_smile_diffuse.png'),
              require('./res/emoji_smile/emoji_smile_normal.png'),
              require('./res/emoji_smile/emoji_smile_specular.png'),
            ]}
            position={[0, 0.5, 0]}
            scale={[0.2, 0.2, 0.2]}
            type="VRX"
            onLoadStart={_onLoadStart}
            onLoadEnd={_onLoadEnd}
            onError={_onError}
          />
        </ViroARPlaneSelector>
        {/* <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => {}}>
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[
              require('./res/emoji_smile/emoji_smile_diffuse.png'),
              require('./res/emoji_smile/emoji_smile_normal.png'),
              require('./res/emoji_smile/emoji_smile_specular.png'),
            ]}
            position={[-0.1, 0.3, -0.3]}
            scale={[0.2, 0.2, 0.2]}
            type="VRX"
            onLoadStart={_onLoadStart}
            onLoadEnd={_onLoadEnd}
            onError={_onError}
          /> */}
        {/* <Viro3DObject
          source={require('./res/wolves/Wolves.obj')}
          resources={[
            require('./res/wolves/Wolves.mtl'),
            require('./res/wolves/Wolves_BaseColor.png'),
          ]}
          position={[-1, -1, -1]}
          scale={[0.1, 0.1, 0.1]}
          // materials={['wolf']}
          type="OBJ"
          // onLoadStart={this._onLoadStart}
          // onLoadEnd={this._onLoadEnd}
          // onError={this._onError}
        /> */}
        {/* </ViroNode> */}
      </ViroARScene>
      {/* {console.log('AR - 4')} */}
    </>
  )
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
})

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 250, //.25 seconds
  },
})

module.exports = HelloWorldSceneAR
