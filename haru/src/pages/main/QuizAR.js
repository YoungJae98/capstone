'use strict'

import React, { Component } from 'react'

import { StyleSheet, Image, View } from 'react-native'

import {
  ViroARScene,
  ViroARPlaneSelector,
  ViroMaterials,
  ViroAnimations,
  ViroConstants,
  Viro3DObject,
  ViroImage,
  ViroText,
} from '@akadrimer/react-viro'
import { BorderlessButton } from 'react-native-gesture-handler'

export default class QuizAR extends Component {
  constructor(props) {
    super()

    // Set initial state here
    this.state = {
      text: '불러오는 중입니다',
      object: <></>,
      isCorrect: false,
    }

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this)

    ViroMaterials.createMaterials({
      wolf: {
        diffuseTexture: require('objects3D/Wolves_BaseColor.png'),
      },
      bus: {
        diffuseTexture: require('objects3D/Bus.png'),
      },
      airplane: {
        diffuseTexture: require('objects3D/Airplane.png'),
      },
      bird: {
        diffuseTexture: require('objects3D/Bird.png'),
      },
      dog: {
        diffuseTexture: require('objects3D/Dog.png'),
      },
    })

    ViroAnimations.registerAnimations({
      bounceUp: {
        properties: {
          positionY: '+=0.02',
        },
        duration: 500, //.25 seconds..
      },

      bounceDown: {
        properties: {
          positionY: '-=0.02',
        },
        duration: 500, //.25 seconds..
      },

      bounceIt: [['bounceUp', 'bounceDown']],
      bounceRev: [['bounceDown', 'bounceUp']],
    })
  }

  render() {
    return (
      <>
        <ViroARScene onTrackingUpdated={this._onInitialized}>
          <Viro3DObject
            name="dog"
            source={require('objects3D/Dog.obj')}
            materials={['dog']}
            scale={[0.01, 0.01, 0.01]}
            position={[-0.4, -0.5, -1.5]}
            type="OBJ"
            animation={{ name: 'bounceRev', run: true, loop: true }}
            // dragType="FixedToWorld"
            // onDrag={() => {}}
            onClick={() => {
              this._isCorrect('개', this.props.sceneNavigator.viroAppProps.text)
              setTimeout(() => {
                this.setState({
                  object: <></>,
                })
                if (this.state.isCorrect) {
                  this.props.sceneNavigator.viroAppProps.func('비행기')
                }
              }, 5000)
            }}
          />

          {/* {console.log('the text is:')}
          {console.log(this.props.sceneNavigator.viroAppProps)} */}

          <Viro3DObject
            name="wolf"
            source={require('objects3D/Wolves.obj')}
            materials={['wolf']}
            animation={{ name: 'bounceIt', run: true, loop: true }}
            position={[-0.0, -0.5, -1.5]}
            scale={[0.08, 0.08, 0.08]}
            type="OBJ"
            onClick={() => {
              this._isCorrect('늑대', this.props.sceneNavigator.viroAppProps.text)
              setTimeout(() => {
                this.setState({
                  object: <></>,
                })
                if (this.state.isCorrect) {
                  this.props.sceneNavigator.viroAppProps.func('개')
                }
              }, 5000)
            }}
          />
          <Viro3DObject
            name="Airplane"
            source={require('objects3D/Airplane.obj')}
            materials={['airplane']}
            position={[0.6, -0.5, -1.5]}
            scale={[0.0005, 0.0005, 0.0005]}
            type="OBJ"
            animation={{ name: 'bounceRev', run: true, loop: true }}
            // dragType="FixedToWorld"
            // onDrag={() => {}}
            onClick={() => {
              this._isCorrect('비행기', this.props.sceneNavigator.viroAppProps.text)
              setTimeout(() => {
                this.setState({
                  object: <></>,
                })
                if (this.state.isCorrect) {
                  this.props.sceneNavigator.viroAppProps.func('늑대')
                }
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
  _isCorrect(word, text) {
    if (word === text) {
      this.setState({
        object: (
          <ViroImage height={0.8} width={0.8} position={[0, -0.0, -1.0]} source={require('images/correct.png')} />
        ),
        isCorrect: true,
      })
    } else {
      this.setState({
        object: <ViroImage height={0.8} width={0.8} position={[0, -0.0, -1.0]} source={require('images/wrong.png')} />,
        isCorrect: false,
      })
    }
  }
}

var styles = StyleSheet.create({
  Quizstyle: {
    fontFamily: 'NotoSansCJK',
    fontSize: 20,
    color: '#000000',
    textAlignVertical: 'top',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

module.exports = QuizAR
