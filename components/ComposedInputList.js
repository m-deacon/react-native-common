/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import { FlatList } from 'react-native';
import { ComposedInput } from './ComposedInput';
import { View } from './basic/View';

class _ComposedInputList extends Component {
  render() {
    const { fields, design } = this.props;
    // const { _containerStyle } = styles;
    let tempFields = [
      {
        id: 'firstName',
        label: 'First name',
        type: 'password',
        validation: { required: 'true' },
        placeholder: 'e.g. John',
      },

      {
        id: 'lastName',
        label: 'Last name',
        type: 'string',
        validation: { required: 'true' },
        placeholder: 'e.g. Smith',
      },

      {
        id: 'idNumber',
        label: 'ID number',
        type: 'number',
        validation: { length: 8, required: 'true' },
        enum: null,
        helper: 'Valid South African ID number',
        placeholder: 'e.g. 4001023456789',
      },

      {
        id: 'age',
        label: 'Patient age',
        type: 'number',
        validation: { required: 'true', limits: [0, 150] },
        placeholder: 'e.g. 76',
      },
    ];

    return (
      <View bC={'grey2'} bR={7}>
        <FlatList
          // ref={c => {
          //   this._authLanding = c;
          // }}
          data={tempFields}
          renderItem={({ item, index }) => <ComposedInput data={item} />}
          // scrollEnabled={false}
          // keyboardShouldPersistTaps={'always'}
        />
      </View>
    );
  }
}

// _ComposedInputList.propTypes = {
//   label: PropTypes.string, // Text displayed on button
//   reference: PropTypes.func, // For animations
//   animation: PropTypes.string, // Animation type
//   disabled: PropTypes.bool, // Disable touchable component
//   onPress: PropTypes.func, // Function to execute on press
//   icon: PropTypes.string, // Icon displayed on left of button
//   size: PropTypes.string, // Size of button (small / default or '' / large)
//   type: PropTypes.string, // Type of button (text, contained, TODO: outlined)
//   backgroundColor: PropTypes.string, // Button color
//   textColor: PropTypes.string, // Text color
//   round: PropTypes.bool, // Rounded corners
//   buttonStyle: PropTypes.object, // override button style
//   containerStyle: PropTypes.object, // override container style
//   textStyle: PropTypes.object, // override text style
//   color: PropTypes.string, // main color
//   colors: PropTypes.object, // colors from context
//   design: PropTypes.object, // design from context
//   wide: PropTypes.bool,
// };

// _ComposedInputList.defaultProps = {
//   label: '',
//   reference: () => {},
//   animation: '',
//   disabled: false,
//   onPress: () => {},
//   icon: '',
//   size: '',
//   type: 'contained',
//   round: false,
//   buttonStyle: {},
//   containerStyle: {},
//   color: 'primary',
//   design: { roundButtons: false },
//   wide: false,
// };

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

const ComposedInputList = context(_ComposedInputList);

export { ComposedInputList };
