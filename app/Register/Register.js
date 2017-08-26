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
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  InteractionManager
} from "react-native";

import { validateEmail } from "../common/validates/validation";
import styles from "../styles/Styles";
import {
  REQUEST_LOGIN_URL,
  REQUEST_FB_LOGIN_URL,
  REQUEST_FORGOT_PASSWORD_URL
} from "../private/constants";
import { Actions } from "react-native-router-flux";
import { Config } from "../common/config";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const HOME_ROUTE = { id: 1, refView: "HomeView" };

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      submited: false,
      loading: false
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: true });
    });
  }

  checkSignUp = () => {
    const { email, password, passwordConfirm } = this.state;
    const { register } = this.props;

    if (!email.trim()) {
      this.printMessage("Please fill in the Email");
      return false;
    }

    if (!validateEmail(email.trim())) {
      this.printMessage("Your email address invalid");
      return false;
    }

    if (!password.trim()) {
      this.printMessage("Please fill in the Password");
      return false;
    }

    if (password.trim().length < 6) {
      this.printMessage("Password must be of minimum 6 characters");
      return false;
    }

    if (password.trim() != passwordConfirm.trim()) {
      this.printMessage("Your password and confirm password do not match");
      return false;
    }

    try {
      this.setState({
        submited: true
      });
      register(email.trim(), password.trim());
    } catch (error) {
      console.error(error);
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.data.registerInfo);
    if (nextProps.data.registerInfo) {
      this.forceUpdate(this.processRegister(nextProps));
    }
  }

  processRegister = props => {
    //let refisterInfo = data.registerInfo.data.token != '' data.registerInfo : null;
    const { data, destroy } = props;

    this.setState({
      submited: false
    });

    if (data.list.registerInfo) {
      if (data.list.registerInfo.error && data.list.registerInfo.error == 1) {
        return Alert.alert("Message", data.list.registerInfo.message, [
          { text: "OK", onPress: () => destroy() }
        ]);
      } else {
        if (data.list.registerInfo.data.token != "") {
          destroy();

          return Alert.alert("Message", data.list.registerInfo.message, [
            { text: "OK", onPress: () => Actions.register }
          ]);
        } else {
          return Alert.alert("Message", data.list.registerInfo.message, [
            { text: "OK", onPress: () => destroy() }
          ]);
        }
      }
    }
  };

  printMessage(message) {
    return Alert.alert("Message", message, [
      { text: "OK", onPress: () => console.log("error signup") }
    ]);
  }

  printMessageRegister(message, data, destroy) {
    return Alert.alert("Message", message, [
      {
        text: "OK",
        onPress: () => (data.token != "" ? Actions.popToTop() : destroy())
      }
    ]);
  }

  dismissKeyboard = e => {
    e.preventDefault();
    Keyboard.dismiss();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        {this.state.loading
          ? <View style={[styles.containerAuth, styles.centering]}>
              <Image
                source={require("../common/images/common/bg_login.jpg")}
                resizeMode={"contain"}
                style={{ position: "absolute", width: "100%", zIndex: 0 }}
              >
                {this.state.submited &&
                  <View style={[styles.centering, styles.waiting]}>
                    <ActivityIndicator size="small" color="#CCCCCC" />
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
                      style={[styles.logoLogin, { marginBottom: 30 }]}
                    />
                  </View>

                  <View style={[styles.formGroup]}>
                    <TextInput
                      autoFocus={true}
                      placeholder="Your email"
                      placeholderTextColor={"#CCCCCC"}
                      onChangeText={email => this.setState({ email: email })}
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
                      placeholder="Your password"
                      placeholderTextColor={"#CCCCCC"}
                      onChangeText={password =>
                        this.setState({ password: password })}
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

                  <View style={styles.formGroup}>
                    <TextInput
                      placeholder="Confirm password"
                      placeholderTextColor={"#CCCCCC"}
                      onChangeText={password =>
                        this.setState({ passwordConfirm: password })}
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

                  <View style={styles.formGroup}>
                    <TouchableOpacity
                      onPress={this.checkSignUp}
                      style={[styles.btnLoginForm, { marginTop: 15 }]}
                    >
                      <Text style={[styles.textBtnLoginForm, styles.white]}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Image>
            </View>
          : <View style={[styles.centering, styles.waiting]}>
              <ActivityIndicator size="small" color="#CCCCCC" />
            </View>}
      </TouchableWithoutFeedback>
    );
  }
}

export default Register;
