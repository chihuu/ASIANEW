"use strict";

import React, { PropTypes, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import styles from "../styles/Styles";
import {
  SideMenuLink,
  AddPlaylistButton,
  AddPlaylistModalButton,
  ModalPlaylist,
  ModalCreatePlaylist
} from "../components";
import { CachedImage } from "react-native-img-cache";

export default class ChildGroupCategory extends Component {
  render() {
    const { id, _layout } = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          this.handleNavButtonPress(
            this.props.id,
            this.props.item,
            this.props.items
          )}
        activeOpacity={1}
      >
        <View
          style={[
            styles.thumbnailContainer,
            styles.column,
            _layout.sizeContainer
          ]}
        >
          <CachedImage
            source={{ uri: this.props.image }}
            defaultSource={require("../common/images/common/default_thumbnail.png")}
            style={[
              { justifyContent: "flex-end", alignItems: "flex-end" },
              _layout.sizeImage,
              styles.imageBorderRadius
            ]}
            mutable
          />
          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, styles.textCenter]}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {this.props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  handlePress = event => {
    this.props.onPress(event);
  };

  handleNavButtonPress = (idChild, data, rowData) => {
    const { navigator, listAudio } = this.props;

    if (parseInt(rowData.mode) === 0) {
      // navigator.replace({
      //   id: 5,
      //   refView: 'Detail',
      //   idChild: idChild,
      //   passProps: {dataAudio: Object.assign(data, rowData)},
      // });
    } else {
      Actions.detail({ idChild: idChild });
      // navigator.push({
      //   id: 5,
      //   refView: "Detail",
      //   idChild: idChild
      // });
    }
  };
}
