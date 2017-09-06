import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ListView,
  Image
} from "react-native";
import styles from "../styles/Styles";
import { Actions } from "react-native-router-flux";

export default class GroupCategory extends Component {
  bindMoreGroupCategory = (name, items, mode) => {
    Actions.more(name, items, mode);
    // navigator.push({
    //   id: 9,
    //   passProps: {
    //     name: name,
    //     more: items,
    //     mode: mode
    //   }
    // });
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.sectionHeader]}>
          <Text style={styles.sectionText}>
            {this.props.name}
          </Text>
          {this.props.length > 6
            ? <TouchableOpacity
                style={styles.btnMoreWrapper}
                onPress={() =>
                  this.bindMoreGroupCategory(
                    this.props.name,
                    this.props.moreItems,
                    this.props.mode
                  )}
              >
                <Text style={styles.btnMore}>More</Text>
              </TouchableOpacity>
            : null}
        </View>
        <View style={styles.blocks}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
