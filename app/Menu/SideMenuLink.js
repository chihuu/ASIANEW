"use strict";

import React, { Component, PropTypes } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import shallowCompare       from 'react-addons-shallow-compare';
import Button from "../components/button/Button";
import styles from "../styles/Styles";

class SideMenuLink extends Component {
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  render() {
    const { sideMenuButtonText, iconName, iconSize } = this.props;

    return (
      <View style={styles.menuContentItemView}>
        {iconName
          ? <Button
              style={styles.navButton}
              onPress={this.handleNavButtonPress}
            >
              <Image source={iconName} style={iconSize} />
              <Text style={styles.menuContentItemText}>
                {sideMenuButtonText.toUpperCase()}
              </Text>
            </Button>
          : null}
      </View>
    );
  }

  handleNavButtonPress = e => {
    const { id, idChild, handleNavButtonPress } = this.props;
    handleNavButtonPress(e, { id, idChild });
  };
}

export default SideMenuLink;
