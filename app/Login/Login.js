"use strict";

import React, { PropTypes, Component } from "react";
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  InteractionManager
} from "react-native";

import { CheckBox } from "react-native-elements";
import { FBLoginButton } from "../components";
import { validateEmail } from "../common/validates/validation";
import styles from "../styles/Styles";
import { Icon } from "react-native-elements";
import {
  REQUEST_LOGIN_URL,
  REQUEST_FB_LOGIN_URL,
  REQUEST_FORGOT_PASSWORD_URL
} from "../private/constants";
import { Config } from "../common/config";
import { Actions } from "react-native-router-flux";
const HOME_ROUTE = { id: 1, refView: "HomeView" };
const { width, height } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      checked: true,
      isLogin: false,
      submited: false,
      loading: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      });
    });
  }

  checkLogin() {
    const { email, password, checked } = this.state;
    const { login, navigator, navigate } = this.props;

    if (!email.trim()) {
      this.printError("Please fill in the Email");
      return false;
    }

    if (!validateEmail(email.trim())) {
      this.printError("Your email address invalid");
      return false;
    }

    if (!password.trim()) {
      this.printError("Please fill in the Password");
      return false;
    }

    try {
      this.setState({
        submited: false
      });
      login(email.trim(), password.trim());
    } catch (error) {
      console.error(error);
    }
  }

  printError(message) {
    return Alert.alert("Message", message, [
      {
        text: "OK",
        onPress: () => {
          return false;
        }
      }
    ]);
  }

  goToForgotPassword(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  bindToRegister = () => {
    Actions.register();
  };

  dismissKeyboard = e => {
    e.preventDefault();
    Keyboard.dismiss();
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.containerAuth, styles.centering]}>
          <ActivityIndicator
            animating={this.state.loading}
            size="small"
            color="white"
          />
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <View style={[styles.containerAuth, styles.centering]}>
          <Image
            source={require("../common/images/common/bg_login.jpg")}
            resizeMode={"contain"}
            style={{ position: "absolute", width: "100%", zIndex: 0 }}
          >
            {this.state.submited &&
              <View style={[styles.centering, styles.waiting]}>
                <ActivityIndicator
                  animating={!this.state.submited}
                  size="small"
                  color="#CCCCCC"
                />
              </View>}
            <View
              style={[
                styles.column,
                {
                  width: width - 80,
                  position: "absolute",
                  zIndex: 1,
                  top: "41%",
                  left: 0,
                  right: 0,
                  marginHorizontal: 40
                }
              ]}
            >
              <View style={styles.centering}>
                <Image
                  resizeMode="contain"
                  source={Config.IMAGE_LOGO_LOGIN}
                  style={styles.logoLogin}
                />
              </View>

              <View style={[styles.formGroup]}>
                <TextInput
                  autoFocus={true}
                  placeholder="Email"
                  onChangeText={email => this.setState({ email: email })}
                  placeholderTextColor={"#CCCCCC"}
                  value={this.state.email}
                  style={styles.formInputLogin}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="#CCCCCC"
                  containerStyle={{ position: "absolute", top: 10 }}
                />
                <View style={styles.formGroupWrapper} />
              </View>

              <View style={styles.formGroup}>
                <TextInput
                  placeholder="Password"
                  onChangeText={password =>
                    this.setState({ password: password })}
                  placeholderTextColor={"#CCCCCC"}
                  secureTextEntry={true}
                  style={styles.formInputLogin}
                  underlineColorAndroid="transparent"
                />
                <Icon
                  name="lock"
                  type="font-awesome"
                  color="#CCCCCC"
                  containerStyle={{ position: "absolute", top: 10 }}
                />
                <View style={styles.formGroupWrapper} />
              </View>

              <View>
                <CheckBox
                  title="Remember me"
                  checked={this.state.checked}
                  onPress={() =>
                    this.setState({ checked: !this.state.checked })}
                  containerStyle={styles.formCheckbox}
                  checkedColor="#CCCCCC"
                  textStyle={{ color: "#CCCCCC" }}
                />
              </View>

              <TouchableOpacity
                onPress={() =>
                  this.goToForgotPassword(REQUEST_FORGOT_PASSWORD_URL)}
              >
                <Text
                  style={[
                    styles.link,
                    { backgroundColor: "transparent", color: "#CCCCCC" }
                  ]}
                >
                  Forgot your password
                </Text>
              </TouchableOpacity>

              <View style={styles.wrapperBtnLogin}>
                <TouchableOpacity onPress={this.checkLogin.bind(this)}>
                  <View style={styles.btnLoginForm}>
                    <Text style={[styles.textBtnLoginForm, styles.white]}>
                      Login
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <View style={[styles.row, { justifyContent: "center" }]}>
                  <Text
                    style={{
                      marginRight: 10,
                      backgroundColor: "transparent",
                      color: "#CCCCCC"
                    }}
                  >
                    Don't have an account yet?'
                  </Text>
                  <TouchableOpacity onPress={this.bindToRegister}>
                    <Text
                      style={[
                        styles.link,
                        { backgroundColor: "transparent", color: "#D3D3D3" }
                      ]}
                    >
                      Sign Up.
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Login;
