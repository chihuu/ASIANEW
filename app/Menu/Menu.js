import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";
import SideMenuContent from "./SideMenuContent";
import styles from "../styles/Styles";

class Menu extends React.Component {
  componentWillMount() {
    const { itemsFetchDataMenu } = this.props;
    itemsFetchDataMenu();
  }

  render() {
    if (this.props.isFetchingMenu) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#000000" size="large" />
        </View>
      );
    }

    return <SideMenuContent {...this.props} />;
  }
}

export default Menu;
