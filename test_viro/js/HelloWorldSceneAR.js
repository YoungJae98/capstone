'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroARPlaneSelector,
  ViroMaterials,
  ViroAnimations,
  ViroConstants,
  Viro3DObject,
} from '@akadrimer/react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);

    ViroMaterials.createMaterials({
      wolf: {
        diffuseTexture: require('./res/wolves/Wolves_BaseColor.png'),
      },
    });

    ViroAnimations.registerAnimations({
      rotate: {
        properties: {
          rotateY: '+=90',
        },
        duration: 1000, //.25 seconds..
      },
    });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARPlaneSelector>
          <Viro3DObject
            source={require('./res/wolves/Wolves.obj')}
            materials={['wolf']}
            position={[-0.0, -0.0, -0.0]}
            animation={{name: 'rotate', run: true, loop: true}}
            scale={[0.1, 0.1, 0.1]}
            type="OBJ"
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
