import React, { Component } from "react";
import { Text, View, Image, StyleSheet, AsyncStorage } from "react-native";
import styles from "../styles/Styles";
import Button from "../components/button/Button";
import LoginButton from "../components/button/LoginButton";
import Logout from "../Logout/Logout";
import { connect } from "react-redux";
import { CachedImage } from "react-native-img-cache";
import { Config } from "../common/config";
import { Actions } from "react-native-router-flux";
const defaultName = "Guest";
//import shallowCompare from 'react-addons-shallow-compare';

import FBSDK from "react-native-fbsdk";
const { AccessToken } = FBSDK;

export default class SideMenuUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isLogin: false,
      userInfo: []
    };
  }

  renderAvatar() {
    let avatar = null;
    if (
      this.props.userInfo &&
      this.props.userInfo.data &&
      this.props.userInfo.data.avatarsUrl
    ) {
      avatar = this.props.userInfo.data.avatarsUrl;
    } else if (
      this.props.userInfo &&
      this.props.userInfo.data &&
      this.props.userInfo.data.picture
    ) {
      avatar = this.props.userInfo.data.picture.data.url;
    } else {
      avatar = Config.DEFAULT_AVATAR;
    }
    return avatar;
  }

  renderName() {
    let name = null;
    if (
      this.props.userInfo &&
      this.props.userInfo.data &&
      this.props.userInfo.data.fullName
    ) {
      name = this.props.userInfo.data.fullName;
    } else if (
      this.props.userInfo &&
      this.props.userInfo.data &&
      this.props.userInfo.data.name
    ) {
      name = this.props.userInfo.data.name;
    } else {
      name = defaultName;
    }
    return name;
  }

  render() {
    let avatar = this.renderAvatar();
    let name = this.renderName();

    return (
      <View style={styles.menuUserView}>
        <View style={styles.menuUserInfoView}>
          <View style={styles.menuUserAvatar}>
            <CachedImage
              source={{ uri: avatar }}
              style={styles.menuUserAvatarImage}
              mutable
            />
          </View>
          <View style={styles.menuUserName}>
            <Text style={styles.menuUserNameText}>
              {name}
            </Text>
          </View>
          {this.props.isLogin
            ? <Logout
                id={6}
                setUserInfo={this.props.setUserInfo}
                dataAudio={this.props.dataAudio}
                closeAudio={this.props.closeAudio}
              />
            : <LoginButton id={6} />}
        </View>
      </View>
    );
  }
}
