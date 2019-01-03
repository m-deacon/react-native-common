/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import context from '../context';
import { Text } from './Text';
import { View } from './View';
import { Spinner } from './Spinner';
import { safe } from '../../util/general';

class _Button extends Component {
  _buttonStyle() {
    const {
      type,
      color,
      size,
      design,
      round,
      buttonStyle,
      colors,
      wide,
      disabled,
    } = this.props;

    let backgroundColor = 'transparent';
    if (disabled && type !== 'text') {
      backgroundColor = colors['grey3'];
    } else if (type === 'contained') {
      backgroundColor = colors[color] ? colors[color] : color;
    }
    return {
      ...styles._buttonStyle,
      backgroundColor,
      height:
        size === 'large'
          ? 44
          : size === 'small' ? 30 : size === 'tiny' ? 26 : 36,
      borderRadius:
        design.buttons.rounded || round
          ? size === 'large'
            ? 22
            : size === 'small' ? 15 : size === 'tiny' ? 12 : 18
          : 2.5,
      shadowRadius: design.buttons.shadow,
      flex: wide ? 1 : 0,
      paddingHorizontal: design.buttons.rounded ? 16 : 8,
      ...buttonStyle,
    };
  }

  textStyle() {
    const { size, textStyle } = this.props;

    return {
      color: this.fontColor(),
      fontSize:
        size === 'large'
          ? 18
          : size === 'small' ? 12 : size === 'tiny' ? 10 : 14,
      ...textStyle,
    };
  }

  fontColor() {
    const { color, colors, type } = this.props;
    let fontColor = safe(colors, color, color);
    if (type === 'contained') {
      fontColor = colors[color + 'Contrast'];
    }
    return fontColor;
  }

  render() {
    const {
      onPress,
      label,
      reference,
      animation,
      disabled,
      size,
      icon,
      containerStyle,
      design,
      loading,
      wide,
    } = this.props;
    const { _containerStyle } = styles;
    const sizeInt =
      size === 'large' ? 26 : size === 'small' ? 18 : size === 'tiny' ? 14 : 22;
    return (
      <Animatable.View
        ref={reference}
        style={[
          _containerStyle,
          { elevation: design.buttons.elevation },
          containerStyle,
        ]}
        animation={animation}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          style={this._buttonStyle()}>
          <React.Fragment>
            <View fD={'row'} aI={'center'} jC={'center'}>
              {icon ? (
                <Icon name={icon} size={sizeInt} color={this.fontColor()} />
              ) : null}
              {!wide && loading ? (
                <Spinner color={this.fontColor()} />
              ) : (
                <Text t="bu" o={disabled ? 0.85 : 1} style={this.textStyle()}>
                  {label}
                </Text>
              )}
            </View>
            {loading && wide ? (
              <View pos={'absolute'} style={{ right: 4 }}>
                <Spinner color={this.fontColor()} />
              </View>
            ) : null}
          </React.Fragment>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

_Button.propTypes = {
  label: PropTypes.string, // Text displayed on button
  reference: PropTypes.func, // For animations
  animation: PropTypes.string, // Animation type
  disabled: PropTypes.bool, // Disable touchable component
  onPress: PropTypes.func, // Function to execute on press
  icon: PropTypes.string, // Icon displayed on left of button
  size: PropTypes.string, // Size of button (small / default or '' / large)
  type: PropTypes.string, // Type of button (text, contained, TODO: outlined)
  backgroundColor: PropTypes.string, // Button color
  textColor: PropTypes.string, // Text color
  round: PropTypes.bool, // Rounded corners
  buttonStyle: PropTypes.object, // override button style
  containerStyle: PropTypes.object, // override container style
  textStyle: PropTypes.object, // override text style
  color: PropTypes.string, // main color
  colors: PropTypes.object, // colors from context
  design: PropTypes.object, // design from context
  wide: PropTypes.bool,
  loading: PropTypes.bool,
};

_Button.defaultProps = {
  label: '',
  reference: () => {},
  animation: '',
  disabled: false,
  onPress: () => {},
  icon: '',
  size: '',
  type: 'contained',
  round: false,
  buttonStyle: {},
  containerStyle: {},
  color: 'primary',
  design: {},
  wide: false,
  loading: false,
};

const styles = {
  _containerStyle: {
    flexDirection: 'row',
    margin: 8,
  },
  _buttonStyle: {
    flexDirection: 'row',
    minWidth: 64,
    padding: 8,
    shadowColor: '#000',
    // shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Button = context(_Button);

export { Button };
