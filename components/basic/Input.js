import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Platform,
  SectionList,
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
// import CountryPicker from 'react-native-country-picker-modal';
// import { ListItem, ListSeparator } from './ListItem';
import context from '../context';
// import { TextInputMask } from 'react-native-masked-text';

class _Input extends Component {
  state = {
    focused: false,
    iconNameVisibility: 'visibility',
    secureTextEntry: this.props.type === 'password' ? true : false,
    cca2: 'US',
    countryCode: '+1',
  };

  _OnBlur() {
    this.setState({
      focused: false,
    });
    this.props.onBlur();
  }

  _OnFocus() {
    this.setState({
      focused: true,
    });
  }

  togglePasswordVisibility = () => {
    if (this.state.secureTextEntry) {
      this.setState({
        iconNameVisibility: 'visibility-off',
        secureTextEntry: false,
      });
    } else {
      this.setState({
        iconNameVisibility: 'visibility',
        secureTextEntry: true,
      });
    }
  };

  renderInput() {
    const {
      label,
      placeholder,
      value,
      onChangeText,
      reference,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      autoCapitalize,
      autoFocus,
      type,
      countryCode,
      changeCountryCode,
      inputError,
      autoCorrect,
      multiline,
      colors,
      precision,
      unit,
    } = this.props;

    const {
      viewStyleInput,
      textStyleInput,
      viewStyleCountry,
      textStyleCode,
    } = styles;

    const { focused, secureTextEntry, cca2 } = this.state;

    // if (type === 'money') {
    //   return (
    //     <TextInputMask
    //       type={'money'}
    //       options={{
    //         precision: precision,
    //         unit: unit,
    //       }}
    //       style={textStyleInput}
    //       onFocus={() => this._OnFocus()}
    //       onBlur={() => this._OnBlur()}
    //       underlineColorAndroid="transparent"
    //       autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
    //       autoCorrect={autoCorrect ? autoCorrect : false}
    //       placeholder={focused ? placeholder : label}
    //       value={value ? value : '0'}
    //       onChangeText={onChangeText}
    //       refInput={reference}
    //       selectTextOnFocus
    //       secureTextEntry={secureTextEntry}
    //       keyboardType={keyboardType}
    //       returnKeyType={returnKeyType}
    //       onSubmitEditing={onSubmitEditing}
    //       autoFocus={autoFocus}
    //       blurOnSubmit={false}
    //     />
    //   );
    // }

    return (
      <View
        style={[viewStyleInput, { paddingBottom: focused || value ? 8 : 0 }]}>
        {/* {type === 'mobile' ? (
          <View style={viewStyleCountry}>
            <CountryPicker
              onChange={value => {
                this.setState({ cca2: value.cca2 });
                changeCountryCode(value.callingCode);
              }}
              closeable
              filterable
              cca2={cca2}
              translation="eng"
              styles={{ width: 24 }}
            />
          </View>
        ) : null} */}
        <TextInput
          style={textStyleInput}
          onFocus={() => this._OnFocus()}
          onBlur={() => this._OnBlur()}
          underlineColorAndroid="transparent"
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          autoCorrect={autoCorrect ? autoCorrect : false}
          placeholder={focused ? placeholder : label}
          value={value}
          onChangeText={onChangeText}
          ref={reference}
          selectTextOnFocus
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          blurOnSubmit={false}
          multiline={multiline}
        />
      </View>
    );
  }

  viewStyleContainer() {
    const { focused } = this.state;
    if (focused) {
      if (Platform.OS === 'ios') {
        return {
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOpacity: 0.15,
          shadowRadius: 3,
          shadowOffset: {
            width: 1,
            height: 2,
          },
        };
      } else {
        return { elevation: 10 };
      }
      //
    }
    return { elevation: 1 };
  }

