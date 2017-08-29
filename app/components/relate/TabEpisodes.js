import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import styles from "../../styles/Styles";
import { CachedImage } from "react-native-img-cache";
import { Actions } from "react-native-router-flux";
let { width, height } = Dimensions.get("window");

export default class TabEpisodes extends Component {
  renderItem = (item, i) => {
    const { payload, _layout } = this.props.screenProps;

    return (
      <TouchableOpacity
        onPress={() => this.handleNavButtonPress(item.id)}
        key={item.id}
        style={[
          payload.listDetail.episodes.id === item.id
            ? styles.rowActive
            : { padding: 7 },
          payload.listDetail.episodes.length - 1 !== i ? styles.border1px : {}
        ]}
      >
        <View style={[styles.row, styles.oneRowContainer]}>
          <CachedImage
            source={{ uri: item.image }}
            defaultSource={require("../../common/images/common/default_thumbnail.png")}
            style={[
              styles.imageBorderRadius,
              {
                width: _layout.width / 2 - 20,
                height: _layout.width / 2 / 16 * 9
              }
            ]}
            mutable
          />
          <View style={[styles.titleWrapper, styles.content]}>
            <Text
              style={[
                payload.listDetail.episodes.id === item.id
                  ? styles.titleActive
                  : styles.title,
                { textAlign: "center" }
              ]}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { payload, _layout } = this.props.screenProps;

    return (
      <ScrollView
        style={[styles.containerRelate]}
        contentContainerStyle={{
          height: _layout.height * (payload.listDetail.episodes.length / 3)
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {payload.listDetail.episodes.map(this.renderItem)}
      </ScrollView>
    );
  }

  handleNavButtonPress = idChild => {
    Actions.detail({ idChild: idChild });
  };
}
