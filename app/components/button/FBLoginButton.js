import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from "react-native";
import FBSDK from "react-native-fbsdk";
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} = FBSDK;
import { Config } from "../../common/config";
import styles from "../../styles/Styles";

export default class FBLoginButton extends Component {
  constructor(props) {
    super(props);

    this.getDataFBLogin = this.getDataFBLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);

    this.state = {
      isLogin: false,
      submitted: false
    };
  }

  getDataFBLogin(token, id, email, name) {
    const { fblogin } = this.props;
    fblogin(token, id, email, name);
  }

  setDataUserInfo = data => {
    let dataUserInfo = {
      userInfo: {
        ...data
      },
      isLogin: true,
      isFBLogin: true
    };
    AsyncStorage.setItem("dataUserInfo", JSON.stringify(dataUserInfo));

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      Alert.alert("Message", "Login was successful", [
        {
          text: "OK",
          onPress: () => {
            this.props.navigate({ id: 1 });
          }
        }
      ]);
    }, 1000);
  };

  handleFacebookLogin() {
    let _this = this;

    LoginManager.logInWithReadPermissions([
      "public_profile",
      "email",
      "user_friends"
    ]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          const responseInfoCallback = (error: ?Object, result: ?Object) => {
            if (error) {
              console.log("Error fetching data: " + error.toString());
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                _this.getDataFBLogin(
                  data.accessToken.toString(),
                  result.id,
                  result.email,
                  result.name
                );
                _this.setState({ submitted: true });
              });
            }
          };

          // Create a graph request asking for user information with a callback to handle the response.
          const infoRequest = new GraphRequest(
            "/me?fields=id,name,email,picture",
            null,
            responseInfoCallback
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  render() {
    const { list } = this.props.data;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#4C69BA",
            paddingVertical: 15,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 3
          }}
          onPress={this.handleFacebookLogin}
        >
          <Text style={[styles.white, styles.textBtnLogin]}>
            Login With Facebook
          </Text>
        </TouchableOpacity>
        {this.state.submitted
          ? list && list.userInfo
            ? this.setDataUserInfo(list.userInfo)
            : <View style={[styles.centering, styles.waiting]}>
                <ActivityIndicator
                  animating={!this.state.submited}
                  size="small"
                  color="#FFFFFF"
                />
              </View>
          : null}
      </View>
    );
  }
}
