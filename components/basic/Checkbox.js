import React, { Component } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import context from '../context';
import { Text } from './Text';

class _Checkbox extends Component {
  render() {
    const {
      toggleCheck,
      value,
      title,
      link,
      description,
      error,
      colors,
    } = this.props;
    const {
      textStyle,
      textStyleRequired,
      viewStyleContainer,
      viewStyleContainerCheckbox,
      textStyleLink,
      viewStyleTextLink,
      viewStyleText,
      viewStyleCheckbox,
    } = styles;
    return (
      <View style={[viewStyleContainer, { backgroundColor: colors.grey1 }]}>
        <View style={viewStyleContainerCheckbox}>
          <View style={viewStyleCheckbox}>
            <MaterialIcons
              onPress={() => toggleCheck(!value)} //value ? {this.setState({ value })} : 'square-outline'}
              name={value ? 'check-box' : 'check-box-outline-blank'}
              size={32}
              color={value ? colors.primary : 'lightgrey'}
            />
          </View>
          {title ? (
            <View style={viewStyleText}>
              <Text t="s1">{title}</Text>
              {description ? (
                link ? (
                  <TouchableOpacity
                    onPress={() => WebBrowser.openBrowserAsync(link)}>
                    <View style={viewStyleTextLink}>
                      <Text t="s2" c="blue" tA="right" o={0.7}>
                        {description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Text t="s2" c="blue" tA="right">
                    {description}
                  </Text>
                )
              ) : null}
            </View>
          ) : null}
        </View>
        {error ? (
          <View>
            <Text style={textStyleRequired}>{error}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // minHeight: 72,
    margin: 8,
    padding: 8,
    borderRadius: 5,
    // width: '100%',
    // overflow: 'hidden',
  },
  viewStyleContainerCheckbox: {
    // flex: 1,
    flexDirection: 'row',
    // minHeight: 72,
  },
  viewStyleCheckbox: {
    margin: 4,
    justifyContent: 'center',
    // marginVertical: 12,
  },
  viewStyleText: {
    // flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 16,
    justifyContent: 'center',
    // flexWrap: 'wrap',
  },
  viewStyleTextLink: {
    // flexDirection: 'column',
    flexWrap: 'wrap',
    marginRight: 16,
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    // paddingBottom: 2,
  },
  textStyleLink: {
    color: 'blue',
    fontSize: 12,
    paddingTop: 2,
    // flex: 1,
    marginRight: 8,
  },
  textStyleRequired: {
    color: 'red',
    padding: 8,
    paddingTop: 4,
    // paddingRight: 5,
    // minHeight: 72,
  },
};

// make component available to other parts of app

const Checkbox = context(_Checkbox);

export { Checkbox };