  render() {
    const {
      label,
      value,
      required,
      inputError,
      helperText,
      data,
      loadingData,
      title,
      subtitle,
      type,
      onPressListItem,
      colors,
      checked,
      toggleCheck,
      icon,
      sections,
      scannable,
      prop,
    } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      viewStyleHelper,
      textStyleLabel,
      textStyleFooter,
      viewStyleContent,
      viewStyleCheckbox,
      iconStyleVisibility,
    } = styles;

    const { borderColor, focused, iconNameVisibility } = this.state;
    try {
      return (
        <View style={this.viewStyleContainer()}>
          <View
            style={[
              viewStyleContainer,
              {
                backgroundColor: colors.primaryContrast,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                borderColor: inputError
                  ? colors.error
                  : focused ? colors.focus : 'lightgrey',
                borderBottomWidth: inputError || focused ? 2 : 2,
                justifyContent: 'space-around',
              }}>
              {toggleCheck ? (
                <View style={viewStyleCheckbox}>
                  <MaterialIcons
                    onPress={toggleCheck} //value ? {this.setState({ value })} : 'square-outline'}
                    name={checked ? 'check-box' : 'check-box-outline-blank'}
                    size={32}
                    color={checked ? colors.primary : 'lightgrey'}
                  />
                </View>
              ) : null}
              <View style={[viewStyleContent, { flex: 1 }]}>
                {focused || value ? (
                  <View style={viewStyleLabel}>
                    <Text
                      style={[
                        textStyleLabel,
                        {
                          color: inputError
                            ? colors.error
                            : focused ? colors.focus : 'rgba(0,0,0,0.6)',
                        },
                      ]}>
                      {label}
                      {required ? ' *' : ''}
                    </Text>
                  </View>
                ) : null}
                {this.renderInput()}
              </View>

              {type === 'password' ? (
                <View style={{ justifyContent: 'center' }}>
                  <MaterialIcons
                    style={[
                      iconStyleVisibility,
                      {
                        color: inputError
                          ? colors.error
                          : focused ? colors.focus : 'rgba(0,0,0,0.6)',
                      },
                    ]}
                    name={iconNameVisibility}
                    size={24}
                    color={borderColor}
                    onPress={this.togglePasswordVisibility}
                  />
                </View>
              ) : null}

              {scannable ? (
                <View style={{ justifyContent: 'center' }}>
                  <MaterialIcons
                    style={[
                      iconStyleVisibility,
                      {
                        color: focused ? colors.focus : 'rgba(0,0,0,0.6)',
                      },
                    ]}
                    name={'camera'}
                    size={24}
                    color={focused ? colors.focus : 'rgba(0,0,0,0.6)'}
                    onPress={() =>
                      this.props.navigation.navigate('InputScanner', { prop })
                    }
                  />
                </View>
              ) : null}
            </View>

            {inputError || helperText ? (
              <View style={viewStyleHelper}>
                <Text
                  style={[
                    textStyleFooter,
                    {
                      color: inputError ? colors.error : colors.primaryContrast,
                    },
                  ]}>
                  {inputError ? inputError : helperText}
                </Text>
              </View>
            ) : null}

            {/* {data.length > 0 && focused ? (
              <FlatList
                keyboardShouldPersistTaps="always"
                style={{
                  backgroundColor: colors.primaryContrast,
                  maxHeight: 180,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  overflow: 'hidden',
                }}
                contentContainerStyle={{
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  overflow: 'hidden',
                }}
                data={data}
                renderItem={({ item, section }) => (
                  <ListItem
                    onPress={() => onPressListItem(item)}
                    title={section.title ? section.title(item) : item}
                    subtitle={section.subtitle ? section.subtitle(item) : ''}
                    image={
                      section.icon
                        ? section.icon(item)
                        : item.image ? item.image : null
                    }
                  />
                )}
                keyExtractor={item => (item.id ? item.id.toString() : item)}
                ItemSeparatorComponent={ListSeparator}
              />
            ) : null} */}
            {/* {sections.length > 0 && focused ? (
              <SectionList
                keyboardShouldPersistTaps="always"
                style={{
                  backgroundColor: colors.grey1,
                  maxHeight: 240,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  overflow: 'hidden',
                  paddingBottom: 4,
                }}
                contentContainerStyle={{
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  overflow: 'hidden',
                }}
                sections={sections}
                renderItem={({ item, section }) => (
                  // <View style={{ height: 150 }} />
                  <ListItem
                    onPress={() =>
                      section.listItemOnPress
                        ? section.listItemOnPress(item)
                        : {}
                    }
                    title={
                      section.listItemTitle ? section.listItemTitle(item) : item
                    }
                    subtitle={
                      section.listItemSubtitle
                        ? section.listItemSubtitle(item)
                        : ''
                    }
                    image={
                      section.listItemIcon
                        ? section.listItemIcon(item)
                        : item.image ? item.image : null
                    }
                  />
                )}
                renderSectionHeader={({ section }) => (
                  <View
                    style={{
                      // paddingRight: 8,
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.font,
                      // padding: 4,
                      paddingTop: 8,
                      paddingLeft: 16,
                      backgroundColor: colors.grey1,
                      borderBottomEndRadius: 8,
                      borderBottomStartRadius: 8,
                    }}>
                    <Text
                      style={{
                        // backgroundColor: '#64B5F6',
                        fontSize: 10,
                        padding: 5,
                        color: colors.font,
                        fontWeight: 'bold',
                      }}>
                      {section.title}{' '}
                    </Text>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={ListSeparator}
              />
            ) : null} */}
          </View>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  }

  // _renderSeparator = () => (

  // );
}

_Input.propTypes = {
  label: PropTypes.string, // Text displayed on button
  reference: PropTypes.func, // For animations
  animation: PropTypes.string, // Animation type
  disabled: PropTypes.bool, // Disable touchable component
  onPress: PropTypes.func, // Function to execute on press
  icon: PropTypes.string, // Icon displayed on left of button
  size: PropTypes.string, // Size of button (small / default or '' / large)
  type: PropTypes.string, // Type of button (text, contained, TODO: outlined)
  colors: PropTypes.object, // Button color
  onBlur: PropTypes.func, // Function to execute on press
  sections: PropTypes.array,
  data: PropTypes.array,
  scannable: PropTypes.bool,
};

_Input.defaultProps = {
  label: '',
  reference: () => {},
  animation: '',
  disabled: false,
  onPress: () => {},
  icon: '',
  size: '',
  type: 'contained',
  onBlur: () => {},
  sections: [],
  data: [],
  scannable: false,
};

const styles = {
  viewStyleContainer: {
    minHeight: 60,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    overflow: 'hidden',
    margin: 8,
  },
  viewStyleContent: {
    paddingHorizontal: 12,
    minHeight: 60,
    justifyContent: 'center',
  },
  viewStylePopUp: {
    elevation: 20,
    backgroundColor: 'orange',
    height: 200,
  },
  viewStyleLabel: {
    height: 20,
  },
  viewStyleCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStyleInput: {
    flexDirection: 'row',
  },
  viewStyleHelper: {
    minHeight: 28,
  },
  textStyleLabel: {
    fontSize: 12,
    paddingTop: 6,
  },
  textStyleInput: {
    paddingTop: 4,
    fontWeight: 'normal',
    flex: 1,
    fontSize: 16,
    color: 'rgba(0,0,0,0.87)',
  },
  textStyleCode: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.87)',
    textAlign: 'right',
    fontWeight: 'normal',
    alignItems: 'center',
  },
  textStyleFooter: {
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  iconStyleVisibility: {
    // width: 24,
    // height: 24,
    right: 12,
    // position: 'absolute',
  },
  viewStyleCheckbox: {
    padding: 4,
    paddingRight: 0,
    paddingLeft: 8,
    justifyContent: 'center',
    // marginVertical: 12,
  },
};

const Input = context(_Input);

export { Input };

/* PHONE */
/* 
while active store country code in state - this can be fed back to country selector
if country text input = disabled and the value = country name
splice / replace country code when changing country
does reverse searching working? If type +27 = ZA / +31 =
google lib for text mask

*/
