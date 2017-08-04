import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

const navBarButtons = {
  renderBackButton( p ) {
    return (
      <TouchableOpacity onPress={ Actions.pop }>
        <Image source={require('../images/back_chevron.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    )
  },
  renderRightButton( p ) {
    return (
      <TouchableOpacity onPress={() => Actions.search()}>
        <Image source={require('../images/search.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    )
  },
}

export default navBarButtons;
