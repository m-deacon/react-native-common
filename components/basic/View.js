/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import {
  View as _view,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ViewPropTypes,
  ScrollView,
  Platform,
} from 'react-native';
import { Constants } from 'expo';
import context from '../context';
import PropTypes from 'prop-types';

class _View extends Component {
  renderScrollView() {
    return (
      <ScrollView
        // style={{ flex: 1 }}
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps="always">
        {this.props.children}
      </ScrollView>
    );
  }

  viewStyle() {
    const {
      f,
      bC,
      m,
      mv,
      mh,
      p,
      pv,
      ph,
      o,
      h,
      w,
      fD,
      aI,
      jC,
      bR,
      pos,
      screen,
      scrollView,
    } = this.props;
    const { colors, rem, style } = this.props;
    // console.log(colors);

    return [
      screen ? { flex: 1, backgroundColor: colors.surface } : {},
      {
        margin: m * rem,
        padding: p * rem,
        opacity: o,
        height: h,
        width: w,
      },
      scrollView ? { flex: 1 } : {},
      bC ? { backgroundColor: colors[bC] ? colors[bC] : bC } : {},
      bR ? { borderRadius: bR, overflow: 'hidden' } : {},
      fD ? { flexDirection: fD } : {},
      aI ? { alignItems: aI } : {},
      jC ? { justifyContent: jC } : {},
      mv ? { marginVertical: mv * rem } : {},
      mh ? { marginHorizontal: mh * rem } : {},
      pv ? { paddingVertical: pv * rem } : {},
      ph ? { paddingHorizontal: ph * rem } : {},
      f ? { flex: f } : {},
      pos ? { position: pos } : {},
      style,
    ];
  }

  render() {
    const {
      keyboardAvoiding,
      scrollView,
      behavior,
      screen,
      children,
      header,
      colors,
      bC,
      hC,
      design,
    } = this.props;

    const viewProps = {
      ...(behavior ? { behavior } : { behavior: 'padding' }),
      // : Platform.OS !== 'ios' ? { behavior: 'padding' } : {}),
    };

    if (keyboardAvoiding) {
      return (
        <KeyboardAvoidingView
          {...viewProps}
          keyboardShouldPersistTaps={'always'}
          style={this.viewStyle()}
          keyboardVerticalOffset={behavior === 'position' ? -90 : 0}
          //
        >
          {scrollView ? this.renderScrollView() : this.props.children}
        </KeyboardAvoidingView>
      );
    }
    return (
      <_view style={this.viewStyle()}>
        {screen && !header ? (
          <_view
            style={{
              height: Constants.statusBarHeight,
              backgroundColor: hC
                ? colors[design.surface ? 'surface' : hC]
                : bC ? colors[bC] : 'transparent',
              zIndex: 5,
            }}>
            <_view
              style={{
                height: Constants.statusBarHeight,
                backgroundColor: 'black',
                opacity: 0.13,
                zIndex: 6,
              }}
            />
          </_view>
        ) : null}
        {/* {fade ? (
          <_view>
            <_view
              style={[
                styles.fadeStyle,
                {
                  top: 0,
                  backgroundColor: colors.surface,
                  opacity: 0.75,
                },
              ]}
            />
            <_view
              style={[
                styles.fadeStyle,
                {
                  top: 2,
                  backgroundColor: colors.surface,
                  opacity: 0.5,
                },
              ]}
            />
            <_view
              style={[
                styles.fadeStyle,
                {
                  top: 4,
                  backgroundColor: colors.surface,
                  opacity: 0.3,
                },
              ]}
            />
            <_view
              style={[
                styles.fadeStyle,
                {
                  top: 6,
                  backgroundColor: colors.surface,
                  opacity: 0.15,
                },
              ]}
            />
          </_view>
        ) : null} */}
        {scrollView ? this.renderScrollView() : this.props.children}
      </_view>
    );
  }
}

_View.propTypes = {
  keyboardAvoiding: PropTypes.bool,
  scrollView: PropTypes.bool,

  behavior: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired, // string passed to RN <Text />
  f: PropTypes.number, // flex
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // height
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // width
  m: PropTypes.number, // margin
  mv: PropTypes.number, // margin vertical
  mh: PropTypes.number, // margin horizontal
  p: PropTypes.number, // padding
  pv: PropTypes.number, // padding vertical
  ph: PropTypes.number, // padding horizontal
  o: PropTypes.number, // opacity
  bC: PropTypes.string, // backgroundColor
  hC: PropTypes.string, // headerColor
  bR: PropTypes.number, // borderRadius
  colors: PropTypes.object, // colors object from context
  rem: PropTypes.number, // rem value
  fD: PropTypes.string, // flexDirection
  aI: PropTypes.string, // alignItems
  jC: PropTypes.string, // justifyContent
  style: PropTypes.object, // TODO: ViewPropTypes.style, // override text style
  header: PropTypes.bool, // TODO: ViewPropTypes.style, // override text style
};

_View.defaultProps = {
  keyboardAvoiding: false,
  scrollView: false,
  behavior: '',
  children: [], // empty
  f: 0,
  h: null,
  w: null,
  m: 0, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  mh: null, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  mv: null, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  p: 0, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  ph: null, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  pv: null, // 0-8: 0|0.25|0.5|1|2|4|8|16|32 rem
  o: 1, // 0-1
  bC: null, // backgroundColor
  bR: 0,
  colors: {}, // from context
  rem: 16, // rem value
  fD: 'column', // flexDirection
  aI: null, // alignItems
  jC: null, // justifyContent
  style: null,
  header: false, // if header is present - hides to statusbar
  hC: null, // statusbar colour
};

const View = context(_View);

export { View };
