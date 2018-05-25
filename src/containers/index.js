import {Navigation} from 'react-native-navigation';
import {StyleProvider} from "native-base";
import React from 'react';

import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

import * as SignedIn from './signedIn';
import * as SignedOut from './signedOut';

function wrap(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    static navigatorButtons = WrappedComponent.navigatorButtons;
    static navigatorStyle = WrappedComponent.navigatorStyle;

    render() {
      return (
        <StyleProvider style={getTheme(variables)}>
            <WrappedComponent {...this.props}/>
        </StyleProvider>
      );
    }
  };
}

export function registerScreens(store, Provider) {
  Navigation.registerComponent('SignedIn.SideBar', () => wrap(SignedIn.SideBar), store, Provider);
  Navigation.registerComponent('SignedIn.Home', () => wrap(SignedIn.Screens.Home.Component), store, Provider);
  Navigation.registerComponent('SignedIn.Blank', () => wrap(SignedIn.Screens.Blank.Component), store, Provider);
  Navigation.registerComponent('SignedOut.Login', () => wrap(SignedOut.Screens.Login), store, Provider);
}
