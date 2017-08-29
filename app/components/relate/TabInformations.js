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

let { width, height } = Dimensions.get("window");
let top = width / 16 * 9 + 50;

export default class TabInformations extends Component {
  renderContent(key, text, border = false) {
    return (
      <View style={[styles.row]}>
        <Text style={[styles.black, styles.textInfo]}>
          {key}:
        </Text>
        <Text
          style={[
            styles.black,
            styles.textInfo,
            styles.textInfoValue,
            border ? styles.borderAround : { flex: 1 }
          ]}
        >
          {Array.isArray(text)
            ? text
                .map(data => {
                  return data.name;
                })
                .join(", ")
            : text}
        </Text>
      </View>
    );
  }

  render() {
    const { listDetail } = this.props.screenProps.payload;
    return (
      <ScrollView
        automaticallyAdjustInsets={false}
        snapToInterval={16}
        snapToAlignment="start"
        style={[styles.containerRelate]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.row}>
            <Text style={styles.textInfoHeader}>
              {listDetail.content.name && listDetail.content.name}
            </Text>
          </View>

          {listDetail.genres && listDetail.genres.length > 0
            ? this.renderContent("Genre", listDetail.genres, true)
            : null}
          {listDetail.countries && listDetail.countries.length > 0
            ? this.renderContent("National", listDetail.countries)
            : null}
          {listDetail.content.duration && listDetail.content.duration != ""
            ? this.renderContent("Duration", listDetail.content.duration)
            : null}
          {listDetail.content.year && listDetail.content.year != ""
            ? this.renderContent("Release year", listDetail.content.year)
            : null}
          {listDetail.directors && listDetail.directors.length > 0
            ? this.renderContent("Directors", listDetail.directors)
            : null}
          {listDetail.actors && listDetail.actors.length > 0
            ? this.renderContent("Actors", listDetail.actors)
            : null}
          {listDetail.tags && listDetail.tags.length > 0
            ? this.renderContent("Tags", listDetail.tags, true)
            : null}
          {listDetail.content.description &&
          listDetail.content.description != ""
            ? this.renderContent("Description", listDetail.content.description)
            : null}
        </View>
      </ScrollView>
    );
  }
}
