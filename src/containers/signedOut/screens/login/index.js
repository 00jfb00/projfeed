import React, {Component} from "react";
import {
  View,
  Text,
  Form,
  Item,
  Input,
  Button,
  Spinner,
  IconNB
} from "native-base";
import {connect} from 'react-redux'

import styles from "./styles";

import * as appActions from '../../../../reducers/app/actions'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isFetching: false,
      errorUsername: false,
      errorPassword: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appData.isFetching) {
      this.setState({isFetching: true})
    }
    if (!nextProps.appData.isFetching) {
      this.setState({isFetching: false})
    }
  }

  signIn() {
    let errors = {
      user: this.state.username.length === 0,
      pass: this.state.password.length === 0
    };
    if (errors.user || errors.pass) {
      this.setState({errorUsername: errors.user, errorPassword: errors.pass});
      return;
    }
    this.setState({errorUsername: false, errorPassword: false});

    this
      .props
      .dispatch(appActions.navigate("SignedIn", {
        username: this.state.username,
        password: this.state.password
      }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Form style={{
          marginRight: 15
        }}>
          <Item error={this.state.errorUsername}>
            <Input
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
            <IconNB
              name="ios-close-circle"
              style={{
              display: this.state.errorUsername
                ? "flex"
                : "none"
            }}/>
          </Item>
          <Item error={this.state.errorPassword}>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
            <IconNB
              name="ios-close-circle"
              style={{
              display: this.state.errorPassword
                ? "flex"
                : "none"
            }}/>
          </Item>
        </Form>
        {this.state.isFetching
          ? <Spinner style={{
              marginTop: 30
            }} color="blue"/>
          : <Button
            block
            style={{
            margin: 15,
            marginTop: 50
          }}
            onPress={() => this.signIn()}>
            <Text>Sign In</Text>
          </Button>}
      </View>
    );
  }
}

mapStateToProps = (state) => {
	return { appData: state.app };
};

export default connect(mapStateToProps)(Login);
