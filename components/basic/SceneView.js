import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { BlurView } from 'expo';
import { Button } from './Button';
import { View } from './View';
import { Text } from './Text';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
class SceneView extends React.Component {
  state = {
    intensity: new Animated.Value(0),
  };

  // componentDidMount() {
  //   this._animateBlurOn();
  // }

  start() {
    this._animateBlurOn();
  }

  _animateBlurOn = () => {
    let { intensity } = this.state;
    Animated.timing(intensity, { duration: 500, toValue: 95 }).start(() => {
      this._animateOn;
    });
  };

  _animateBlurOff = () => {
    let { intensity } = this.state;
    Animated.timing(intensity, { duration: 200, toValue: 0 }).start(() => {
      this._animateOut;
    });
  };

  // async _onClose () {
  //   this._animateOut();
  //   await
  // }

  render() {
    const { children, text, button, scenes } = this.props;
    const scene = scenes[0];
    return (
      <View style={StyleSheet.absoluteFillObject}>
        {/* <Image style={{ width: 180, height: 180 }} source={{ uri }} /> */}
        <View
          pos={'absolute'}
          style={{ bottom: 0, zIndex: 10 }}
          p={2}
          w={'100%'}
          // o={this.state.intensity / 100}
          //
        >
          <View bR={4} bC={'grey1'} p={1}>
            <Text t="h4" tA={'center'} p={1}>
              {scene.title}
            </Text>
            {/* <View>{children}</View> */}
            <Text tA={'center'}>{scene.description}</Text>
          </View>
          <Button
            label={scene.buttonLabel}
            wide
            onPress={() => {
              // this._onClose();

              scene.onPress();
            }}
            animation={'fadeInUp'}
          />
        </View>
        <AnimatedBlurView
          tint="default"
          intensity={this.state.intensity}
          style={[StyleSheet.absoluteFill, { zIndex: 8 }]}
        />
      </View>
    );
  }
}

export { SceneView };
