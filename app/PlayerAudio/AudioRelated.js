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
  FlatList,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import { CachedImage } from "react-native-img-cache";
import { Config } from "../common/config";

export default class AudioRelated extends Component {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;
  changeLink = index => {
    const {
      itemsFetchDataPlayerAudio,
      changeCurrentItemPlay,
      player
    } = this.props;
    changeCurrentItemPlay(
      index,
      player.paused,
      player.repeatNumber,
      player.isRandom
    );
    //itemsFetchDataPlayerAudio(idChild);
    // fetchAudio({
    //   idChild: idChild,
    //   showAudio: true
    // });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.column}>
        <TouchableOpacity
          key={index}
          onPress={() => this.changeLink(index)}
          style={[styles.row, styles.wrapperRelated]}
        >
          <View style={{ marginRight: 30, width: 35 }}>
            <View style={styles.wrapperTextCount}>
              <Text style={styles.textCount}>
                {parseInt(index) + 1}
              </Text>
            </View>
          </View>
          <View style={[{ justifyContent: "center", flex: 1 }]}>
            {item.name
              ? <Text
                  style={[styles.titleAudio, { lineHeight: 32 }]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              : null}
            {
              <Text
                style={[styles.subTitleAudio]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.actors || "Unknown Artist"}
              </Text>
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      payload,
      currentItemPlay,
      currentTime,
      player,
      isCurrentLive
    } = this.props;
    let data = payload.listAudio.related;
    return (
      <View>
        <View style={styles.sectionTitleAudioWrapper}>
          <Text style={styles.sectionTitleAudio}>RELATED</Text>
        </View>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          currentItemPlay={currentItemPlay}
          currentTime={currentTime}
          isCurrentLive={isCurrentLive}
          paused={player.paused}
        />
      </View>
    );
  }
}
