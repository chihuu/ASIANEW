"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
//import shallowCompare from 'react-addons-shallow-compare';

import SideMenuLink from "./SideMenuLink";
import SideMenuCategory from "./SideMenuCategory";
import styles from "../styles/Styles";
import SideMenuUser from "./SideMenuUser";

const window = Dimensions.get("window");

class SideMenuContent extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          scrollsToTop={false}
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#005aab"
          }}
        >
          <SideMenuUser {...this.props} />
          <SideMenuCategory {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

export default SideMenuContent;
