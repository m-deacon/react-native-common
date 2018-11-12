/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import { FlatList } from 'react-native';
import { View } from './basic/View';
import { safe } from '../util/general';
import { Checkbox } from './basic/Checkbox';
import { TextField } from '../../react-native-material-textfield';

class _ComposedInputList extends Component {
  onSubmitEditing(index) {
    const { fields, onSubmitForm } = this.props;
    try {
      if (fields && fields.length > index + 1) {
        this[fields[index + 1].id].focus();
      } else {
        onSubmitForm();
      }
    } catch (e) {
      console.log('onSubmitEditing', e);
    }
  }
  returnKeyType(index) {
    const { fields } = this.props;
    if (fields && fields.length > index + 1) {
      return 'next';
    } else {
      return 'done';
    }
  }

  renderInput(item, index) {
    const { onChangeText, colors } = this.props;
    const type = safe(item, 'type', '');
    // console.log('item', item);

    switch (type) {
      case 'checkbox':
        return (
          <Checkbox
            link={item.link}
            description={item.description}
            title={item.title}
            toggleCheck={value => onChangeText({ prop: item.id, value })}
            value={item.value}
            // error={authError}
          />
        );
      default:
        return (
          <TextField
            ref={input => {
              this[item.id] = input;
            }}
            label={item.label}
            placeholder={item.placeholder}
            title={item.helper}
            value={item.value}
            type={item.type}
            onChangeText={value => onChangeText({ prop: item.id, value })}
            containerBackgroundColor={colors.grey1}
            tintColor={colors.primary}
            onSubmitEditing={() => this.onSubmitEditing(index)}
            returnKeyType={this.returnKeyType(index)}
          />
        );
    }
  }

  render() {
    const { fields } = this.props;
    console.log('fields', fields);
    // const { _containerStyle } = styles;

    return (
      <View bC={'grey2'} bR={7}>
        <FlatList
          // ref={c => {
          //   this._authLanding = c;
          // }}

          data={fields}
          renderItem={({ item, index }) => this.renderInput(item, index)}
          keyExtractor={item => safe(item, 'id', '')}
          // scrollEnabled={false}
          // keyboardShouldPersistTaps={'always'}
        />
      </View>
    );
  }
}

const ComposedInputList = context(_ComposedInputList);

export { ComposedInputList };
