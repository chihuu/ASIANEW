import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
  AsyncStorage,
  TouchableWithoutFeedback,
  ScrollView,
  ListView,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import { CachedImage } from "react-native-img-cache";
import { Config } from "../common/config";

export default class AudioRelated extends Component {
  changeLink = idChild => {
    const { fetchAudio } = this.props;

    fetchAudio({
      idChild: idChild,
      showAudio: true
    });
  };

  _renderRow(rowData, sectionID, rowID) {
    return (
      <View key={rowID} style={styles.column}>
        <TouchableOpacity
          key={rowID}
          onPress={() => this.changeLink(rowData.id)}
          style={[styles.row, styles.wrapperRelated]}
        >
          <View style={styles.wrapperTextCount}>
            <Text style={styles.textCount}>
              {parseInt(rowID) + 1}
            </Text>
            <Text>454455</Text>
          </View>
          <View style={[{ justifyContent: "center", flex: 1 }]}>
            {rowData.name
              ? <Text
                  style={[styles.titleAudio, { lineHeight: 32 }]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {rowData.name}
                </Text>
              : null}
            {
              <Text
                style={[styles.subTitleAudio]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {rowData.actors || "Unknown Artist"}
              </Text>
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      this.props.payload.related &&
      <View>
        <View style={styles.sectionTitleAudioWrapper}>
          <Text style={styles.sectionTitleAudio}>RELATED</Text>
        </View>
        <ListView
          dataSource={ds.cloneWithRows(this.props.payload.related)}
          pageSize={6}
          initialListSize={8}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
  }
}
