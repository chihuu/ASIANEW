import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ListView,
  ScrollView,
  InteractionManager
} from "react-native";
import styles from "../../styles/Styles";
import { CachedImage } from "react-native-img-cache";
import _ from "lodash";

export default class Relates extends Component {
  _renderRow = (rowData, sectionID, rowID) => {
    const { _layout } = this.props.screenProps;

    return (
      <TouchableOpacity
        style={[
          {
            width: (_layout.width - 21) / 2,
            height: _layout.width / 2 / 16 * 9 + 38,
            overflow: "hidden",
            marginBottom: 10
          },
          rowID % 2 == 0 ? styles.marginRight : null
        ]}
        key={rowData.id}
      >
        <View>
          <CachedImage
            source={{ uri: rowData.image }}
            defaultSource={require("../../common/images/common/default_thumbnail.png")}
            style={[
              styles.imageBorderRadius,
              {
                width: (_layout.width - 21) / 2,
                height: _layout.width / 2 / 16 * 9,
                marginBottom: 5,
                overflow: "hidden"
              }
            ]}
            mutable
          />

          <Text style={[styles.title, { textAlign: "center" }]}>
            {rowData.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { payload, _layout } = this.props.screenProps;
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      payload.listDetail.related &&
      <ListView
        ref={listView => (this.listView = listView)}
        dataSource={ds.cloneWithRows(payload.listDetail.related)}
        style={[styles.container]}
        contentContainerStyle={{
          padding: 7,
          height: _layout.height * (payload.listDetail.related.length / 4),
          flexDirection: "row",
          flexWrap: "wrap"
        }}
        pagingEnabled={true}
        scrollEnabled={true}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
}
