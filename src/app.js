import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import {Navigation} from "react-native-navigation";
import thunk from "redux-thunk";
import * as reducers from "./reducers/";
import * as appActions from "./reducers/app/actions";
import * as appTypes from "./reducers/app/actionTypes";
import {registerScreens} from "./containers";
import {Platform} from "react-native";
import { iconsMap, iconsLoaded } from './theme/icons';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

registerScreens(store, Provider);

export default class App {
  constructor() {
    store.subscribe(this.onStoreUpdate.bind(this));
    iconsLoaded.then(() => {
      store.dispatch(appActions.navigate("SignedOut"));
    });
  }

  onStoreUpdate() {
    const {root, type} = store
      .getState()
      .app;
    if (type == appTypes.FETCH_DATA_FULFILLED && root != undefined && this.currentRoot != root) {
      console.log("ROOT - ", root)
      console.log("TYPE - ", type)
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'SignedOut':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'SignedOut.Login',
            title: 'Login',
            navigatorStyle: {}
          },
          passProps: {
            icons: iconsMap
          }
        });
        return;
      case 'SignedIn':
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'One',
              screen: 'SignedIn.Home',
              icon: iconsMap['ios-person'],
              title: 'Screen One',
              overrideBackPress: true,
              navigatorStyle: {}
            }, {
              label: 'Two',
              screen: 'SignedIn.Blank',
              icon: iconsMap['ios-keypad'],
              title: 'Screen Two',
              navigatorStyle: {}
            }
          ],
          passProps: {
            icons: iconsMap
          },
          animationType: 'slide-down',
          title: 'Redux Example',
          drawer: {
            right: {
              screen: 'SignedIn.SideBar'
            },
            disableOpenGesture: true,
            passProps: {
              title: 'Hello from SideMenu',
              icons: iconsMap
            }
          },
          tabsStyle: {
            tabBarBackgroundColor: "#ffffff"
          },
          appStyle: {
            bottomTabBadgeTextColor: '#ffffff',
            bottomTabBadgeBackgroundColor: '#ff0000'
          }
        });
        return;
      default:
        console.error('Unknown app root');
    }
  }
}
