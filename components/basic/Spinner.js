// import lib for making component
import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import context from '../context';

// make component
const _Spinner = ({
  size,
  type,
  colors,
  color,
  backgroundColor,
  theme,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles._containerStyle,
        {
          backgroundColor: colors[backgroundColor]
            ? colors[backgroundColor]
            : 'transparent',
        },
        containerStyle,
      ]}>
      {/* {theme[type + 'Spinner'] === 'rehive' ? (
        <Image
          style={{
            height: size === 'large' ? 150 : 50,
            width: size === 'large' ? 150 : 50,
          }}
          source={require('./../../../assets/icons/rehive_spinner.gif')}
        />
      ) : ( */}
      <ActivityIndicator
        size={size || 'small'}
        color={colors[color ? color : 'primary']}
      />
      {/* )} */}
    </View>
  );
};

const styles = {
  _containerStyle: {
    // flex: 1,
    justifyContent: 'center',
    padding: 8,
    alignItems: 'center',
    width: '100%',
  },
};

const Spinner = context(_Spinner);

export { Spinner };
