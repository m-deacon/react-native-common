import React, { Component } from 'react';
import { TextField } from '../components/react-native-material-textfield';
import context from './context';
import { View } from './basic/View';

function composed(TextField) {
  return class extends React.Component {
    state = { secureTextEntry: false };

    componentDidMount() {
      const type = this.props.data.type;
      if (type === 'password') {
        this.onPressPasswordVisibility();
      }
    }
    // actionTwo(item, index) {
    //   const { cardListOptions, type } = this.props;
    //   let text = '';
    //   let onPress = () => {};
    //   let disabled = false;
    //   if (cardListOptions.showDetail) {
    //     switch (type) {
    //       case 'wallet':
    //         break;
    //       default:
    //         text = cardListOptions.showDetail ? 'CANCEL' : '';
    //         onPress = () => this.props.hideDetail(type);
    //     }
    //   } else {
    //     switch (type) {
    //       case 'mobile':
    //       case 'email':
    //         text = item.verified ? 'Verified' : 'VERIFY';
    //         onPress = () => this.props.resendVerification(type, index);
    //         disabled = item.verified ? true : false;
    //         break;
    //       case 'wallet':
    //         text = 'RECEIVE';
    //         onPress = () =>
    //           this.props.navigation.navigate('Receive', {
    //             currency: item,
    //           });
    //         break;
    //       default:
    //     }
    //   }
    //   return {
    //     text,
    //     onPress,
    //     disabled,
    //   };
    // }

    // onPressCard(index) {
    //   const { type, cardListOptions } = this.props;
    //   if (!cardListOptions.showDetail) {
    //     switch (type) {
    //       case 'mobile':
    //       case 'email':
    //         break;
    //       default:
    //         this.props.showDetail(type, index);
    //     }
    //   }
    // }

    // renderPasswordAccessory() {
    //   const { secureTextEntry } = this.state;

    //   const name = secureTextEntry ? 'visibility' : 'visibility-off';

    //   return (
    //     <MaterialIcon
    //       size={24}
    //       name={name}
    //       // color={TextField.defaultProps.baseColor}
    //       // onPress={this.onAccessoryPress}
    //       suppressHighlighting
    //     />
    //   );
    // }

    onPressPasswordVisibility() {
      this.setState(({ secureTextEntry }) => ({
        secureTextEntry: !secureTextEntry,
      }));
    }

    accessoryRight(type) {
      let name = '';
      let onPress = () => {};
      if (type === 'password') {
        const { secureTextEntry } = this.state;
        name = secureTextEntry ? 'md-eye' : 'md-eye-off';
        onPress = () => this.onPressPasswordVisibility();
      }
      return {
        name,
        onPress,
      };
    }

    keyboardType() {
      const type = this.props.data.type;
      let keyboardType = 'default';
      switch (type) {
        case 'email':
          keyboardType = 'email-address';
          break;
        case 'number':
          keyboardType = 'number-pad';
          break;
      }
      return keyboardType;
    }

    render() {
      const { data, onChangeText } = this.props;
      let { secureTextEntry } = this.state;
      // if (isFocused) {

      const { id, label, placeholder, type, validation, helper, secure } = data;

      return (
        <View
          bC={'grey1'}
          m={0.5}
          style={{
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            overflow: 'hidden',
          }}>
          <TextField
            {...this.props}
            label={label}
            placeholder={placeholder}
            title={helper}
            keyboardType={this.keyboardType()}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            // maxLength={30}
            // characterRestriction={20}
            // renderAccessory={this.renderPasswordAccessory}
            accessoryRight={this.accessoryRight(type)}
          />
        </View>
      );
    }
  };
}

const ComposedInput = context(composed(TextField));

export { ComposedInput };
