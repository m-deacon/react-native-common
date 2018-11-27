/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import { SectionList } from 'react-native';
import { View } from './basic/View';
import { safe } from '../util/general';
import { Checkbox } from './basic/Checkbox';
import { TextField } from '../../react-native-material-textfield';

import Modal from 'react-native-modal';
import { Text } from './basic/Text';
import { ListItem, ListSeparator } from '../../../app/components/common';

class _ComposedInputDropdown extends Component {
  state = { focused: false };
  componentDidUpdate() {
    const { focused } = this.state;
    const isFocused = this.textField ? this.textField.isFocused() : false;
    if (focused !== isFocused) {
      this.setState({ focused: isFocused });
    }
  }

  focus() {
    try {
      this.textField.focus();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { sections, colors } = this.props;
    const { focused } = this.state;

    return (
      <View>
        <TextField
          {...this.props}
          noMargin
          ref={input => {
            this.textField = input;
          }}
        />

        {focused &&
          sections &&
          sections.length > 0 && (
            <View>
              <SectionList
                keyboardShouldPersistTaps="always"
                style={{
                  backgroundColor: colors.grey1,
                  maxHeight: 170,
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
                keyExtractor={item => (item.id ? item.id.toString() : '')}
                ItemSeparatorComponent={ListSeparator}
                showsVerticalScrollIndicator
              />
              {/* <View
                pos={'absolute'}
                style={{ bottom: 12 }}
                w={'100%'}
                h={4}
                o={0.2}
                bC={'grey1'}
              />
              <View
                pos={'absolute'}
                style={{ bottom: 8 }}
                w={'100%'}
                h={4}
                o={0.4}
                bC={'grey1'}
              />
              <View
                pos={'absolute'}
                style={{ bottom: 4 }}
                w={'100%'}
                h={4}
                o={0.65}
                bC={'grey1'}
              />
              <View
                pos={'absolute'}
                style={{ bottom: 0 }}
                w={'100%'}
                h={4}
                o={0.9}
                bC={'grey1'}
              /> */}
            </View>
          )}
      </View>
    );
  }
}

const ComposedInputDropdown = context(_ComposedInputDropdown);

export { ComposedInputDropdown };
