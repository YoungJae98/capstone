import React from 'react'
import { Text, View, ImageBackground } from 'react-native'
import { color, size } from 'common'

export default function LearningWithoutCards() {
  return (
    <ImageBackground
      source={require('images/learningCamera.png')}
      style={{
        width: size.screenWidth,
        height: size.screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: color.background.mainLight,
          width: 200 * size.widthRate,
          height: 100 * size.widthRate,
          borderRadius: 24 * size.widthRate,
          shadowOpacity: 0.7,
          shadowColor: 'rgb(100, 100, 100)',
          shadowRadius: 10 * size.widthRate,
          shadowOffset: {
            width: 3 * size.widthRate,
            height: 5 * size.widthRate,
          },
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 150 * size.heightRate,
        }}>
        <Text
          style={{
            fontFamily: 'BMJUA',
            fontSize: size.normalizeFontSize(48),
            color: color.text.primary1,
            fontWeight: 'bold',
            textAlign: 'center',
            textShadowColor: '#333',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: -2 * size.widthRate,
          }}>
          바나나
        </Text>
      </View>
    </ImageBackground>
  )
}
