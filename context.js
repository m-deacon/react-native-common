import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { ThemeContext } from './../../util/config';

//function that receives a component, and returns a new composed component.
const context = ComposedComponent => {
  class ContextComponent extends Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {context => (
            <ComposedComponent
              {...this.props}
              colors={context.colors}
              design={context.design}
              profile={context.profile}
              rem={context.rem}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }

  hoistNonReactStatics(ContextComponent, ComposedComponent);

  return ContextComponent;
};

export default context;
