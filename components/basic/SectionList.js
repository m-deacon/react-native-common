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
import { ListItem, ListSeparator } from '../../../../app/components/common';

class _SectionList extends Component {
  _containerStyle() {
    const { containerStyle, colors } = this.props;

    return {
      ...styles._buttonStyle,
      backgroundColor: colors.grey1,
      ...containerStyle,
    };
  }
  _contentContainerStyle() {
    const { contentContainerStyle, colors } = this.props;

    return {
      ...styles._contentContainerStyle,
      backgroundColor: colors.grey1,
      ...contentContainerStyle,
    };
  }

  textStyle() {
    const { size, textStyle } = this.props;

    return {
      color: this.fontColor(),
      fontSize: size === 'large' ? 18 : size === 'small' ? 12 : 14,
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
    const { colors, sections } = this.props;
    const { _containerStyle } = styles;
    return (
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
              section.listItemOnPress ? section.listItemOnPress(item) : {}
            }
            title={section.listItemTitle ? section.listItemTitle(item) : item}
            subtitle={
              section.listItemSubtitle ? section.listItemSubtitle(item) : ''
            }
            image={
              section.listItemIcon
                ? section.listItemIcon(item)
                : item.image ? item.image : null
            }
          />
        )}
        renderSectionHeader={({ section }) => (
          <React.Fragment
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
          </React.Fragment>
        )}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={ListSeparator}
      />
    );
  }
}

_SectionList.propTypes = {
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

_SectionList.defaultProps = {
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
  design: { roundButtons: false },
  wide: false,
  loading: false,
};

const styles = {
  _containerStyle: {
    maxHeight: 240,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
    paddingBottom: 4,
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
  _contentContainerStyle: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },
};

const SectionList = context(_SectionList);

export { SectionList };
