import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  ListView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  InteractionManager,
  Modal
} from "react-native";
import { CachedImage } from "react-native-img-cache";
import { _ } from "lodash";
import styles from "../styles/Styles";
import { Actions } from "react-native-router-flux";

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: null,
      imageLoading: true
    };
  }

  renderSectionHeader(key) {
    let name = null;

    switch (key) {
      case "popular":
        name = "Most Popular Today";
        break;
      case "recommend":
        name = "Recommendation";
        break;
      case "added":
        name = "Recently Add";
        break;
      default:
        name = "Most Popular Today";
        break;
    }
    return (
      <View style={[styles.sectionHeader]}>
        <Text style={styles.sectionTitle}>
          {name.toUpperCase()}
        </Text>
      </View>
    );
  }

  renderData(data) {
    return Object.keys(data).map(key => {
      return (
        <View key={key + "_video"}>
          {data[key] && data[key].length > 0
            ? this.renderSectionHeader(key)
            : null}
          {data[key] && data[key].length > 0
            ? this.renderDataContent(data, key)
            : null}
        </View>
      );
    });
  }

  renderDataContent(data, key) {
    //console.log(this.props.screenProps);
    const { imageDevice, sizeImage, height, sizeText } = this.props.screenProps;
    let len = data[key] ? data[key].length : height;
    //const { isLogin } = this.props;
    return (
      <View>
        <ScrollView
          horizontal={true}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
        >
          {data[key].map((data, index) => {
            let checkSizeReplaceUrlImage = data.image;

            if (_.includes(data.image, "1280x720")) {
              checkSizeReplaceUrlImage = _.replace(
                data.image,
                new RegExp("1280x720", "g"),
                imageDevice
              );
            } else if (_.includes(data.image, "720x720")) {
              checkSizeReplaceUrlImage = _.replace(
                data.image,
                new RegExp("720x720", "g"),
                imageDevice
              );
            } else {
              checkSizeReplaceUrlImage = data.image;
            }

            return (
              <TouchableOpacity
                key={key + "_" + index + "_video"}
                onPress={() => this.handleNavButtonPress(data.id)}
                activeOpacity={1}
              >
                <View
                  style={[
                    styles.imageBorderRadius,
                    styles.itemContainer,
                    index + 1 == len && styles.itemMarginRight
                  ]}
                >
                  <View
                    style={[
                      sizeImage,
                      styles.imageBorderRadius,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                      }
                    ]}
                  >
                    <CachedImage
                      style={[
                        sizeImage,
                        styles.imageBorderRadius,
                        {
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          overflow: "hidden"
                        }
                      ]}
                      defaultSource={require("../common/images/common/default_thumbnail.png")}
                      source={{ uri: data.image }}
                      mutable
                      onLoadEnd={() => {
                        this.setState({ imageLoading: false });
                      }}
                    />
                    {this.state.imageLoading &&
                      <ActivityIndicator
                        size="small"
                        color="black"
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0
                        }}
                      />}
                  </View>

                  <View style={[styles.titleContainer, sizeText]}>
                    <Text
                      style={[styles.title, styles.textCenter]}
                      ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      {data.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  handleNavButtonPress = idChild => {
    const { listAudio } = this.props;
    // listAudio({
    //   showAudio: false
    // });
    Actions.detail({ idChild: idChild });
    // navigator.push({
    //   id: 5,
    //   refView: "Detail",
    //   idChild: idChild
    // });
  };

  render() {
    return (
      <View style={styles.scrollContainer}>
        {this.props.data ? this.renderData(this.props.data) : null}
      </View>
    );
  }
}
