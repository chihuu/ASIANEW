import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList} from "react-native";

export default class DataListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <View>
        <Text>123</Text>
      </View>
    )
  }
}
